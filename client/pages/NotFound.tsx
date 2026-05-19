import { useLocation, Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  const isStudentRoute = location.pathname.includes("student");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isTeacher={!isStudentRoute} />

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is under development.
          </p>
          <p className="text-gray-500 mb-8">
            Want to add content here? Continue prompting to fill in this page!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
