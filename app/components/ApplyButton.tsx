"use client";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import { applyForJob } from "@/actions/jobs";

const ApplyButton = ({ jobId }: { jobId: string }) => {
    const [state, applyForJobWithId] = useActionState(applyForJob.bind(null, jobId), null);

    const [isApplying, startTransition] = useTransition();

    if (state?.success) {
        return (
            <>
                <p className="text-emerald-400 mt-2 text-center">{state?.success}</p>
                <Link href="/dashboard" className="text-blue-500 hover:text-blue-400 transition-colors duration-200 underline mt-1 text-center block text-sm">Check your applications</Link>
            </>
        )
    }

    return (
        <>
            <form action={() => { startTransition(applyForJobWithId) }} className="w-3/4 mx-auto">
                <button className="mt-4 px-4 py-2 bg-gray-700 hover:bg-emerald-700 font-semibold rounded-md transition-all duration-200 cursor-pointer w-full disabled:opacity-50 disabled:pointer-events-none" disabled={isApplying}>
                    {isApplying ? "Applying..." : "Apply for this job"}
                </button>
            </form>
            {state?.error && (
                <p className="text-red-400 mt-2 text-center">{state?.error}</p>
            )}
        </>
    )
}

export default ApplyButton