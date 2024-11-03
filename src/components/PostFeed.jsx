"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PostModal from "./PostModal";

export default function PostList({ posts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postList, setPostList] = useState(posts);

  const handleCreatePost = (newPost) => {
    setPostList([...postList, { id: postList.length + 1, ...newPost }]);
  };

  return (
    <div className="w-full max-w-3xl bg-base-100 rounded-lg shadow-lg p-6">
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mb-6">
        Create New Post
      </button>

      {postList.length === 0 ? (
        <p className="text-gray-600 text-center">No posts yet</p>
      ) : (
        postList.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-md p-4 mb-6">
            <Link href={`/posts/${post.id}`} className="text-2xl text-primary font-bold mb-2 block">
              Photo Post #{post.id}
            </Link>
            <Image
              src={post.image_url}
              alt={`Photo post ${post.id}`}
              width={800}
              height={600}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <small className="text-secondary">
              Posted on: {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        ))
      )}

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
}