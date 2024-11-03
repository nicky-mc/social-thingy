// src/components/PostModal.js
"use client";
import React, { useState } from "react";

export default function PostModal({ isOpen, onClose, onCreate }) {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && caption) {
      onCreate({ image_url: image, caption });
      onClose(); // Close the modal after creating the post
    }
  };

  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="url"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full mr-2"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary w-full ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}