// "use client";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { Post } from "@/app/lib/types";
// import BlockRenderer from "@/app/components/BlockRenderer";
// import { useEffect, useState } from "react";
// import { getPost } from "@/app/lib/api/postsApi";
// import { Metadata } from "next";

// interface Props {
//   params: { slug: string };
// }
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const post = await getPost(params.slug);
//   if (!post) return { title: "Post" };

//   return {
//     title: post.title,
//     description: post.metaDescription ?? post.title,
//     openGraph: {
//       title: post.title,
//       description: post.metaDescription,
//       images: post.mainImageUrl ? [{ url: post.mainImageUrl }] : [],
//       type: "article",
//     },
//     authors: { name: "Coffee explained" },
//     // add twitter, authors, etc.
//   };
// }

// export default function PostPage({ params }: Props) {
//   const [currentPost, setCurrentPost] = useState<Post | null>(null);
//   const [error, setError] = useState("");

//   async function fetchPosts() {
//     try {
//       setCurrentPost(await getPost(params.slug));
//     } catch (err: any) {
//       setError(err.message);
//       return notFound();
//     }
//   }

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return currentPost ? (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded mt-6">
//       {currentPost.mainImageUrl && (
//         <Image
//           src={currentPost.mainImageUrl}
//           alt={currentPost.title}
//           width={1200}
//           height={400}
//           className="w-full h-64 object-cover rounded"
//           priority
//           unoptimized
//         />
//       )}
//       <h1 className="text-3xl font-bold mt-4">{currentPost.title}</h1>
//       <div className="prose mt-4">
//         <BlockRenderer blocks={currentPost.content as any} />
//       </div>

//       {currentPost.updatedAt != currentPost.createdAt && (
//         <div className="text-xs text-gray-400 mt-1">
//           Updated at: {new Date(currentPost.updatedAt).toLocaleString()}
//         </div>
//       )}
//       {currentPost.createdAt && (
//         <div className="text-xs text-gray-400 mt-1">
//           Created at: {new Date(currentPost.createdAt).toLocaleString()}
//         </div>
//       )}

//       {currentPost.sources && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Sources</h2>
//           <p className="text-sm text-gray-700 whitespace-pre-wrap">
//             {currentPost.sources}
//           </p>
//         </div>
//       )}
//     </div>
//   ) : null;
// }

import { notFound } from "next/navigation";
import { getPost } from "@/app/lib/api/postsApi";
import { Metadata } from "next";
import ClientPost from "./ClientPost";

interface Props {
  params: Promise<{ slug: string }>; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.metaDescription ?? post.title,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: post.mainImageUrl ? [{ url: post.mainImageUrl }] : [],
      type: "article",
    },
    authors: { name: "Coffee explained" },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return notFound();

  return <ClientPost post={post} />;
}
