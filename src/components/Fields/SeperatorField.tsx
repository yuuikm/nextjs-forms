import React from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeperatorField";

export const SeperatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      space: 20,
    },
  }),
  validate: () => true,
  designerBtnElement: {
    icon: "/Separator.svg",
    label: "Seperator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    space: number;
  };
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { extraAttributes } = elementInstance as CustomInstance;

  return (
    <div className="flex text-slate-800 flex-col justify-center items-center gap-2 w-full">
      <Label className="flex gap-4 text-2xl font-semibold">
        Seperator Field
        <Image
          alt="Separator Icon"
          width={30}
          height={30}
          src={"/Seprator.svg"}
        />
      </Label>
      <Separator />
      <p className="text-muted-foreground text-[0.8rem]">
        Space: {extraAttributes.space}px
      </p>
    </div>
  );
}

function FormComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Separator />
    </div>
  );
}

function PropertiesComponent() {
  return (
    <form className="flex flex-col gap-3">
      <Label>No Properties for this Element</Label>
    </form>
  );
}
