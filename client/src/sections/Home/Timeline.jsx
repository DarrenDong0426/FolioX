// Imports
import timeline from "../../assets/images/documents.png";              // Imports documents image from path ../assets/images/documents.png
import { Link } from "react-router-dom";

export default function Timeline(){
    return <>
       <div className="flex flex-col justify-center flex-[2]">
            <h1 className='text-4xl font-bold mb-4 text-center'>View Timeline</h1>
            <p className="mb-4">
            This timeline feature provides users with a comprehensive, chronological overview of significant achievements and events, organized by year. The timeline displays a wide range of milestones, including academic accomplishments such as major projects, admissions, and degree completions; professional development experiences, such as research appointments, internships, and conference participation; as well as notable personal events, including travel and other meaningful activities. Each event is represented as a distinct point on the timeline for its respective year.
            </p>
            <p className="mb-4">
            When users hover over an event point, it expands into a detailed information box that summarizes the event, allowing for quick insights at a glance. For further exploration, clicking on an event directs users to a dedicated page containing comprehensive details, supporting resources, and related content.    
            </p>
            <p className="mb-4">
            The feature also includes robust filtering options, allowing users to tailor their view based on event categories such as Academic, Professional Development, or Personal. Users can select one or multiple categories simultaneously, enabling a customized and focused timeline experience. Navigational controls support both sequential and direct access to timeline entries, with buttons to move to the previous or next year, as well as to jump directly to the present or the last year in the timeline. Additionally, a scrollbar provides efficient access to any specific year within the timeline.
            </p>
            <p className="mb-4">
                <Link to="/Timeline" className=" font-bold text-blue-600 hover:text-red-600">
                    View Timeline
                </Link>
            </p>
        </div>
        <div className="flex max-w-5xl w-full gap-10 flex-[1]">
            <img 
                src={timeline}
                alt="Timeline"
                className="flex-shrink-0"/>
        </div>
    </>
}