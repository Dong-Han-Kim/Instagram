"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useContents } from "../../../store/useContents";
import { useParams } from "next/navigation";
import { Feed } from "../../../components/Feed";
import { useAuth } from "../../../store/useAuth";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "@/firebase";

export default function Detail() {
  const params = useParams();
  const {
    contents,
    fetchContents,
    getContent,
    fetchComments,
    updateContent,
    addComment,
    getChatRoom,
  } = useContents();
  const [comments, setComments] = useState([]);
  const targetContent = getContent(params.id);
  const { user } = useAuth();

  useEffect(() => {
    if (contents.length > 0) return;
    fetchContents();
  }, [contents]);

  useEffect(() => {
    if (!params?.id) return;
    fetchComments(params.id).then((res) => setComments(res));
  }, [params.id]);

  if (!targetContent) return null;
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Feed
        loggedInUser={user}
        content={targetContent}
        onUpdateContents={updateContent}
        onAddComment={async (content, comment) => {
          await addComment(content, comment);
          fetchComments(params.id).then((res) => setComments(res));
          const notificationId = uuidv4();
          await addDoc(
            collection(firestore, "alarms", content.author.id, "notifications"),
            {
              id: notificationId,
              message: `[new comment]\n${user.name} : ${comment}`,
              redirectURL: `/detail/${content.id}`,
              read: false,
            }
          );
        }}
        comments={comments}
        commentInputVisible
        getChatRoom={getChatRoom}
      />
    </main>
  );
}