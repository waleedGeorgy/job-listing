import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl font-semibold mb-2">404 - Page Not Found</h2>
            <Link href="/" className="text-blue-500 underline hover:text-blue-400 transition-colors underline-offset-1">
                Back to home page
            </Link>
        </div>
    );
}