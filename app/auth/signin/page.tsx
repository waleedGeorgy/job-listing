"use client"
import Image from "next/image";
import GitHubIcon from "@/public/github-icon.png";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SigninPage = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSignin = async () => {
        setIsSigningIn(true);
        try {
            await signIn("github", {
                callbackUrl: "/",
                redirect: true
            });
        } catch (error) {
            // Add fail state toast
            console.error("Sign in failed:", error);
            setIsSigningIn(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-128px)] mx-auto flex flex-col items-center pt-20">
            <div className="bg-gray-900 rounded-xl px-12 py-8 flex flex-col items-center">
                <h2 className="text-3xl font-semibold text-center">Welcome to JobListing</h2>
                <p className="text-sm text-gray-200 mt-1">Sign in to access the full features of our website</p>
                <button
                    disabled={isSigningIn}
                    onClick={handleSignin}
                    className="my-6 p-3 border border-gray-700 rounded-md w-full cursor-pointer hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
                >
                    {isSigningIn ?
                        ("Signing in...")
                        :
                        (<>
                            <Image src={GitHubIcon} alt="GitHub Icon" width={30} height={30} className="size-6 mr-2 inline-block" />
                            Continue with GitHub
                        </>)
                    }

                </button>

                <p className="text-xs">
                    By signing in, you accept our{" "}
                    <span className="text-blue-500 underline">Terms of Service</span> and <span className="text-blue-500 underline">Privacy Policy</span>
                </p>
            </div>
        </div >
    );
};

export default SigninPage;