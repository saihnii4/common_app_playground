import * as React from "react";
import Nitpick from "../context/nitpick";

type ActivityType =
  | "academic"
  | "art"
  | "athletics club"
  | "varsity"
  | "career"
  | "community"
  | "culture"
  | "other"
  | "research"
  | "dance"
  | "debate"
  | "student government"
  | "work";

interface Props {
  type: ActivityType;
  position: string;
  organization?: string;
  description: string;
  hours: number;
  weeks: number;
  continue?: boolean;
  // the following are bitmasked
  grades: number;
  timing: number;
}

const conversion = {
  academic: "Academic",
  art: "Art",
  "athletics club": "Athletics: Club",
  varsity: "Athletics: JV/Varsity",
  career: "Career Oriented",
  community: "Community Service (Volunteer)",
  culture: "Cultural",
  dance: "Dance",
  debate: "Debate/Speech",
  other: "Other",
  research: "Research",
  "student government": "Student Government",
  work: "Work (Paid)",
};

const Activity: React.FC<Props> = (props) => {
  const desc = React.useRef<HTMLSpanElement>(null);
  const type = conversion[props.type];
  const grades = [];
  const timing = [];
  if (props.grades & (1 << 0)) grades.push(9);
  if (props.grades & (1 << 1)) grades.push(10);
  if (props.grades & (1 << 2)) grades.push(11);
  if (props.grades & (1 << 3)) grades.push(12);
  if (props.grades & (1 << 4)) grades.push("PG");

  if (props.timing & (1 << 0)) timing.push("School");
  if (props.timing & (1 << 1)) timing.push("Break");
  if (props.timing & (1 << 2)) timing.push("Year");

  const nitpick = React.useContext(Nitpick);

  return (
    <div
      id="activity"
      className="bg-gray-50 flex flex-col p-5 rounded-lg px-8 gap-2 w-[40%]"
    >
      <span className="tracking-wide font-bold text-3xl">{type}</span>
      <div className="flex flex-row">
        <div className="flex flex-col text-md font-semibold w-[30%]">
          <span>{grades.join(", ")}</span>
          <span>{timing.join(", ")}</span>
          <span>
            {props.hours} hrs/wk, {props.weeks} wk/yr
          </span>
          {props.continue && <span>Continue</span>}
        </div>
        <div className="flex flex-col w-full">
          <span className="text-lg font-bold">{props.position}</span>
          <hr className="border-gray-300" />
          <div>
            <span
              contentEditable="true"
              ref={desc}
              className="text-md leading-none"
            >
              {props.description}
            </span>
            <span className="text-xs text-gray-500">
              &nbsp;&nbsp;
              {nitpick &&
                `(${desc.current && desc.current.innerHTML.length}/150)`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
