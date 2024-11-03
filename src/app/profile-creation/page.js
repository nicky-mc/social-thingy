import { redirect } from "next/navigation";
import { db } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CreateProfile() {
  const user = await currentUser();

  if (!user) {
    return <p>Please sign in to create a profile.</p>;
  }

  async function handleSubmit(formData) {
    "use server";

    const profileData = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      bio: formData.get("bio"),
      image_src: formData.get("image_src") || null,
    };

    try {
      await db.query(
        `INSERT INTO users (username, first_name, last_name, bio, profile_picture) 
        VALUES ($1, $2, $3, $4, $5)`,
        [
          profileData.username,
          profileData.first_name,
          profileData.last_name,
          profileData.bio,
          profileData.image_src,
        ]
      );

      redirect(`/profile?username=${encodeURIComponent(profileData.username)}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      return {
        error: "Profile creation failed. Please try again.",
      };
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-base-100 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Create Profile</h1>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Username:
            <input
              type="text"
              name="username"
              required
              className="input input-bordered w-full mt-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            First Name:
            <input
              type="text"
              name="first_name"
              required
              className="input input-bordered w-full mt-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Last Name:
            <input
              type="text"
              name="last_name"
              required
              className="input input-bordered w-full mt-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Biography:
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              required
              className="textarea textarea-bordered w-full mt-1"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">
            Profile Picture URL:
            <input
              type="text"
              name="image_src"
              className="input input-bordered w-full mt-1"
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}