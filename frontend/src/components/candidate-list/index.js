

"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

// Move API Keys to .env.local for security

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

    if (indexOfCurrentJobApplicant === -1) return;

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status: [...cpyJobApplicants[indexOfCurrentJobApplicant].status, getCurrentStatus],
    };

    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications?.length > 0 &&
          jobApplications.map((jobApplicantItem) => (
            <div
              key={jobApplicantItem.candidateUserID}
              className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
            >
              <div className="px-4 my-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-black">
                  {jobApplicantItem?.name}
                </h3>
                <Button
                  onClick={() =>
                    handleFetchCandidateDetails(jobApplicantItem?.candidateUserID)
                  }
                  className="dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Candidate Details Dialog */}
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">
            {currentCandidateDetails?.candidateInfo?.name},{" "}
            <span className="text-yellow-300">
              {currentCandidateDetails?.email}
            </span>
          </h1>

          <p className="text-lg mt-2">
            <span className="font-semibold">Current NGO:</span>{" "}
            {currentCandidateDetails?.candidateInfo?.currentCompany}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {currentCandidateDetails?.candidateInfo?.currentSalary} hrs/week
            </p>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold">Past Volunteering Experience</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentCandidateDetails?.candidateInfo?.previousCompanies
                ?.split(",")
                .map((exp, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-400 text-black text-sm rounded-lg">
                    {exp}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentCandidateDetails?.candidateInfo?.skills
                ?.split(",")
                .map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg">
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {/* Dialog Footer Buttons */}
          <DialogFooter className="mt-6 flex justify-between">
            <Button onClick={handlePreviewResume} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
              Resume
            </Button>

            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={jobApplications.some(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId &&
                  (item.status.includes("selected") || item.status.includes("rejected"))
              )}
            >
              {jobApplications.some(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId &&
                  item.status.includes("selected")
              )
                ? "Selected"
                : "Select"}
            </Button>

            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={jobApplications.some(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId &&
                  (item.status.includes("selected") || item.status.includes("rejected"))
              )}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
