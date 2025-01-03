import React from "react";
import { FormCardData } from "@/data";
import Image from "next/image";

const FormCard = ({
  title,
  Icon,
  subHeading,
  value,
  visits,
  shadowColor,
}: FormCardData) => {
  let submissionRate;
  if (value === 0) submissionRate = 0;
  else submissionRate = Math.round((value / visits) * 100);
  return (
    <div
      style={{
        boxShadow: `0.25px 3px 4px ${shadowColor},-0.25px 3px 4px ${shadowColor} `,
      }}
      className="flex rounded-xl px-4 py-12 pt-6 flex-col w-full"
    >
      <div className="title w-full flex justify-between">
        <h1 className="tracking-tight text-xl font-medium text-muted-foreground">
          {title}
        </h1>
      </div>
      <h1 className="text-2xl leading-10 font-bold">
        {title === "Total visits"
          ? visits
          : title === "Submission Rate"
          ? submissionRate + "%"
          : title === "Bounce Rate"
          ? 100 - submissionRate + "%"
          : value}
      </h1>
      <h3 className="text-xs text-muted-foreground pt-1">{subHeading}</h3>
    </div>
  );
};

export default FormCard;
