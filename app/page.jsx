"use client"
import Image from 'next/image';
import { Feed } from './components/Feed'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase';
import { useAuth } from "./store/useAuth";

// 3개 페이지
// 새로운 이미지를 올리는 화면
// feeds 다른 사람들의 피드를 보는 화면
// my 내 정보화면

export default function Home() {
  const [contents, setContents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchFeeds();
      const loggedInUser = JSON.parse(localStorage.getItem ("user"));
      console.log({ loggedInUser })
  }, []);

  const fetchFeeds = async () => {
    const snapShot = await getDocs(collection(firestore, "feeds"));
    const nextContents = [];
    snapShot.forEach((doc) => nextContents.push(doc.data()));
    setContents(nextContents);
  };

  return (
    <>
      <h1>MAIN</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {contents.map((content, index) => (
          <Feed key={index} content={content} />
      ))}
      </main>
        <button className='fixed bottom-10 left-0 right-0 mx-auto w-16 h-16 bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/768px-Instagram-Icon.png)] bg-cover shadow-xl'
        onClick={() => {
          if (user) return router.push("/new");
          router.push("/auth");
        }}
        ></button>
    </>

  );
}
