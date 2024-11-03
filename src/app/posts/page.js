import { db } from "@/utils/dbConnection";
import Link from "next/link";
import PostList from "@/components/PostFeed";

export const metadata = {
  title: "Photo Gallery",
  description:
    "Explore the latest posts in our photo gallery. Discover beautiful, inspiring, and creative photography from users around the world. Whether you're looking for inspiration or just want to appreciate great photography, our gallery has something for everyone.",
};

export default async function Posts() {
  let posts = [];

  try {
    const result = await db.query(
      `SELECT * FROM posts ORDER BY created_at DESC`
    );
    posts = result.rows;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h1 className="text-4xl text-primary text-center font-bold mb-8">
        Latest Photo Posts
      </h1>

      <PostList posts={posts} />

      <footer className="mt-8 text-center">
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </footer>
    </main>
  );
}