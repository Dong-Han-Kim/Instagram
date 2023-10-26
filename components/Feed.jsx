"use client";

import { firestore } from "../firebase";
import { Menu, LikeBtn, Comment, Airplane, BookMark } from './icons/icons'
import { doc, updateDoc, arrayRemove, arrayUnion } from "@firebase/firestore";
import { useRouter } from "next/navigation";

// User


export const Feed = ({ 
  loggedInUser,
  content,
  onUpdateContents,
  onAddComment,
  comments,
  commentInputVisible,
  getChatRoom,
}) => {
  const router = useRouter();

  const backgroundImage =
    content.author.profileImg ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    
  const likedContent = (content.liked || []).some(
    (id) => loggedInUser.id === id
  );
    // 좋아요 업데이트
    const updateHeartButtonClick = async () => {
      const nextLiked = likedContent
        ? arrayRemove(loggedInUser.id)
        : arrayUnion(loggedInUser.id);
      await updateDoc(doc(firestore, "feeds", content.id), {
        liked: nextLiked,
      });
      const nextContent = {
        ...content,
        liked: likedContent
          ? content.liked.filter((id) => id !== loggedInUser.id)
          : [...content.liked, loggedInUser.id],
      };
      onUpdateContents(nextContent);
    };

  return (
    <div className='w-screen sm:w-[400px] bg-white mb-1'>
      <div id='header' className='flex items-center justify-between p-2'>
        {/* profile */}
        <div className='flex items-center'>
          <div className={`rounded-full w-10 h-10 bg-contain mr-2`}>
            <img className={`rounded-full w-10 h-10`} src={backgroundImage} />
          </div>
          <div>
            <div className='font-semibold'>{content.author.name}</div>
            <div className='font-light'>{content.location}</div>
          </div>
        </div>
        {/* 더보기 버튼 */}
        <div>
          <Menu/>
        </div>
      </div>

      <div id='content' className='w-screen sm:w-[400px] h-[400px]'>
        {/* 이미지 */}
        <img
          onDoubleClick={updateHeartButtonClick}
          className='object-cover w-[400px] h-[400px]' 
          src={content.image} 
          alt='img' 
        />
      </div>

      <div id='footer' className='flex items-center justify-between p-2'>
        {/* 좋아요버튼, 댓글버튼, DM버튼 */}
        <div className='flex items-center w-1/4 justify-between'>
          <button onClick={updateHeartButtonClick}>
            <LikeBtn color={likedContent ? "red" : null} />
          </button>
          <button onClick={() => router.push(`/detail/${content.id}`)}>
            <Comment />
          </button>
          <button 
            disabled={content.author.id === loggedInUser.id}
            onClick={async () => {
            const chatRoomId = await getChatRoom(content);
            router.push(`chat/${chatRoomId}`);
          }}>
            <Airplane />
          </button> 
        </div>
        <div>
          <BookMark />
        </div>
      </div>

      <div id='comments' className='p-2'>
        {/* 누가 좋아요? 좋아요 수 */}
        <div>Like by <b>{content.liked.length} others</b></div>
        <div>
          <b>{content.author.name}</b> {content.text}
        </div>
        {/* 내가 작성한 컨텐츠의 글 */}
        {(comments || []).map((comment) => (
          <div key={comment.id}>
            <b>{comment.author.name}</b> {comment.text}
          </div>
        ))}
      </div>
      {commentInputVisible && (
        <div className="p-2">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const comment = e.target[0].value;
              if (!comment) return;
              await onAddComment(content, comment);
              e.target[0].value = "";
            }}
          >
            <b>{loggedInUser.name}</b> <input />
          </form>
        </div>
      )}
    </div>
  );
}