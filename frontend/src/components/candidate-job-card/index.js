
"use client";

import { Fragment, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "../ui/use-toast";

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  console.log(jobApplications, "jobApplications");
  const { toast } = useToast();

  async function handlejobApply() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 5) {
      setShowJobDetailsDrawer(false);
      toast({
        variant: "destructive",
        title: "You can apply max 2 activities.",
        description: "Please opt for membership to apply for more activities",
      });
      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button
              onClick={() => setShowJobDetailsDrawer(true)}
              className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between items-center">
              {/* Job Title */}
              <DrawerTitle className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {jobItem?.title}
              </DrawerTitle>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handlejobApply}
                  disabled={jobApplications.some((item) => item.jobID === jobItem?._id)}
                  className="px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700"
                >
                  {jobApplications.some((item) => item.jobID === jobItem?._id)
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  onClick={() => setShowJobDetailsDrawer(false)}
                  className="px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-200 bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>

          {/* Job Description */}
          <DrawerDescription className="text-xl font-medium text-gray-700 dark:text-gray-300 mt-2">
            {jobItem?.description}
            <span className="ml-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              {jobItem?.location}
            </span>
          </DrawerDescription>

          {/* Opportunity Type Section */}
        <div className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
          Time Required:{" "}
          <span className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md">
            {jobItem?.type} hour
          </span>
          
        </div>


          {/* Experience Required */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
            Experience Required: {jobItem?.experience} year
          </h3>

          {/* Skills Section */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Skills Required:
            </h4>
            <div className="flex flex-wrap gap-3 mt-2">
              {jobItem?.skills.split(",").map((skillItem, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-full"
                >
                  {skillItem}
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>

      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;