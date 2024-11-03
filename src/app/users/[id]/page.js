import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function UserPage({ params }) {
  const userId = await params.userid;

  const user = await currentUser();
  const followerId = user ? user.id : null;
  const followedId = userId;
  let FollowButton; //only added due to deployment issue in vercel

  const response = await db.query(
    `SELECT * FROM users WHERE clerk_id='${userId}'`
  );
  const profileData = response.rows[0];

  const posts = await db.query(
    `SELECT * FROM posts WHERE user_id='${userId}'`
  );
  const postData = posts.rows;

  async function handleFollow(followerId, followedId) {
    "use server";
    await db.query(
      `INSERT INTO follows (following_clerk_id, followed_clerk_id) VALUES ('${followerId}', '${followedId}')`
    );
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to {profileData.first_name}&apos;s Page</h1>
      <div className="my-4 mx-2 flex flex-col gap-2">
        <Link
          className="btn btn-primary"
          href="/user"
        >
          Go back ...
        </Link>
        {followerId && (
          <FollowButton
            handleFollow={handleFollow}
            follower={followerId}
            followed={followedId}
          />
        )}
      </div>

      <section className="flex flex-col justify-center items-center">
        <div className="card w-full max-w-xs bg-base-100 shadow-xl p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to the profile page of {profileData.first_name} {profileData.last_name}
          </h2>
          <Image
            alt={profileData.username}
            src={profileData.image_src}
            width={300}
            height={300}
            className="rounded-full mb-4"
          />
          <p className="text-lg">Username: {profileData.username}</p>
          <p className="text-lg">Bio: {profileData.bio}</p>
        </div>
      </section>

      <h2 className="text-3xl font-bold mb-4">Posts by {profileData.first_name}</h2>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {postData.map((post) => (
          <div
            className="card w-80 bg-base-100 shadow-xl p-4"
            key={post.id}
          >
            <p className="text-gray-600 mb-2">Date: {new Date(post.date).toLocaleDateString()}</p>
            <Image
              alt={post.topic}
              src={post.image_src}
              quality={100}
              width={100}
              height={100}
              className="rounded-lg mb-2"
            />
            <Link
              className="text-xl font-bold text-primary hover:underline"
              href={`/posts/${userId}/${post.id}`}
            >
              Topic: {post.topic}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}