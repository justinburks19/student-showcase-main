"use client"; // Enable client-side rendering
import { useState } from "react";
import React from "react";

export default function Page() {
  const [submit, setSubmit] = useState(false); // State to track form submission
  const [addProject, setAddProject] = useState(1); // State to track number of projects added
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

  const basicInfo = `py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[80%] md:w-[60%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]`;
  const projectInfo =
    "py-1 border border-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[3px] border-b-[4px] w-[90%] md:w-[50%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]";

  //Handle Another project addition
  const handleAddProject = () => {
    //validation for new entry
    const index = addProject;
    
    //validation fields
    const requiredIds = [
        `projectName${index}`,
        `projectDescription${index}`,
        `technologiesUsed${index}`,
        `demoUrl${index}`,
        `repositoryUrl${index}`,
        `semester-${index}`,
        `startDate${index}`,
        `endDate${index}`,
        `screenshotUrl${index}`,
    ];

    // Check if all required fields are filled
    for (const id of requiredIds) {
        const element = document.getElementById(id) as 
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
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

    if (submit === true) return; // Prevent multiple submissions
    setSubmit(true); // Mark as submitted

    const form = event.currentTarget; // Get the form element
    const formData = new FormData(form); // Create FormData object from the form

    const data: { [key: string]: string | File } = {}; // Initialize an empty object to hold form data, the key is string and value will be a string or File
    formData.forEach((value, key) => {
      // Iterate over each form entry
      data[key] = value;
    });

    const jsonData = JSON.stringify(data, null, 2); // Convert form data to JSON string with indentation

    const downloadJson = formData.get("downloadJson"); // Check if the user wants to download the JSON file

    if (downloadJson) {
      // If downloadJson is true, create and download the JSON file
      const blob = new Blob([jsonData], { type: "application/json" }); // Create a Blob from the JSON string
      const url = URL.createObjectURL(blob); // Create a URL for the Blob

      const a = document.createElement("a"); // Create a temporary anchor element
      a.href = url; // Set the href to the Blob URL
      a.download = "portfolio_submission.json"; // Set the download attribute with the filename
      a.click(); // Programmatically click the anchor to trigger the download

      URL.revokeObjectURL(url); // Release the Blob URL
    }

    console.log("Form submitted:", data);
  };
  // Reusable Form Section Component
  type FormSectionProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  };
  // FormSection component to structure form sections
  function FormSection({ title, subtitle, children }: FormSectionProps) {
    return (
      <section className="mb-10">
        <h2 className="italic text-4xl font-semibold text-black mb-1 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl font-medium text-gray-600 mb-6 text-center italic">
            {subtitle}
          </p>
        )}
        {children}
      </section>
    );
  }

  // Reusable TextField Component
  type TextFieldProps = {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    rows?: number;
    textarea?: boolean;
    checkbox?: boolean;
    borderColor?: string;
    divWrapperClass?: string;
  };

  // Reusable TextField Component
  function TextField({
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    required = false,
    className = "",
    rows = 4,
    textarea = false,

    divWrapperClass = "",
  }: TextFieldProps) {
    //contact methods

    return (
      <div className={divWrapperClass}>
        <div className={`mb-3`}>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 align-center mb-1"
          >
            <h1 className="text-2xl font-md font-semibold">{label}</h1>
          </label>
          {textarea ? (
            <textarea
              id={id}
              name={name}
              rows={rows}
              placeholder={placeholder}
              required={required}
              className={className || basicInfo}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              className={className || basicInfo}
            />
          )}
        </div>
      </div>
    );
  }

  // Reusable checkbox component
  type CheckboxProps = {
    name: string;
    label: string;
    mapValue: string[];
    required?: boolean;
    divWrapperClass?: string;
  };
  // Checkbox component to render a list of checkboxes
  function Checkbox({
    name,
    label,
    mapValue,
    required = true,
    divWrapperClass = "",
  }: CheckboxProps) {
    return (
      <div className={divWrapperClass}>
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 mb-1 border-black"
        >
          <h1 className="text-2xl font-md font-semibold">{label}</h1>
        </label>
        <div
          className={`flex border-black flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] p-2 rounded-2xl font-bold w-[90%]  mx-auto`}
        >
          {mapValue.map((skill: string) => (
            <div key={skill} className="flex flex-wrap mx-auto mb-1">
              <input
                type="checkbox"
                id={skill}
                name={name}
                value={skill}
                className="mr-1"
                required={required}
              />
              <label
                htmlFor={skill}
                className="text-md font-medium text-gray-700 "
              >
                {skill}
              </label>
            </div>
          ))}

          <input
            type="text"
            id="skills-other"
            name={name}
            placeholder={`Other ${label}`}
            className={`border-gray-400 text-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px]`}
          />
        </div>
      </div>
    );
  }
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

      //Resuable checkbox with a label
    type CheckBoxExplainedProps = {
    name: string;
    label: string;
    mapValue: string[],
    required?: boolean,
  }
  // Checkbox component to render a list of checkboxes with explanation
  function CheckBoxExplained({ name, label, mapValue, required = true }: CheckBoxExplainedProps) { 
    //should take checkbox props and place a label next to it to fill in explanation
  const [select, setSelect] = useState<Record<string, boolean>>({}); // State to track selected checkboxes, Record with string keys and boolean values

  const handleChange = (method: string) =>  // Handle checkbox state change
    (e: React.ChangeEvent<HTMLInputElement>) => { // Event handler for checkbox change, e is the event object, react change event for input element
        const checked = e.target.checked;
        setSelect((prev) => ({
            ...prev, // Spread previous state
            [method]: checked, // Update the specific method's checked state
        }));
  };
    return (
    <>
        <label
            htmlFor={name}
            className="block font-medium text-gray-700 mb-1 border-black"
            >
            <h1 className="text-2xl font-md font-semibold">{label}</h1>
        </label>
        <div
          className={`flex border-black flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] p-2 rounded-2xl font-bold w-[90%]  mx-auto justify-center align-center`}
        >
            {mapValue.map((method: string, index: number) => {
                const id = `${name}-checkbox-${method}`;
                const explainationID= `${method}-explanation`;
                const isChecked = !!select[method];
                return (
                <div key={method} className="flex flex-col mx-auto mb-1">
              <input
                type="checkbox"
                id={id}
                name={name}
                value={method}
                className="mr-1"
                required={required && index === 0} // Make at least one required
                onChange={handleChange(method)}
                checked={isChecked}
              />
              <label
                htmlFor={id}
                className="text-md font-medium text-gray-700 "
              >
                {method}
              </label>
              {isChecked && (
              <input
                type="text"
                id={explainationID}
                name={`${method}-explanation`}
                placeholder={`Please provide your ${method} details`}
                className={`border-gray-400 text-center w-full border rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px]`}
                />
                )}
                </div>
                );
            }
            )}
        </div>
    </>
    );
  }

  //Resuable year selection dropdown component
  type YearDropdownProps = {
    id: string;
    name: string;
    label: string;
    required?: boolean;
  };
  // YearDropdown component to select graduation year
    function YearDropdown({id, name, label, required = true}: YearDropdownProps) {
        const years = Array.from({length: 10}, (_, i) => new Date().getFullYear() + i); // Generate an array of the next 10 years

        return (
            <div className="mb-3">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 align-center mb-1">
                    <h1 className="text-2xl font-md font-semibold">{label}</h1>
                </label>
                <select
                    id={id}
                    name={name}
                    required={required}
                    className={basicInfo}
                >
                    <option value="" disabled selected>Select your graduation year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        );
    }
        
  //Resuable Semester selection dropdown component
  type SemesterDropdownProps = {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    divClassWrapper?: string;
  };
    // SemesterDropdown component to select semester
    function SemesterDropdown({id, name, label, required = true, divClassWrapper = ""}: SemesterDropdownProps) {
        const semesters = ["Spring", "Summer", "Fall", "Winter"]; // List of semesters
        //collect the past 10 years for selection
        const currentYear = new Date().getFullYear();
        const years = Array.from({length: 10}, (_, i) => currentYear - i); // Generate an array of the past 10 years
        // Combine semesters and years for options
        const semesterYearOptions = [];
        for (const year of years) {
            for (const semester of semesters) {
                semesterYearOptions.push(`${semester} ${year}`);
            }
        }
        return (
            <div className={`mb-3 ${divClassWrapper}`}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 align-center mb-1">
                    <h1 className="text-2xl font-md font-semibold">{label}</h1>
                </label>
                <select
                    id={id}
                    name={name}
                    required={required}
                    className={basicInfo}
                >
                    <option value="" disabled selected>Select semester</option>
                    {semesterYearOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }


    

  
  
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-5">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Submit Your Portfolio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your web development projects with the CSI community by
          submitting your portfolio.
        </p>
      </div>

      {/* Formspree integration for handling form submissions */}
      <div className="max-w-8xl mx-auto bg-white pt-1 rounded-2xl border-l-[3px] border-t-[8px] border-b-[3px] border-r-[3px] border-blue-600">
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
                />

                {/* Email Address Field✅ */}
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="e.g., justin.burks@login.cuny.edu"
                  required={true}
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
              />

              {/* Bio Field ✅*/}
              <TextField
                id="bio"
                name="bio"
                label="Short Bio"
                placeholder="A brief bio about yourself"
                required={true}
                textarea={true}
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
              />

              {/* Contact options ✅*/}
              <CheckBoxExplained
                name="contactMethods"
                label="Preferred Contact Methods"
                mapValue={contactMethods}
                required={false}
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
                        id={`semester-${index}`}
                        name={`semester-${index}`}
                        label={`Project ${index + 1}`}
                        required={true}
                      />
                      {/*Start date Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id="startDate"
                        name="startDate"
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
                        id="endDate"
                        name="endDate"
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
                        id="projectName"
                        name="projectName"
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
                        id="projectDescription"
                        name="projectDescription"
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
                        name="technologiesUsed"
                        label="Technologies Used"
                        mapValue={keySkills}
                        required={false}

                      />
                      {/* Demo URL Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id="demoUrl"
                        name="demoUrl"
                        label="Live Demo URL"
                        type="url"
                        placeholder="https://yourprojectdemo.com"
                        required={true}
                        className={projectInfo}
                      />
                      {/* Repository URL Field ✅*/}
                      <TextField
                        divWrapperClass={"flex flex-col mx-auto w-full"}
                        id="repositoryUrl"
                        name="repositoryUrl"
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
                        id="screenshotUrl"
                        name="screenshotUrl"
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
      </div>
    </div>
  );
}
