"use client"; // Enable client-side rendering
import {useState} from 'react';
export default function Page() {
    
    const [submit, setSubmit] = useState(false); // State to track form submission
    
    // List of key skills for checkbox options
    const keySkills = ["HTML", "CSS", "JavaScript", "React", "JSX", "TypeScript", "Redux", "React Router", "Next.js", "Vite", "Webpack", "Babel", "Node.js", "NPM", "Yarn", "REST APIs", "GraphQL", "Tailwind CSS", "Sass", "Styled Components", "Material UI", "Bootstrap", "Jest", "React Testing Library", "Cypress",  "Git", "GitHub", "Figma", "Other" ];
    const majorOptions = ["Computer Science", "Information Technology", "Software Engineering", "Other"];
    keySkills.sort(); // Sort keySkills in alphabetical order
    majorOptions.sort(); // Sort majorOptions in alphabetical order
    //filter abc order

    // Handle what information saves and downloads as JSON file
    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();          // STOP FORM FROM REFRESHING

    if (submit === true) return; // Prevent multiple submissions
    setSubmit(true); // Mark as submitted

    const form = event.currentTarget; // Get the form element
    const formData = new FormData(form); // Create FormData object from the form

    const data: { [key: string]: string | File } = {}; // Initialize an empty object to hold form data, the key is string and value will be a string or File
    formData.forEach((value, key) => { // Iterate over each form entry
        data[key] = value;
    });

    const jsonData = JSON.stringify(data, null, 2); // Convert form data to JSON string with indentation

    const downloadJson = formData.get("downloadJson"); // Check if the user wants to download the JSON file

    if (downloadJson) { // If downloadJson is true, create and download the JSON file
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
    const basicInfo = "w-full border border-blue-900 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[3px] border-r-[3px] border-b-[5px] w-[80%] md:w-[60%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]";
    const projectInfo = "w-full border border-orange-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[1px] border-t-[2px] border-r-[1px] border-b-[2px] w-[100%] md:w-[50%] mx-auto text-center text-[clamp(14px,1.5vw,18px)]";
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Submit Your Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your web development projects with the CSI community by submitting your portfolio.
            </p>
        </div>

            
            <section className="space-y-8">
                {/* Formspree integration for handling form submissions */}
            <div className="max-w-8xl mx-auto bg-white p-8 rounded-2xl border-l-[3px] border-t-[8px] border-b-[3px] border-r-[3px] border-blue-600">
                
                <form id="portfolioSubmissionForm" onSubmit={handlesubmit} className="space-y-6">
                <input type="hidden" name="downloadJson" value="true" />
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Portfolio Submission Form</h2>
                <h2 className="text-xl font-medium text-gray-600 mb-6 text-center">Basic Info</h2>
                {/* Basic Info Section ✅*/}
                <div className='text-center '>
                {/* Full Name Field ✅*/}
                <div>
                    {/* Portfolio Submission Form */}
                    <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Full Name</h1>
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    pattern="\S+\s+\S+" // two words, at least character, separated by space, then more characters
                    placeholder="(first and last name)"
                    required
                    className={basicInfo + " md:w-[60%] "}
                    />
                </div>

                {/* Email Address Field✅ */}
                <div>
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Email Address</h1>
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='justin.burks@login.cuny.edu'
                    required // Make email field mandatory with a basic validation @!
                    className={basicInfo}
                    />
                </div>

                {/* Optional URL link of portfolio headedshot needed ✅ */}
                <div>
                    <label
                    htmlFor="portfolioUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Portfolio URL</h1>
                    </label>
                    <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    required // Make portfolio URL field mandatory
                    placeholder="https://your-portfolio.com"
                    className={basicInfo}
                    />
                </div>

                {/* Bio Field ✅*/}
                <div>
                    <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                   <h1 className="text-2xl font-md font-semibold">Short Bio</h1>    
                    </label>
                    <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    placeholder="A brief introduction about yourself and your background please!"
                    className={basicInfo}
                    ></textarea>
                </div>

                {/* Personal Statement ✅*/}
                <div>
                    <label
                    htmlFor="statement"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Personal Statement</h1>
                    </label>
                    <textarea
                    id="statement"
                    name="statement"
                    rows={6}
                    required
                    placeholder="Why are you passionate about web development or whatever you're into?"
                    className={basicInfo}
                    ></textarea>
                </div>

                {/*Major/Field of Study ✅ */}
                <div >
                    <label
                    htmlFor="major"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Major/Field of Study</h1>
                    </label>
                    <div className={`flex flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] border-blue-900 p-2 rounded-2xl font-bold mx-auto w-[80%] md:w-[60%] `}>
                    {majorOptions.map((major) => (
                        <div key={major} className="flex flex-row mb-1">
                            <input
                                type="checkbox"
                                id={major}
                                name="major"
                                value={major}
                                className="mr-1"
                                
                            />
                            <label htmlFor={major} className="text-md text-gray-700">{major}</label>
                        </div>
                    ))}
                    <label htmlFor="major-other" className="sr-only">Other Major</label>
                    <input
                    type="text"
                    id="major-other"
                    name="major"
                    placeholder="Other Major/Field of Study"
                    className="w-full border border-blue-900 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px] "
                    />
                    </div>
                </div>

                {/* Graduation Year ✅*/}
                <div>
                    <label
                    htmlFor="graduationYear"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Graduation Year</h1>
                    </label>
                    <input
                    type="number"
                    id="graduationYear"
                    name="graduationYear"
                    pattern="\d{4}" //expecting four digit year
                    placeholder="Example: 2024"
                    className={basicInfo}
                    />
                </div>

                {/* Contact options ✅*/}
                <div>
                    <label
                    htmlFor="contactOptions"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Preferred Contact Options</h1>
                    </label>
                    <input
                    type="text"
                    id="contactOptions"
                    name="contactOptions"
                    placeholder="e.g., Email, LinkedIn, Phone"
                    required
                    className={basicInfo}
                    />
                </div>

                {/* skills selction ✅*/}
                <div>
                    <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-1 "
                    >
                    <h1 className="text-2xl font-md font-semibold">Key Skills</h1>
                    </label>
                    <div className={`flex flex-wrap gap-2 mb-2 border-x-[2px] border-t-[3px] border-b-[5px] border-blue-900 p-2 rounded-2xl font-bold `}>
                    {keySkills.map((skill) => (
                        <div key={skill} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                id={skill}
                                name="skills"
                                value={skill}
                                className="mr-1"
                            />
                            <label htmlFor={skill} className="text-md font-medium text-gray-700">{skill}</label>
                        </div>
                    ))}
                    <label htmlFor="skills-other" className="sr-only">Other Skills</label>
                    <input type="text" id="skills-other" name="skills" placeholder="Other skills" className="w-full border border-blue-900 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px]" />
                    </div>
                </div>

                {/* Career Goals ✅*/}
                <div>
                    <label
                    htmlFor="careerGoals"
                    className="block text-sm font-medium text-gray-700 mb-1"
                    >
                    <h1 className="text-2xl font-md font-semibold">Career Goals</h1>
                    </label>
                    <textarea
                    id="careerGoals"
                    name="careerGoals"
                    rows={4}
                    required
                    placeholder='What kind of goals do you have in mind?'
                    className={basicInfo}
                    ></textarea>
                    {/* End of Basic Info Section  */}
                    </div>
                </div>
                <h2 className="text-2xl font-medium text-gray-600 mb-6 text-center border-t-[2px] border-gray-300 pt-2 ">Project Semester Info</h2>
                {/* Semesters History, will return id, title, description and technologies ✅*/}
                <div className='grid grid-cols-2 w-full gap-4'>
                    {/* Semester Name Field ✅*/}
                    <div className='col-span-2 w-[50%] flex flex-col mx-auto'>
                        <label
                        htmlFor="semester-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Project Semester Year</h1>
                        </label>
                        <input
                        type="text" 
                        id="semester-name"
                        name="semester-name"
                        placeholder="e.g., Fall 2025"
                        required
                        className={projectInfo}
                        />
                    </div>
                    {/*Start date Field ✅*/}
                    <div>
                        <label
                        htmlFor="start-date"
                        className="block text-sm font-medium text-gray-700 mb-1 flex flex-col items-center"
                        >
                        <h1 className="text-2xl font-md font-semibold">Project Start Date</h1>
                        </label>
                        <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        required
                        className={projectInfo + " flex flex-col justify-center"}
                        />
                    </div>
                    {/* End Date Field ✅*/}
                    <div>
                        <label
                        htmlFor="end-date"
                        className="block text-sm font-medium text-gray-700 mb-1 flex flex-col items-center"
                        >
                        <h1 className="text-2xl font-md font-semibold">Project End Date</h1>
                        </label>
                        <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        required
                        className={projectInfo + " flex flex-col justify-center"}
                        />
                    </div>
                    {/* Project Name Field ✅*/}
                    <div className='col-span-2 w-[50%] flex flex-col mx-auto'>
                        <label
                        htmlFor="project-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Project Name</h1>
                        </label>
                        <input
                        type="text"
                        id="project-name"
                        name="project-name"
                        placeholder="e.g., Personal Portfolio Website"
                        required
                        className={projectInfo}
                        />
                    </div>
                    {/* Project Description Field ✅*/}
                    <div className='col-span-2 w-[75%] flex flex-col mx-auto'>
                        <label
                        htmlFor="project-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Project Description</h1>
                        </label>
                        <textarea
                        id="project-description"
                        name="project-description"
                        rows={4}
                        required
                        placeholder="Briefly describe the project you worked on during this semester."
                        className={projectInfo}
                        ></textarea>
                    </div>
                    {/* Technologies Used Field ✅*/}
                    <div className='col-span-2 flex flex-col mx-auto'>
                        <label
                        htmlFor="technologies-used"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Technologies Used</h1>
                        </label>
                        <div className='flex flex-wrap gap-2 mb-2 border-x-[1px] border-y-[2px] border-orange-400 p-2 rounded-2xl'>
                        {keySkills.map((tech) => (
                        <div key={tech} className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                id={tech}
                                name="technologies-used"
                                value={tech}
                                className="mr-1"
                            />
                            <label htmlFor={tech} className="text-md font-medium text-gray-700">{tech}</label>
                        </div>
                        ))}
                        <div>
                            <label htmlFor="technologies-used-other" className="sr-only">Other Technologies</label>
                            <input
                                type="text"
                                id="technologies-used-other"
                                name="technologies-used"
                                placeholder="Other technologies used"
                                className={projectInfo}
                            />
                        </div>
                        </div>
                    </div>
                    {/* Demo URL Field ✅*/}
                    <div className=' flex flex-col mx-auto w-full'>
                        <label
                        htmlFor="demo-url"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Demo URL</h1>
                        </label>
                        <input
                        type="url"
                        id="demo-url"
                        name="demo-url"
                        placeholder="e.g., https://yourprojectdemo.com"
                        className="w-full border border-orange-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-x-[1px] border-y-[2px] "
                        />
                    </div>
                    {/* Repository URL Field ✅*/}
                    <div className=' flex flex-col mx-auto w-full'>
                        <label
                        htmlFor="repository-url"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Repository URL</h1>
                        </label>
                        <input
                        type="url"
                        id="repository-url"
                        name="repository-url"
                        placeholder="e.g., https://github.com/yourusername/yourproject"
                        className="w-full border border-orange-400 rounded-2xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black border-x-[1px] border-y-[2px] "
                        />
                    </div>
                    {/* Project Home Page Screenshot Field link✅*/}
                    <div className=' flex flex-col mx-auto w-full col-span-2 w-[75%]'>
                        <label
                        htmlFor="screenshot-url"
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                        <h1 className="text-2xl font-md font-semibold text-center">Project Screenshot URL</h1>
                        </label>
                        <input
                        type="url"
                        id="screenshot-url"
                        name="screenshot-url"
                        placeholder="e.g., https://yourproject.com/screenshot.png"
                        className={projectInfo}
                        />
                    </div>

                    {/* Add more projects ✅*/ } 
                    <div>
                    <button
                        type="button"
                        className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        Add Another Project
                    </button>
                    </div>
                    
                </div>

                {/* Submit Button ✅*/}
                <div>
                    <button
                    className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                    Submit Portfolio
                    </button>
                </div>


            
                </form>

                
            </div>
            </section>
            
        </div>
        

    );
}