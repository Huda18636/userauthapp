export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}