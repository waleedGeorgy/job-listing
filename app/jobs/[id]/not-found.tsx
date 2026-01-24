import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="text-gray-300 mb-6">
                The job you&apos;re looking for doesn&apos;t exist or may have been removed.
            </p>
            <Link
                href="/jobs"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Browse Available Jobs
            </Link>
        </div>
    );
}