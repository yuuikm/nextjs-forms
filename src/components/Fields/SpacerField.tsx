import React, { useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import Image from "next/image";
import { toast } from "react-toastify";

const type: ElementsType = "SpacerField";

export const SpacerFieldFormElement: FormElement = {
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
    icon: "/Spacerfield.svg",
    label: "Spacer Field",
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

type FormDataType = {
  space: number;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  return (
    <div className="flex text-slate-800 flex-col justify-center items-center gap-2 w-full">
      <Label className="flex gap-4 text-2xl font-semibold">
        Spacer Field
        <Image
          alt="Spacer Field Icon"
          width={30}
          height={30}
          src="/Spacerfield.svg"
        />
      </Label>
      <p className="truncate text-lg font-medium font-Inter">
        {`${element.extraAttributes.space}px`}
      </p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        style={{ width: "100%", height: `${element.extraAttributes.space}px` }}
      />
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const [formData, setFormData] = useState<FormDataType>({
    space: element.extraAttributes.space,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, space: Number(value) }));
  };

  const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateElement(element.id, { ...element, extraAttributes: formData });
    toast.success("Form values updated. Save them now!");
  };

  return (
    <form onSubmit={applyChanges} className="flex flex-col gap-3">
      <div>
        <Label>Height (px): {formData.space}</Label>
        <br />
        <div className="slider">
          <input
            name="space"
            type="range"
            min="0"
            max="200"
            onChange={handleChange}
            value={formData.space}
          />
        </div>
      </div>
      <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">
        Update
      </Button>
    </form>
  );
}
