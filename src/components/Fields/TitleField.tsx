import React, { useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import { toast } from "react-toastify";

const type: ElementsType = "TitleField";

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: "Title Field",
    },
  }),
  validate: () => true,
  designerBtnElement: {
    icon: "/Titlefield.svg",
    label: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    title: string;
  };
};

type FormDataType = {
  title: string;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  return (
    <div className="flex text-slate-800 flex-col gap-2 w-full">
      <Label>Title Field</Label>
      <h1 className="text-3xl font-semibold font-Inter">
        {element.extraAttributes.title}
      </h1>
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
      <h1 className="text-3xl font-semibold font-Inter">
        {element.extraAttributes.title}
      </h1>
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
    title: element.extraAttributes.title,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateElement(element.id, { ...element, extraAttributes: formData });
    toast.success("Form values updated. Save them now!");
  };

  return (
    <form onSubmit={applyChanges} className="flex flex-col gap-3">
      <div>
        <Label>Label</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
        <p className="text-[0.8rem] my-2 text-muted-foreground">
          The title of the field. <br /> It will be displayed above the field.
        </p>
      </div>

      <Button type="submit" className="bg-indigo-400 hover:bg-indigo-500">
        Update
      </Button>
    </form>
  );
}
