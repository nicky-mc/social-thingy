import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";

export default async function AllUsersPage() {
  const response = await db.query(`SELECT * FROM users`);
  const usersData = response.rows;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h1 className="text-4xl font-bold mb-8">List of All Users</h1>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {usersData.map((user) => (
          <div
            className="card w-80 bg-base-100 shadow-xl p-4"
            key={user.id}
          >
            <Link
              className="text-xl font-bold text-primary hover:underline"
              href={`/user/${user.clerk_id}`}
            >
              {user.first_name} {user.last_name}
            </Link>
            <p className="text-gray-600 mt-2">{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}