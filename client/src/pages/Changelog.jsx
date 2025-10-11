// Imports
import Header from "../components/Header";

export default function Changelog() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Changelog</h1>
        <p className="text-gray-500 text-center text-sm">
          Last Updated: October 10, 2026
        </p>
      </div>
    </div>
  );
}
