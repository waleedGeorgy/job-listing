import { getJobById } from "@/actions/jobs"
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "@/app/components/ApplyButton";
import { auth } from "@/auth";

const JobDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();

    const jobPageParams = await params;
    const jobDetails = await getJobById(jobPageParams.id);

    return (
        <div className="max-w-4xl mx-auto p-2">
            <div className="flex flex-col gap-1.5 p-7 bg-gray-800 rounded-lg">
                <Link href="/jobs" className="text-xs text-blue-500 hover:text-blue-400 transition-all duration-200 font-semibold">Back to jobs</Link>
                <div className="flex flex-row items-center gap-2 font-roboto">
                    <h2 className="text-3xl font-semibold">{jobDetails.title}</h2>
                    <span>@</span>
                    <p className="text-2xl font-light">{jobDetails.company}</p>
                </div>
                <div className="flex flex-row items-center gap-2.5 text-sm text-gray-300">
                    <p>{jobDetails.location}</p>
                    <span>•</span>
                    {jobDetails.type && (<p>{jobDetails.type.substring(0, 1).toLocaleUpperCase() + jobDetails.type.substring(1)}</p>)}
                    <span>•</span>
                    <p>{jobDetails.salary}</p>
                </div>
                <div className="flex flex-row items-center gap-2 text-gray-300 text-sm">
                    <p>Posted by: <span className="font-semibold">{jobDetails.postedBy?.name}</span></p>
                    <p className="font-semibold">({formatDistanceToNow(new Date(jobDetails.createdAt || new Date()), { addSuffix: true })})</p>
                </div>
                <div className="mt-4">
                    <span className=" font-bold text-lg">Description:</span>
                    <p className="text-gray-200">{jobDetails.description}</p>
                </div>
                <hr className="mt-4 text-gray-700" />
                {!session?.user ?
                    (<p className="font-semibold text-center mt-3">
                        <Link href="/auth/signin" className="text-blue-500 underline hover:text-blue-400 transition-all duration-200">Sign in</Link>{" "}
                        to apply for this job
                    </p>)
                    : (<ApplyButton jobId={jobDetails.id} />)
                    /* (session.user.id === jobDetails.postedById ?
                        (<p className="mt-2 text-center font-semibold text-red-400 animate-pulse">
                            You cannot apply to your own jobs
                        </p>)
                        :
                        (<ApplyButton jobId={jobDetails.id} />)
                    ) */
                }
            </div>
        </div>
    )
}

export default JobDetailsPage