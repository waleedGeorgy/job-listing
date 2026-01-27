import Link from "next/link"
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const DashboardPage = async () => {
    const session = await auth();

    const [applications, postedJobs] = await Promise.all([
        prisma.application.findMany({
            where: { userId: session?.user?.id },
            include: {
                job: {
                    include: { postedBy: true }
                }
            },
            orderBy: { appliedAt: "desc" },
        }),
        prisma.job.findMany({
            where: { postedById: session?.user?.id },
            include: {
                _count: {
                    select: {
                        applications: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        })
    ]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="font-roboto text-4xl font-semibold mb-8">Dashboard</h2>
            <div className="grid gap-8 md:grid-cols-2">
                {/* Left side */}
                <div>
                    <div className="flex items-center justify-between gap-1 mb-6">
                        <h3 className="text-xl">My posted jobs</h3>
                        <Link href="/jobs/add" className="bg-emerald-700 hover:bg-emerald-600 transition-colors duration-200 px-3 py-1 rounded-lg text-sm">Post new job</Link>
                    </div>
                    <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
                        {postedJobs.length === 0 ?
                            (<p className="p-5 text-gray-300 text-center">No jobs posted yet.</p>)
                            :
                            (postedJobs.map((job) => (
                                <div key={job.id} className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-roboto mb-1">{job.title}</h3>
                                            <p className="text-gray-300 mb-2">{job.company}</p>
                                            <div className="flex items-center text-sm text-gray-400 gap-2">
                                                <span>{job.location}</span>
                                                <span>●</span>
                                                <span>{job.type.substring(0, 1).toUpperCase() + job.type.substring(1)}</span>
                                                <span>●</span>
                                                <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-flex items-center px-3 py-1 bg-indigo-700 rounded-full text-xs font-medium text-gray-200">{job._count.applications} application{job._count.applications !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                    <Link href={`/jobs/${job.id}`} className="text-blue-500 hover:text-blue-400 transition-colors duration-200 text-sm">Job details</Link>
                                </div>
                            )))
                        }
                    </div>
                </div>
                {/* Right side */}
                <div>
                    <h3 className="text-xl mb-6">My applications</h3>
                    <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
                        {applications.length === 0 ?
                            (<p className="p-5 text-gray-300 text-center">No jobs posted yet.</p>)
                            :
                            (applications.map((application) => (
                                <div key={application.id} className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-roboto mb-1">{application.job.title}</h3>
                                            <p className="text-gray-300 mb-2">{application.job.company}</p>
                                            <div className="flex items-center text-sm text-gray-400 gap-2">
                                                <span>{application.job.location}</span>
                                                <span>●</span>
                                                <span>{application.job.type.substring(0, 1).toUpperCase() + application.job.type.substring(1)}</span>
                                                <span>●</span>
                                                <span>{formatDistanceToNow(new Date(application.job.createdAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-flex items-center px-3 py-1 bg-orange-800 rounded-full text-xs font-medium text-gray-200">{application.status.substring(0, 1) + application.status.substring(1).toLowerCase()}</span>
                                        </div>
                                    </div>
                                    <Link href={`/jobs/${application.job.id}`} className="text-blue-500 hover:text-blue-400 transition-colors duration-200 text-sm">Job details</Link>
                                </div>
                            )))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage