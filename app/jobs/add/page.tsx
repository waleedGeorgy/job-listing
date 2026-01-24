"use client";
import { postJob } from "@/actions/jobs";
import { useActionState, useTransition } from "react";

const AddJobPage = () => {
    const [state, formAction] = useActionState(postJob, {});
    
    const [jobIsPosting, startTransition] = useTransition();
    //Add a toast notification for successful job posting

    return (
        <div className="max-w-xl mx-auto flex flex-col">
            <h2 className="font-roboto text-3xl mb-2 text-center">Post a Job</h2>
            <form className="space-y-5" action={(formData: FormData) => { startTransition(() => formAction(formData)) }}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <label htmlFor="title" className="text-sm font-semibold opacity-60">Job Title*</label>
                        {state?.title && (<span className="text-xs text-red-400">Title is required</span>)}
                    </div>
                    <input type="text" id="title" name="title" autoFocus autoComplete="on" className={`px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-none rounded-md ${state?.title && ("ring-2 ring-red-400")}`} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <label htmlFor="company" className="text-sm font-semibold opacity-60">Company*</label>
                        {state?.company && (<span className="text-xs text-red-400">Company is required</span>)}
                    </div>
                    <input type="text" id="company" name="company" autoComplete="on" className={`px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-none rounded-md ${state?.company && ("ring-2 ring-red-400")}`} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <label htmlFor="location" className="text-sm font-semibold opacity-60">Location*</label>
                        {state?.location && (<span className="text-xs text-red-400">Location is required</span>)}
                    </div>
                    <input type="text" id="location" name="location" autoComplete="on" className={`px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-none rounded-md ${state?.location && ("ring-2 ring-red-400")}`} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="jobType" className="text-sm font-semibold opacity-60">Job Type*</label>
                    <select id="jobType" name="jobType" className="px-3 py-2 border border-gray-700 rounded-md bg-background focus:ring-2 focus:ring-emerald-600 focus:outline-none">
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                        <label htmlFor="location" className="text-sm font-semibold opacity-60">Job Description*</label>
                        {state?.description && (<span className="text-xs text-red-400">Description is required</span>)}
                    </div>
                    <textarea id="description" name="description" rows={5} autoComplete="off" className={`resize-none px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-emerald-600 focus:outline-none rounded-md ${state?.description && ("ring-2 ring-red-400")}`} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="salary" className="text-sm font-semibold opacity-60">Salary (optional)</label>
                    <input type="text" id="salary" name="salary" autoComplete="on" className="px-3 py-2 border border-gray-700 rounded-md placeholder:text-sm placeholder:font-light focus:ring-2 focus:ring-emerald-600 focus:outline-none" placeholder="e.g. $10,000 - $20,000" />
                </div>
                <button disabled={jobIsPosting} type="submit" className="px-5 py-2 bg-gray-800 rounded-md my-4 cursor-pointer hover:bg-emerald-700 transition-colors duration-200 w-full text-sm disabled:opacity-50 disabled:pointer-events-none">
                    {jobIsPosting ? "Posting..." : "Post Job"}
                </button>
            </form>
        </div>
    )
}

export default AddJobPage;