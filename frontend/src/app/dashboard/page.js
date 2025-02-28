"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const dummyData = {
  totalVolunteers: 120,
  activeOpportunities: 15,
  applications: 320,
  volunteerTrends: [
    { month: "Jan", count: 20 },
    { month: "Feb", count: 25 },
    { month: "Mar", count: 30 },
    { month: "Apr", count: 28 },
  ],
  skillsDistribution: [
    { skill: "Teaching", count: 40 },
    { skill: "Healthcare", count: 30 },
    { skill: "IT", count: 25 },
    { skill: "Fundraising", count: 25 },
  ],
  opportunityEngagement: [10, 20, 15, 25],
};

const barChartData = {
  labels: dummyData.volunteerTrends.map((d) => d.month),
  datasets: [
    {
      label: "Volunteer Count",
      data: dummyData.volunteerTrends.map((d) => d.count),
      backgroundColor: "#8884d8",
    },
  ],
};

const pieChartData = {
  labels: dummyData.skillsDistribution.map((d) => d.skill),
  datasets: [
    {
      data: dummyData.skillsDistribution.map((d) => d.count),
      backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
    },
  ],
};

const lineChartData = {
  labels: dummyData.volunteerTrends.map((d) => d.month),
  datasets: [
    {
      label: "Participation Trends",
      data: dummyData.volunteerTrends.map((d) => d.count),
      borderColor: "#36A2EB",
      fill: false,
    },
  ],
};

const doughnutChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      data: dummyData.opportunityEngagement,
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
    },
  ],
};

const NGODashboard = () => {
  return (
    <div className="p-10 lg:p-20 lg:pt-10 bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 text-center">NGO Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Total Volunteers", "Active Opportunities", "Applications"].map((label, index) => (
          <Card key={index} className="shadow-lg bg-white pt-5 text-center">
            <CardContent>
              <p className="text-2xl text-gray-600 mb-3">{label}</p>
              <h2 className="text-4xl font-bold">{Object.values(dummyData)[index]}</h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-lg p-6 rounded-lg h-96 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-4 text-center">Volunteer Trends</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white shadow-lg p-10 rounded-lg h-96 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-4 text-center">Skills Distribution</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-lg p-6 rounded-lg h-96 flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-4 text-center">Participation Trends</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white shadow-lg p-10 rounded-lg h-96 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-4 text-center">Opportunity Engagement</h2>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
