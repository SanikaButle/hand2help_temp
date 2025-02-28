
import qs from "query-string";

export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "NGO Name",
    name: "companyName",
    placeholder: "Enter your NGO name",
    componentType: "input",
  },
  {
    label: "Role at NGO",
    name: "companyRole",
    placeholder: "Enter your role",
    componentType: "input",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current NGO",
    name: "currentCompany",
    placeholder: "Enter your current company",
    componentType: "input",
  },
  // {
  //   label: "Preferred Volunteering Location",
  //   name: "currentJobLocation",
  //   placeholder: "Enter preferred volunteering location",
  //   componentType: "input",
  // },
  {
    label: "Preferred Volunteering Location",
    name: "preferedJobLocation",
    placeholder: "Enter preferred volunteering location",
    componentType: "input",
  },
  {
    label: "Availability Hours per Week",
    name: "currentSalary",
    placeholder: "Enter your availability hours per week",
    componentType: "input",
  },
  // {
  //   label: "Notice Period",
  //   name: "noticePeriod",
  //   placeholder: "Enter your notice period",
  //   componentType: "input",
  // },
  {
    label: "Skills & Expertise",
    name: "skills",
    placeholder: "Enter your skills & expertise",
    componentType: "input",
  },
  {
    label: "Past Volunteering Experience",
    name: "previousCompanies",
    placeholder: "Enter previous NGOs/organizations",
    componentType: "input",
  },
  {
    label: "Total Experience(in years)",
    name: "totalExperience",
    placeholder: "Enter total years of volunteering experience",
    componentType: "input",
  },
  {
    label: "Education Qualification",
    name: "college",
    placeholder: "Enter your highest education qualification",
    componentType: "input",
  },
  // {
  //   label: "College Location",
  //   name: "collegeLocation",
  //   placeholder: "Enter your college location",
  //   componentType: "input",
  // },
  // {
  //   label: "Graduated Year",
  //   name: "graduatedYear",
  //   placeholder: "Enter your graduated year",
  //   componentType: "input",
  // },
  {
    label: "Linkedin Profile",
    name: "linkedinProfile",
    placeholder: "Enter your linkedin profile",
    componentType: "input",
  },
  // {
  //   label: "Github Profile",
  //   name: "githubProfile",
  //   placeholder: "Enter your github profile",
  //   componentType: "input",
  // },
];

export const initialCandidateFormData = {
  resume: "",
  name: "",
  // currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  //noticePeriod: "",
  skills: "",
  currentCompany: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  //collegeLocation: "",
  //graduatedYear: "",
  linkedinProfile: "",
  //githubProfile: "",
};

export const initialCandidateAccountFormData = {
  name: "",
  //currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  //noticePeriod: "",
  skills: "",
  currentCompany: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  //collegeLocation: "",
  //graduatedYear: "",
  linkedinProfile: "",
  //githubProfile: "",
};

export const postNewJobFormControls = [
  {
    label: "NGO Name",
    name: "companyName",
    placeholder: "NGO Name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Opportunity Title",
    name: "title",
    placeholder: "Title of the volunteering opportunity",
    componentType: "input",
  },
  {
    label: "Time required",
    name: "type",
    placeholder: "Time Required[in hrs]",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Location of the opportunity",
    componentType: "input",
  },
  {
    label: "Required Experience",
    name: "experience",
    placeholder: "Required years of experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Description the opportunity",
    componentType: "input",
  },
  {
    label: "Skills Needed",
    name: "skills",
    placeholder: "List required skills",
    componentType: "input",
  },
];

export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};



export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "NGO Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",");
    });
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    {
      skipNull: true,
    }
  );
}

export const membershipPlans = [
  {
    heading: "Tier 1",
    price: 100,
    type: "basic",
  },
  {
    heading: "Tier 2",
    price: 1000,
    type: "teams",
  },
  {
    heading: "Tier 3",
    price: 5000,
    type: "enterprise",
  },
];