"use client"

import Link from "next/link"
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react"
import NoUserImage from "@/public/no-user-image.png"

const Navbar = () => {
    const { data: session } = useSession();

    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const logoutAndRefresh = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({ redirect: true, redirectTo: "/auth/signin" });
        } catch (error) {
            // Add fail state toast
            console.error("Sign in failed:", error);
        }
    }

    return (
        <nav className="flex items-center justify-between max-w-5xl h-16 mx-auto px-4 py-2">
            <h1 className="font-semibold text-2xl md:text-3xl font-roboto tracking-tight hover:text-emerald-600 transition-colors duration-200">
                <Link href="/">JobListing</Link>
            </h1>
            <div className="flex items-center justify-center gap-6">
                <Link href="/jobs" className="text-sm hover:text-emerald-500 transition-colors duration-200">Browse Jobs</Link>
                {session ?
                    <>
                        <Link href="/jobs/add" className="text-sm hover:text-emerald-500 transition-colors duration-200">Add a Job</Link>
                        <Link href="/dashboard" className="text-sm hover:text-emerald-500 transition-colors duration-200">Dashboard</Link>
                        <button onClick={logoutAndRefresh} disabled={isLoggingOut} className="text-red-400 text-sm hover:text-red-300 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Logout</button>
                        <div className="flex items-center gap-2 bg-emerald-700 rounded-full">
                            <Image
                                src={session.user?.image ? session.user.image : NoUserImage}
                                alt="User avatar"
                                width={30} height={30}
                                className="rounded-full overflow-hidden"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFFAJ/DwLQ0gAAAABJRU5ErkJggg=="
                            />
                            <p className="text-sm hidden md:inline-block pr-2">{session.user?.name}</p>
                        </div>
                    </>
                    :
                    <Link href="/auth/signin" className="text-sm hover:text-emerald-500 transition-colors duration-200">Sign In</Link>
                }
            </div>
        </nav>
    )
}

export default Navbar;