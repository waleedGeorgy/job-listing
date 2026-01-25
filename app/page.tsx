import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const HomePage = async () => {
  const session = await auth();

  const recentJobs = await prisma.job.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-3 mt-12 max-w-4xl mx-auto px-2 text-center">
      <h2 className="font-roboto text-5xl">Welcome to <span className="font-bold text-emerald-600">JobListing</span></h2>
      <p className="text-xl">Here, you will find all the most in-demand jobs on the market.</p>
      {session?.user ?
        (<p>
          Now that you&apos;ve signed up, you can{" "}
          <Link href="/jobs" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">browse jobs</Link>,{" "}
          <Link href="/jobs/add" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">add a job</Link>,{" "}
          or check that status of all your application in the <Link href="/dashboard" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">dashboard</Link>.
        </p>)
        :
        (<p>Begin by <Link href="/auth/signin" className="text-blue-500 underline underline-offset-2 hover:text-blue-400 transition-colors duration-200">signing in</Link>, to enjoy all the features.</p>)
      }
      <h3 className="text-xl mt-10 text-left">Recently added jobs</h3>
      <div className="flex flex-row items-center justify-between gap-3">
        {recentJobs.map((recentJob) => (
          <div key={recentJob?.id} className="px-6 py-4 flex flex-col gap-1.5 bg-gray-800 rounded-lg w-full hover:outline-2 hover:outline-emerald-600">
            <div className="flex flex-row items-center justify-between gap-1 w-full">
              <p className="font-roboto font-bold text-lg">{recentJob.title}</p>
              {recentJob?.salary && (<span className="ml-auto font-roboto text-sm">{recentJob.salary}</span>)}
            </div>
            <p className="text-left text-gray-300">{recentJob?.company}</p>
            <div className="flex flex-row items-center gap-3 text-gray-300">
              <p className="text-sm">{recentJob?.location}</p>
              <span>•</span>
              <p className="text-sm">{recentJob?.type.substring(0, 1).toLocaleUpperCase() + recentJob?.type.substring(1)}</p>
            </div>
            <p className="text-left text-sm my-3">{recentJob.description}</p>
            <Link href={`/jobs/${recentJob.id}`} className="text-xs text-blue-500 hover:text-blue-400 transition-all duration-200 w-fit">More details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage;