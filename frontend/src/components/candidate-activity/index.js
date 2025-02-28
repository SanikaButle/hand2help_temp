// "use client";

// import CommonCard from "../common-card";
// import JobIcon from "../job-icon";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { useState, useEffect } from "react";

// // Mock Data (Replace with API Call)
// const userImpactData = {
//   score: 120, // User's current impact score
//   nextBadge: "Gold", // Upcoming badge level
//   pointsToNext: 30, // Points needed for the next badge
//   badges: ["Bronze", "Silver"], // Earned badges
// };

// import Link from "next/link";

// function VolunteerBadges() {
//   return (
//     <div className="mt-8 mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
//       <div>
//         <h2 className="text-lg font-semibold dark:text-white">
//           🎖️ Your Impact Score: <span className="text-blue-600">{userImpactData.score}</span>
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           {userImpactData.pointsToNext} points away from <b>{userImpactData.nextBadge} Badge</b>!
//         </p>
//         <div className="flex mt-2 space-x-2">
//           {userImpactData.badges.map((badge) => (
//             <span key={badge} className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
//               {badge} 🏅
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Navigate to /Opportunity */}
//       <Link href="/jobs">
//         <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600">
//           Level Up 🚀
//         </div>
//       </Link>
//     </div>
//   );
// }


// function CandidateActivity({ jobList, jobApplicants }) {
//   console.log(jobList, jobApplicants);

//   const uniqueStatusArray = [
//     ...new Set(
//       jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
//     ),
//   ];

//   return (
//     <div className="mx-auto px-10 lg:px-20">
//       {/* New Badge & Score Section */}
//       <VolunteerBadges />

//       <Tabs defaultValue="Applied" className="w-full">
//         <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-6">
//           <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
//             Your Activity
//           </h1>
//           <TabsList>
//             {uniqueStatusArray.map((status) => (
//               <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
//             ))}
//           </TabsList>
//         </div>
//         <div className="pb-10 pt-6">
//           <div className="container mx-auto p-0 space-y-8">
//             <div className="flex flex-col gap-4">
//               {uniqueStatusArray.map((status) => (
//                 <TabsContent key={status} value={status} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {jobList
//                     .filter(
//                       (jobItem) =>
//                         jobApplicants
//                           .filter(
//                             (jobApplication) =>
//                               jobApplication.status.includes(status)
//                           )
//                           .some(
//                             (filteredItemByStatus) =>
//                               jobItem._id === filteredItemByStatus.jobID
//                           )
//                     )
//                     .map((finalFilteredItem) => (
//                       <CommonCard
//                         key={finalFilteredItem._id}
//                         icon={<JobIcon />}
//                         title={finalFilteredItem?.title}
//                         description={finalFilteredItem?.companyName}
//                       />
//                     ))}
//                 </TabsContent>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Tabs>
//     </div>
//   );
// }

// export default CandidateActivity;


"use client";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState, useEffect } from "react";
import Link from "next/link";

// Dynamically calculated impact data
function VolunteerBadges({ impactScore }) {
  // Define badge levels dynamically
  const badgeLevels = [
    { name: "Bronze", threshold: 50 },
    { name: "Silver", threshold: 100 },
    { name: "Gold", threshold: 200 },
    { name: "Platinum", threshold: 500 },
  ];

  // Determine earned badges
  const earnedBadges = badgeLevels.filter((badge) => impactScore >= badge.threshold).map((b) => b.name);

  // Find the next badge
  const nextBadge = badgeLevels.find((badge) => impactScore < badge.threshold);
  const pointsToNext = nextBadge ? nextBadge.threshold - impactScore : 0;

  return (
    <div className="mt-8 mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold dark:text-white">
          🎖️ Your Impact Score: <span className="text-blue-600">{impactScore}</span>
        </h2>
        {nextBadge ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {pointsToNext} points away from <b>{nextBadge.name} Badge</b>!
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">You have the highest Platinum Badge! 🏆</p>
        )}
        <div className="flex mt-2 space-x-2">
          {earnedBadges.map((badge) => (
            <span key={badge} className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
              {badge} 🏅
            </span>
          ))}
        </div>
      </div>

      {/* Navigate to Jobs */}
      <Link href="/jobs">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-600">
          Level Up 🚀
        </div>
      </Link>
    </div>
  );
}

function CandidateActivity({ jobList, jobApplicants }) {
  const [impactScore, setImpactScore] = useState(0);

  useEffect(() => {
    function calculateImpactScore() {
      let totalHours = 0;

      jobApplicants.forEach((application) => {
        if (application.status.includes("selected")) {
          const job = jobList.find((jobItem) => jobItem._id === application.jobID);
          if (job && job.type) {
            totalHours += parseInt(job.type, 10); // Add time required (hours)
          }
        }
      });

      setImpactScore(totalHours);
    }

    calculateImpactScore();
  }, [jobList, jobApplicants]);

  const uniqueStatusArray = [...new Set(jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1))];

  return (
    <div className="mx-auto px-10 lg:px-20">
      {/* Updated VolunteerBadges with Dynamic Score */}
      <VolunteerBadges impactScore={impactScore} />

      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-6">
          <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatusArray.map((status) => (
              <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="pb-10 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {uniqueStatusArray.map((status) => (
                <TabsContent key={status} value={status} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter((jobApplication) => jobApplication.status.includes(status))
                          .some((filteredItemByStatus) => jobItem._id === filteredItemByStatus.jobID)
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        key={finalFilteredItem._id}
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                      />
                    ))}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default CandidateActivity;
