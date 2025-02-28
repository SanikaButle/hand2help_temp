
"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://ymsijpnegskkoiuerthi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
);

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  console.log(currentCandidateDetails);

  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };

    console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  console.log(jobApplications);

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">{currentCandidateDetails?.candidateInfo?.name}, <span className="text-yellow-300">{currentCandidateDetails?.email}</span></h1>
          
          <p className="text-lg mt-2"><span className="font-semibold">Current NGO:</span> {currentCandidateDetails?.candidateInfo?.currentCompany}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><span className="font-semibold">Experience:</span> {currentCandidateDetails?.candidateInfo?.totalExperience} Years</p>
            <p><span className="font-semibold">Availability:</span> {currentCandidateDetails?.candidateInfo?.currentSalary} hrs/week</p>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold">Past Volunteering Experience</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentCandidateDetails?.candidateInfo?.previousCompanies.split(",").map((exp) => (
                <span className="px-3 py-1 bg-yellow-400 text-black text-sm rounded-lg">{exp}</span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentCandidateDetails?.candidateInfo?.skills.split(",").map((skill) => (
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg">{skill}</span>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            <Button onClick={handlePreviewResume} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Resume
            </Button>
            <div className="flex gap-2">
              <Button onClick={() => handleUpdateJobStatus("selected")} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg">
                Select
              </Button>
              <Button onClick={() => handleUpdateJobStatus("rejected")} className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg">
                Reject
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>

      </Dialog>
    </Fragment>
  );
}

export default CandidateList;