import React, { useEffect, useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      required: false,
      placeholder: "Value goes here",
    },
  }),
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.trim().length > 0;
    }
    return true;
  },
  designerBtnElement: {
    icon: "/Textfield.svg",
    label: "TextField",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeholder: string;
  };
};

type FormDataType = {
  label: string;
  placeholder: string;
  helperText: string;
  required: boolean;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="flex text-slate-800 flex-col gap-2 w-full">
      <Label>
        {element.extraAttributes.label}
        {element.extraAttributes.required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={element.extraAttributes.placeholder}
      />
      {element.extraAttributes.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {element.extraAttributes.helperText}
        </p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(!!isInvalid);
  }, [isInvalid]);

  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (valid) submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
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
    label: element.extraAttributes.label,
    placeholder: element.extraAttributes.placeholder,
    helperText: element.extraAttributes.helperText,
    required: element.extraAttributes.required,
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
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Field Label"
        />
      </div>
      <div>
        <Label>Placeholder</Label>
        <Input
          name="placeholder"
          value={formData.placeholder}
          onChange={handleChange}
          placeholder="Field Placeholder"
        />
      </div>
      <div>
        <Label>Helper Text</Label>
        <Input
          name="helperText"
          value={formData.helperText}
          onChange={handleChange}
          placeholder="Helper Text"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label>Mark Required</Label>
        <Switch
          checked={formData.required}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, required: checked }))
          }
        />
      </div>
      <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600">
        Update
      </Button>
    </form>
  );
}
