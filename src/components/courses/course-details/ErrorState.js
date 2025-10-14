import { ArrowLeft } from "lucide-react";

export default function ErrorState({ router, errorMessage = "The course you're looking for doesn't exist or has been removed." }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 text-3xl">⚠</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-4">{errorMessage}</p>
        <button
          onClick={() => router.push("/courses")}
          className="inline-flex items-center px-6 py-3 bg-[#30818a] text-white rounded-lg hover:bg-[#2e6c75] transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </button>
      </div>
    </div>
  );
}