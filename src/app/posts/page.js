import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";

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

      <div className="max-w-3xl bg-base-100 rounded-lg shadow-lg p-6">
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">No posts yet</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-md p-4 mb-6"
            >
              <Link
                href={`/posts/${post.id}`}
                className="text-2xl text-primary font-bold mb-2 block"
              >
                Photo Post #{post.id}
              </Link>
              <Image
                src={post.image_url}
                alt={`Photo post ${post.id}`}
                className="w-full h-auto mb-4 rounded-lg"
              />
              <small className="text-secondary">
                Posted on: {new Date(post.created_at).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>

      <footer className="mt-8 text-center">
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </footer>
    </main>
  );
}