import { fetchJobs } from "@/actions/jobs"
import Link from "next/link";

const JobsPage = async ({ searchParams }:
  { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const searchParameters = await searchParams;
  const jobs = await fetchJobs(searchParameters);

  return (
    <div className="flex flex-col justify-center gap-4 max-w-4xl mx-auto p-4">
      <div className="p-5 outline outline-gray-800 space-y-4 rounded-lg">
        <h2 className="text-xl font-semibold">Find a job</h2>
        <form className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <input type="text" name="title" placeholder="Search jobs..." className="w-full p-2 rounded-md bg-gray-800 placeholder:text-sm placeholder:opacity-60" autoFocus autoComplete="on" />
            <select className="w-full p-2 rounded-md bg-gray-800" name="type">
              <option value="">Any type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <input type="text" name="location" placeholder="Search by location..." className="w-full p-2 rounded-md bg-gray-800 placeholder:text-sm placeholder:opacity-60" autoComplete="on" />
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-800 rounded-md hover:bg-emerald-700 transition-colors duration-200 w-full text-sm cursor-pointer">Search</button>
        </form>
      </div>
      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1 mt-4">
          <p className="text-2xl font-semibold">No jobs found...</p>
          <span className="text-sm opacity-75">Please try again with different search parameters</span>
        </div>
      )}
      <div className="flex flex-col gap-4 items-center">
        {jobs.map((job) => (
          <div key={job?.id} className="px-6 py-4 flex flex-col gap-1.5 bg-gray-800 rounded-lg w-full hover:outline-2 hover:outline-emerald-600">
            <div className="flex flex-row items-center justify-between gap-1 w-full">
              <p className="font-roboto font-bold text-xl">{job.title}</p>
              {job?.salary && (<span className="ml-auto font-roboto text-lg">{job.salary}</span>)}
            </div>
            <p className="opacity-75">{job?.company}</p>
            <div className="flex flex-row items-center gap-3">
              <p className="text-xs">{job?.location}</p>
              <span>•</span>
              <p className="text-xs">{job?.type.substring(0, 1).toLocaleUpperCase() + job?.type.substring(1)}</p>
            </div>
            <Link href={`/jobs/${job.id}`} className="text-sm text-blue-500 underline underline-offset-1 hover:text-blue-400 transition-all duration-200 w-fit">More details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsPage;