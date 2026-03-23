import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">FlowTrack</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-blue-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-5xl font-bold mb-6">
          Manage Your Tasks <span className="text-blue-500">Effortlessly</span>
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          FlowTrack helps you stay organized, focused, and productive by
          managing your tasks with a clean and simple interface.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24 px-8">
        <h3 className="text-3xl font-bold text-center mb-10">
          Features
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2"> Secure Auth</h4>
            <p className="text-gray-500">
              JWT-based authentication ensures your data stays private.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2"> Task Management</h4>
            <p className="text-gray-500">
              Create, update, and delete tasks with ease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2"> Fast & Simple</h4>
            <p className="text-gray-500">
              Built with FastAPI and React for speed and performance.
            </p>
          </div>

        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center pb-16">
        <h3 className="text-2xl font-bold mb-4">
          Start organizing your life today
        </h3>

        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
        >
          Create Free Account
        </button>
      </div>

    </div>
  );
}