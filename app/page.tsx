"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col items-center gap-3 mt-12 max-w-2xl mx-auto px-2 text-center">
      <h2 className="font-roboto text-5xl">Welcome to <span className="font-bold text-emerald-600">JobListing</span></h2>
      <p className="text-xl">Here, you will find all the most in-demand jobs on the market.</p>
      {data?.user ?
        (<p>
          Now that you&apos;ve signed up, you can{" "}
          <Link href="/jobs" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">browse jobs</Link>,{" "}
          <Link href="/jobs/add" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">add a job</Link>,{" "}
          or check that status of all your application in the <Link href="/dashboard" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">dashboard</Link>.
        </p>)
        :
        (<p>Begin by <Link href="/auth/signin" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">signing in</Link>, to enjoy all the features.</p>)
      }

    </div>
  )
}

export default HomePage;