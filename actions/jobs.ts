"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Job, User } from "@prisma/client";
import { notFound, redirect, RedirectType } from "next/navigation";

type jobWithPostedBy = Job & { postedBy?: User | null };

interface jobPostingResult {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  success?: string;
}

interface applicationResponse {
  error?: string;
  success?: string;
}

export async function postJob(
  prevState: unknown,
  formData: FormData,
): Promise<jobPostingResult> {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    throw new Error(
      "No existing user, or user session has expired. Please sign in to post a job.",
    );
  }

  const res = {} as jobPostingResult;

  const title = formData.get("title") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("jobType") as string;
  const description = formData.get("description") as string;
  const salary = formData.get("salary") as string;

  if (!title || title.trim().length === 0) {
    res.title = "Title is required";
  }
  if (!company || company.trim().length === 0) {
    res.company = "Company is required";
  }
  if (!location || location.trim().length === 0) {
    res.location = "Location is required";
  }
  if (!description || description.trim().length === 0) {
    res.description = "Description is required";
  }

  if (Object.keys(res).length > 0) return res;
  else {
    try {
      await prisma.job.create({
        data: {
          title,
          company,
          location,
          type,
          description,
          salary,
          postedById: session.user.id,
        },
      });
      res.success = "Job posted successfully";
      return res;
    } catch (error) {
      console.error("Error posting job:", error);
      if (error instanceof Error) {
        throw new Error("An error occurred " + error);
      } else {
        throw new Error("An unknown error occurred. Please try again later.");
      }
    }
  }
}

export const fetchJobs = async (searchParams: {
  [key: string]: string | undefined;
}): Promise<jobWithPostedBy[]> => {
  const { title, type, location } = searchParams;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          title
            ? {
                OR: [
                  { title: { contains: title, mode: "insensitive" } },
                  { description: { contains: title, mode: "insensitive" } },
                  { company: { contains: title, mode: "insensitive" } },
                ],
              }
            : {},
          type ? { type: type } : {},
          location
            ? { location: { contains: location, mode: "insensitive" } }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
      include: { postedBy: true },
    });
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    if (error instanceof Error) {
      throw new Error("An error occurred " + error);
    } else {
      throw new Error("An unknown error occurred. Please try again later.");
    }
  }
};

export const getJobById = async (id: string): Promise<jobWithPostedBy> => {
  const job = await prisma.job.findUnique({
    where: { id },
    include: { postedBy: true },
  });

  if (!job) notFound();

  return job;
};

export const applyForJob = async (
  jobId: string | undefined,
): Promise<applicationResponse> => {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    redirect("/auth/signin", RedirectType.replace);
  }

  if (!jobId) notFound();

  const applicationRes = {} as applicationResponse;

  try {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      applicationRes.error = "Job does not exist.";
      return applicationRes;
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        userId: session.user.id,
      },
    });
    if (existingApplication) {
      applicationRes.error = "You have already applied for this job.";
      return applicationRes;
    }

    await prisma.application.create({
      data: {
        jobId: jobId,
        userId: session.user.id,
        status: "PENDING",
      },
    });
    applicationRes.success = "Application submitted successfully.";
    return applicationRes;
  } catch (error) {
    console.error("Error applying for job:", error);
    if (error instanceof Error) {
      applicationRes.error = error.message;
    } else {
      applicationRes.error =
        "An unknown error occurred. Please try again later.";
    }
    return applicationRes;
  }
};
