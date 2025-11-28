"use client"; // Enable client-side rendering
import { useState } from "react";
import React from "react";
import {FormSection} from "./selections/formSection"; // Import the reusable FormSection component
import {TextField} from "./selections/textField"; // Import the reusable TextField component
import {Checkbox} from "./selections/checkbox"; // Import the reusable Checkbox component
import {YearDropdown} from "./selections/yearsDrop"; // Import the reusable YearDropdown component
import {SemesterDropdown} from "./selections/semesterDrop"; // Import the reusable SemesterDropdown component
import {CheckBoxExplained} from "./selections/checkBoxExplained"; // Import the reusable CheckBoxExplained component
import { motion as m, AnimatePresence} from "framer-motion";
import { size } from "zod/v4";
import { get } from "http";
export default function Page() {
  const [submit, setSubmit] = useState(false); // State to track form submission
  const [addProject, setAddProject] = useState(1); // State to track number of projects added
  const [getStarted, setGetStarted] = useState(false); // State to track if user has started filling the form
  // List of key skills for checkbox options
  const keySkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "JSX",
    "TypeScript",
    "Redux",
    "React Router",
    "Next.js",
    "Vite",
    "Webpack",
    "Babel",
    "Node.js",
    "NPM",
    "Yarn",
    "REST APIs",
    "GraphQL",
    "Tailwind CSS",
    "Sass",
    "Styled Components",
    "Material UI",
    "Bootstrap",
    "Jest",
    "React Testing Library",
    "Cypress",
    "Git",
    "GitHub",
    "Figma",
  ];
  const majorOptions = [
    "Computer Science",
    "Information Technology",
    "Software Engineering",
  ];

  //filter abc order
  keySkills.sort(); // Sort keySkills in alphabetical order
  majorOptions.sort(); // Sort majorOptions in alphabetical order

  const basicInfo = `py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[80%] md:w-[60%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]`;
  const projectInfo =
    "py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[90%] md:w-[50%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]";
  //Handle Another project addition
  const handleAddProject = () => {
    //validation for new entry
    const index = addProject;
    
    //validation fields
    const requiredIds = [
        `projectName-${index}`, // Updated to use dynamic index
        `projectDescription-${index}`,
        `technologiesUsed-${index}`,
        `demoUrl-${index}`,
        `repositoryUrl-${index}`,
        `semester-${index}`,
        `startDate-${index}`,
        `endDate-${index}`,
        `screenshotUrl-${index}`,
    ];

    // Check if all required fields are filled
    for (const id of requiredIds) {
        const element = document.getElementById(id) as 
        | HTMLInputElement // for text and url inputs
        | HTMLTextAreaElement // for textarea inputs
        | HTMLSelectElement // for select dropdowns
        
        if (!element) continue; // Skip if element not found

        // Additional validation for URL fields
        if (!element?.value.trim()) { // Check if the element is valid
            alert(`Please complete "${id}" field before adding another project.`);
            element.focus(); // Focus on the empty field
            return; // Exit the function if validation fails
        }
    }
    // If validation passes, increment the project count
    setAddProject((prev) => prev + 1);
  };

  // Handle what information saves and downloads as JSON file
const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // STOP FORM FROM REFRESHING

  if (submit) return; // Prevent multiple submissions
  setSubmit(true); // Mark as submitted

  const form = event.currentTarget; // Get the form element
  const formData = new FormData(form); // Create FormData object from the form

  const data: { [key: string]: string | File } = {};

  // Grab basic fields (will get the *last* value for repeated names)
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // ----- FIX FOR CHECKBOX GROUPS -----
  // Collect ALL checked values for these fields:
  const multiValueFields = ["major", "skills", "contactMethods", "technologiesUsed-1"];

  multiValueFields.forEach((value) => {
    const values = formData
      .getAll(value)     // all values for that name
      .map((v) => v.toString().trim()) // to string and trim whitespace
      .filter(Boolean);  // drop empties

    if (values.length > 0) {
      // store as comma-separated string
      data[value] = values.join(", ");
    } else {
      data[value] = "";
    }
  });
  // -----------------------------------

  const jsonData = JSON.stringify(data, null, 2); // Convert form data to JSON string with indentation

  const downloadJson = formData.get("downloadJson");

  if (downloadJson) {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_submission.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  console.log("Form submitted:", data);
};


    // Contact methods options
  const contactMethods = [
  "Email",
  "Phone Number",
  "LinkedIn",
  "GitHub",
  "Portfolio Website",
  "Discord",
  "X / Twitter",
]
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white">
    <div className="h-full container relative mx-auto px-10 sm:px-6 mg:px-8 bg-transparent pt-10">
      <AnimatePresence mode="wait">
      {!getStarted && (
      <m.div 
      key = "portfolio-circle"
      className=" 
      relative
      flex flex-col justify-center items-center  max-w-[min(100vw,700px)]
      aspect-square
      overflow-hidden
      gpu-acceleration text-center mb-4 border-transparent rounded-full bg-white shadow-xl p-[clamp(1rem,2.5vw,3rem)] mx-auto " 
      initial={{ opacity: 0.7, translateY: 0, borderColor:"Transparent"}}
      animate={{ opacity: 1,  translateY: [-20, 0, -15, 0, -10, 0, -5, 0], borderColor:["Transparent", "Black", "Transparent"]}}
      transition={{duration: 3, repeatType: "mirror", 
      
      }}
      exit={{
        opacity: 0,
        scale:0.8,
        rotateY: [0,270,360,180,270,360],
        transition: { duration: 3, ease: "easeInOut" }
      }}
      style={{ borderWidth: 2, borderStyle: "solid", borderColor: "transparent", transformStyle: "preserve-3d" }}
      >
       
          <m.div className="flex absolute text-[clamp(1rem,2.2vw,3rem)] 
          mx-auto
          inset-0
          md:w-[clamp(20%,20%,90%)] w-[clamp(20%,20%,90%)]
          pointer-events-none"
          
          initial={{ opacity: 0.7, }}
        animate={{ opacity: 1, rotate: 360,fontSize: ["clamp(1rem,2.2vw,3rem)", "clamp(1rem,3.3vw,3rem)"] }}
        transition={{ duration: 3,repeat: Infinity, repeatType: "loop", ease: "linear"}}>🟠
        </m.div>
        <m.div className="flex absolute text-[clamp(1rem,2.2vw,3rem)]
          mx-auto
          inset-0
          md:w-[clamp(20%,20%,100%)] w-[clamp(20%,20%,100%)]
          pointer-events-none"
           initial={{ opacity: 0.7, }}
        animate={{ opacity: 1, rotate: -360, fontSize: ["clamp(1rem,3.3vw,3rem)", "clamp(1rem,2.2vw,3rem)"] }}
        transition={{ duration: 3,repeat: Infinity, repeatType: "loop", ease: "linear"}}>🔵
          </m.div>
        <h1 className="text-[clamp(1.1rem,2.2vw,3rem)] md:text-[clamp(2rem,4vw,5rem)] font-bold text-gray-900 mb-4">
          Submit Your Portfolio
        </h1>
        <p className="text-[clamp(1rem,2.2vw,1.5rem)] text-gray-600 max-w-2xl mx-auto">
          Share your web development projects with the CSI community by
          submitting your portfolio.
        </p>
        <button
          onClick={() => setGetStarted(true)}
          className="mb-6 mt-6 bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black"
        >
          Get Started!
        </button>
      </m.div>
      )}
      </AnimatePresence>
        

      {/* Formspree integration for handling form submissions */}
      {getStarted && (
        <>
      {!submit ? (
        <>
      <m.div className=" max-w-8xl mx-auto bg-white pt-1 rounded-2xl border-l-[3px] border-t-[8px] border-b-[3px] border-r-[3px] border-blue-600"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.3, delay: 3 }}>
        <form
          id="portfolioSubmissionForm"
          onSubmit={handlesubmit}
          className="space-y-6"
        >
          <input type="hidden" name="downloadJson" value="true" />
          <FormSection
            title="Basic Information"
            subtitle="Tell us about yourself"
          >
            {/* wrapped text center for basic info   ✅*/}
            <div className="text-center ">
              {/* Full Name Field ✅*/}
              <div className="grid grid-cols-2">
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  placeholder="e.g., Justin Burks"
                  required={true}
                  className={basicInfo}
                />

                {/* Email Address Field✅ */}
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="e.g., justin.burks@login.cuny.edu"
                  required={true}
                  className={basicInfo}
                />
              </div>

              {/* Optional URL link of portfolio headedshot needed ✅ */}
              <TextField
                id="headshotUrl"
                name="headshotUrl"
                label="Headshot URL (Optional)"
                type="url"
                placeholder="e.g., https://yourheadshoturl.com/image.jpg"
                required={false}
                className={basicInfo}
              />

              {/* Bio Field ✅*/}
              <TextField
                id="bio"
                name="bio"
                label="Short Bio"
                placeholder="A brief bio about yourself"
                required={true}
                textarea={true}
                className={basicInfo}
                rows={4}
              />

              {/* Personal Statement ✅*/}
              <TextField
                id="personalStatement"
                name="personalStatement"
                label="Personal Statement"
                placeholder="Why are you passionate about web development?"
                required={true}
                textarea={true}
                rows={4}
                className={basicInfo}
              />

              {/*Major/Field of Study ✅ */}
              <Checkbox
                name="major"
                label="Major / Field of Study"
                mapValue={majorOptions}
                required={true}
              />

              {/* Graduation Year ✅*/}
              <YearDropdown
                id="graduationYear"
                name="graduationYear"
                label="Graduation Year"
                required={true}
                className={basicInfo}
              />

              {/* Contact options ✅*/}
              <CheckBoxExplained
                name="contactMethods"
                label="Preferred Contact Methods"
                mapValue={contactMethods}
                required={true}
              />

              {/* skills selction ✅*/}
              <Checkbox
                name="skills"
                label="Key Skills"
                mapValue={keySkills}
                required={false}
              />

              {/* Career Goals ✅*/}
              <TextField
                id="careerGoals"
                name="careerGoals"
                label="Career Goals"
                placeholder="What are your career aspirations in web development?"
                required={true}
                textarea={true}
                rows={4}
                className={basicInfo}
              />

              <h2 className="text-4xl font-bold text-black mb-6 text-center border-t-[6px] border-blue-700 rounded-xl pt-2 italic">
                Project Semester Info
              </h2>
              {/* Semesters History, will return id, title, description and technologies ✅*/}
              <div className="grid grid-cols-2 w-full ">
                {Array.from({ length: addProject }).map((_, index) => {
                    const projectIndex = index + 1;
                  return (
                    <React.Fragment key={projectIndex}>
                      {/* Semester Name Field ✅*/}
                      <SemesterDropdown
                        divClassWrapper={"col-span-2"}
                        id={`semester-${projectIndex}`}
                        name={`semester-${projectIndex}`}
                        label={`Project ${projectIndex}`}
                        required={true}
                        className={basicInfo}
                      />
                      {/*Start date Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id={`startDate-${projectIndex}`}
                        name={`startDate-${projectIndex}`}
                        label="Project Start Date"
                        type="date"
                        required={true}
                        className={
                          projectInfo + " flex flex-col justify-center"
                        }
                      />
                      {/* End Date Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id={`endDate-${projectIndex}`}
                        name={`endDate-${projectIndex}`}
                        label="Project End Date"
                        type="date"
                        required={true}
                        className={
                          projectInfo + " flex flex-col justify-center"
                        }
                      />

                      {/* Project Name Field ✅*/}
                      <TextField
                        divWrapperClass={
                          "col-span-2 flex flex-col mx-auto w-full"
                        }
                        id={`projectName-${projectIndex}`}
                        name={`projectName-${projectIndex}`}
                        label="Project Name"
                        placeholder="e.g., Personal Portfolio Website"
                        required={true}
                        className={
                          projectInfo + " col-span-2 flex flex-col mx-auto"
                        }
                      />
                      {/* Project Description Field ✅*/}
                      <TextField
                        divWrapperClass={
                          "col-span-2 flex flex-col mx-auto w-full"
                        }
                        id={`projectDescription-${projectIndex}`}
                        name={`projectDescription-${projectIndex}`}
                        label="Project Description"
                        placeholder="Describe your project in detail"
                        required={true}
                        textarea={true}
                        rows={5}
                        className={
                          projectInfo + " col-span-2 flex flex-col mx-auto"
                        }
                      />

                      {/* Technologies Used Field ✅*/}
                      <Checkbox
                        divWrapperClass={"col-span-2"}
                        name={`technologiesUsed-${projectIndex}`}
                        label="Technologies Used"
                        mapValue={keySkills}
                        required={false}

                      />
                      {/* Demo URL Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id={`demoUrl-${projectIndex}`}
                        name={`demoUrl-${projectIndex}`}
                        label="Live Demo URL"
                        type="url"
                        placeholder="https://yourprojectdemo.com"
                        required={true}
                        className={projectInfo}
                      />
                      {/* Repository URL Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id={`repositoryUrl-${projectIndex}`}
                        name={`repositoryUrl-${projectIndex}`}
                        label="Repository URL"
                        type="url"
                        placeholder="https://github.com/yourusername/yourproject"
                        required={true}
                        className={projectInfo}
                      />
                      {/* Project Home Page Screenshot Field link✅*/}
                      <TextField
                        divWrapperClass={
                          "col-span-2 flex flex-col mx-auto w-full"
                        }
                        id={`screenshotUrl-${projectIndex}`}
                        name={`screenshotUrl-${projectIndex}`}
                        label="Project Home Page Screenshot URL"
                        type="url"
                        placeholder="https://yourproject.com/screenshot.jpg"
                        required={false}
                        className={
                          projectInfo + " col-span-2 flex flex-col mx-auto"
                        }
                      />
                    </React.Fragment>
                  );
                })}

                {/* Add more projects ✅*/}
                <div className="flex mx-auto justify-center col-span-2">
                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="border-black border-[2px] w-[75%] bg-green-600 text-white font-medium py-2 px-4 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Add Another Project
                  </button>
                </div>
              </div>

              {/* Submit Button ✅*/}
              <div className="mt-8 mb-4 w-full flex justify-center">
                <button className="w-[75%] bg-blue-600 text-white font-medium py-3 px-4 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black">
                  Submit Portfolio
                </button>
              </div>

              {/*End of wrapper center ️✅*/}
            </div>
          </FormSection>
        </form>
      </m.div>
        </>
      ) : (

        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-2xl text-center">
          Thank you for your submission! Your portfolio should be ready to download.
        <p>Please email: Adam.Kostandy@csi.cuny.edu the download/ text field!</p>
          
        </div>
      )}
        </>
    )}
    </div>
      
    </div>
      
  );
}
