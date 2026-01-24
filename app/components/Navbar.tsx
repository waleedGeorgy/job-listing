"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const router = useRouter();

    const logoutAndRefresh = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({
                redirect: false,
                callbackUrl: "/"
            });
            setIsLoggingOut(false)
            router.refresh();
            router.push("/");
        } catch (error) {
            // Add fail state toast
            console.error("Sign in failed:", error);
            setIsLoggingOut(false);
        }
    }

    return (
        <nav className="flex flex-row items-center justify-between flex-wrap max-w-4xl h-16 mx-auto px-4 py-2">
            <h1 className="font-semibold text-3xl font-roboto tracking-tight hover:text-emerald-600 transition-colors duration-200">
                <Link href="/">JobListing</Link>
            </h1>
            <div className="flex items-center justify-center gap-6">
                <Link href="/jobs" className="text-sm hover:text-emerald-500 transition-colors duration-200">Browse Jobs</Link>
                {session ?
                    (<>
                        <Link href="/jobs/add" className="text-sm hover:text-emerald-500 transition-colors duration-200">Add a Job</Link>
                        <Link href="/dashboard" className="text-sm hover:text-emerald-500 transition-colors duration-200">Dashboard</Link>
                        <button onClick={logoutAndRefresh} disabled={isLoggingOut} className="text-red-400 text-sm hover:text-red-300 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Logout</button>
                    </>)
                    :
                    (<Link href="/auth/signin" className="text-sm hover:text-emerald-500 transition-colors duration-200">Sign In</Link>)
                }
            </div>
        </nav>
    )
}

export default Navbar;