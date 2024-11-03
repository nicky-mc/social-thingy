import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function UserProfile({ params }) {
  const { username } = params;

  let profile;
  try {
    const res = await db.query(
      "SELECT username, first_name, last_name, bio, profile_picture, created_at FROM users WHERE username = $1",
      [username]
    );
    profile = res.rows[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <p>Error fetching user profile.</p>;
  }

  // Handle case where user is not found
  if (!profile) {
    return <p>User not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h1 className="text-4xl font-bold mb-4 text-center">{profile.username}</h1>
        {profile.profile_picture && (
          <div className="flex justify-center mb-4">
            <Image
              src={profile.profile_picture}
                          alt={ `${ profile.username }'s profile` }
                          width={ 300 }
                            height={ 300 }
              className="rounded-full w-32 h-32"
            />
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {profile.first_name} {profile.last_name}
        </h2>
        <p className="text-gray-600 text-center mb-4">{profile.bio}</p>
        <p className="text-secondary text-center">
          Profile created on: {new Date(profile.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}