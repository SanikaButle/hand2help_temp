// "use client";

// import {
//   candidateOnboardFormControls,
//   initialCandidateAccountFormData,
//   initialCandidateFormData,
//   initialRecruiterFormData,
//   recruiterOnboardFormControls,
// } from "@/utils";
// import { useEffect, useState } from "react";
// import CommonForm from "../common-form";
// import { updateProfileAction } from "@/actions";

// function AccountInfo({ profileInfo }) {
//   const [candidateFormData, setCandidateFormData] = useState(
//     initialCandidateAccountFormData
//   );
//   const [recruiterFormData, setRecruiterFormData] = useState(
//     initialRecruiterFormData
//   );

//   // useEffect(() => {
//   //   if (profileInfo?.role === "recruiter")
//   //     setRecruiterFormData(profileInfo?.recruiterInfo);

//   //   if (profileInfo?.role === "candidate")
//   //     setCandidateFormData(profileInfo?.candidateInfo);
//   // }, [profileInfo]);
//   useEffect(() => {
//     console.log("Profile Info:", profileInfo);
  
//     if (profileInfo?.role === "recruiter") {
//       console.log("Recruiter Data:", profileInfo.recruiterInfo);
//       setRecruiterFormData(profileInfo.recruiterInfo || initialRecruiterFormData);
//     }
  
//     if (profileInfo?.role === "candidate") {
//       console.log("Candidate Data:", profileInfo.candidateInfo);
//       setCandidateFormData(profileInfo.candidateInfo || initialCandidateAccountFormData);
//     }
//   }, [profileInfo]);
  

//   console.log(profileInfo, "candidateFormData", profileInfo);

//   async function handleUpdateAccount() {
//     await updateProfileAction(
//       profileInfo?.role === "candidate"
//         ? {
//             _id: profileInfo?._id,
//             userId: profileInfo?.userId,
//             email: profileInfo?.email,
//             role: profileInfo?.role,
//             isPremiumUser: profileInfo?.isPremiumUser,
//             memberShipType: profileInfo?.memberShipType,
//             memberShipStartDate: profileInfo?.memberShipStartDate,
//             memberShipEndDate: profileInfo?.memberShipEndDate,
//             candidateInfo: {
//               ...candidateFormData,
//               resume: profileInfo?.candidateInfo?.resume,
//             },
//           }
//         : {
//             _id: profileInfo?._id,
//             userId: profileInfo?.userId,
//             email: profileInfo?.email,
//             role: profileInfo?.role,
//             isPremiumUser: profileInfo?.isPremiumUser,
//             memberShipType: profileInfo?.memberShipType,
//             memberShipStartDate: profileInfo?.memberShipStartDate,
//             memberShipEndDate: profileInfo?.memberShipEndDate,
//             recruiterInfo: {
//               ...recruiterFormData,
//             },
//           },
//       "/account"
//     );
//   }

//   return (
//     <div className="mx-auto">
//       <div className="flex items-baseline dark:border-white justify-between pb-6 border-b pt-24">
//         <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
//           Account Details
//         </h1>
//       </div>
//       <div className="py-20 pb-24 pt-6">
//         <div className="container mx-auto p-0 space-y-8">
//           {/* <CommonForm
//             action={handleUpdateAccount}
//             formControls={
//               profileInfo?.role === "candidate"
//                 ? candidateOnboardFormControls.filter(
//                     (formControl) => formControl.name !== "resume"
//                   )
//                 : recruiterOnboardFormControls
//             }
//             formData={
//               profileInfo?.role === "candidate"
//                 ? candidateFormData
//                 : recruiterFormData
//             }
//             setFormData={
//               profileInfo?.role === "candidate"
//                 ? setCandidateFormData
//                 : setRecruiterFormData
//             }
//             buttonText="Update Profile"
//           /> */}
//           <CommonForm
//             action={handleUpdateAccount}
//             formControls={
//               profileInfo?.role === "candidate"
//                 ? candidateOnboardFormControls.filter((formControl) => formControl.name !== "resume")
//                 : recruiterOnboardFormControls
//             }
//             formData={
//               profileInfo?.role === "candidate"
//                 ? candidateFormData || initialCandidateAccountFormData
//                 : recruiterFormData || initialRecruiterFormData
//             }
//             setFormData={
//               profileInfo?.role === "candidate"
//                 ? setCandidateFormData
//                 : setRecruiterFormData
//             }
//             buttonText="Update Profile"
//           />

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountInfo;


"use client";

import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";

function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  console.log(profileInfo, "candidateFormData", profileInfo);

  async function handleUpdateAccount() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
  <div className="flex items-baseline justify-between pb-6 border-b pt-10 dark:border-white">
    <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white">
      Account Details
    </h1>
  </div>
  <div className="py-20 pb-24 pt-6">
    <div className="container mx-auto p-0">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        <CommonForm
          action={handleUpdateAccount}
          formControls={
            profileInfo?.role === "candidate"
              ? candidateOnboardFormControls.filter(
                  (formControl) => formControl.name !== "resume"
                )
              : recruiterOnboardFormControls
          }
          formData={
            profileInfo?.role === "candidate"
              ? candidateFormData
              : recruiterFormData
          }
          setFormData={
            profileInfo?.role === "candidate"
              ? setCandidateFormData
              : setRecruiterFormData
          }
          buttonText="Update Profile"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        />
      </div>
    </div>
  </div>
</div>

  );
}

export default AccountInfo;