import { Menu, LikeBtn, Bubble, Airplane, BookMark } from '../icons/icons'


// User


export const Feed = ({ content }) => {
  const backgroundImage =
    content.author.profileImg ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className='w-[400px] bg-white mb-1'>
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

      <div id='content' className='w-[400px] h-[400px]'>
        {/* 이미지 */}
        <img className='object-cover w-[400px] h-[400px]' src={content.image} alt='img' />
      </div>

      <div id='footer' className='flex items-center justify-between p-2'>
        {/* 좋아요버튼, 댓글버튼, DM버튼 */}
        <div className='flex items-center w-1/4 justify-between'>
            <LikeBtn />
            <Bubble />
            <Airplane />
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
        {/* 댓글들 */}
      </div>
    </div>
  )
}