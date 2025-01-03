import React, { useEffect, useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";

const type: ElementsType = "ParagraphField";

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      text: "Paragraph Text",
    },
  }),
  validate: () => true,
  designerBtnElement: {
    icon: "/Paragraphfield.svg",
    label: "Paragraph Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    text: string;
  };
};

type FormDataType = {
  text: string;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  return (
    <div className="flex text-slate-800 flex-col gap-2 w-full">
      <Label>{"Paragraph Field"}</Label>
      <p className="truncate text-lg font-medium font-Inter">
        {element.extraAttributes.text}
      </p>
    </div>
  );
}

function FormComponent({
  elementInstance,
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  isInvalid?: boolean;
}) {
  const element = elementInstance as CustomInstance;
  const [, setError] = useState(false);

  useEffect(() => {
    setError(!!isInvalid);
  }, [isInvalid]);

  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <p>{text}</p>
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
    text: element.extraAttributes.text,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <Textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder={element.extraAttributes.text}
        />
        <p className="text-[0.8rem] my-2 text-muted-foreground">
          The label of the field. <br /> It will be displayed above the field.
        </p>
      </div>
      <Button type="submit" className="bg-indigo-400 hover:bg-indigo-500">
        Update
      </Button>
    </form>
  );
}
