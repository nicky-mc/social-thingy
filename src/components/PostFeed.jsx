// src/components/PostList.jsx
export default function PostList({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-primary">{post.title}</h2>
            <p className="text-gray-700">{post.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">View Post</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}