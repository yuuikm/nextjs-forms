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
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const type: ElementsType = "SelectField";

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Select Field",
      helperText: "Helper Text",
      required: false,
      option: [""],
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
    icon: "/Selectfield.svg",
    label: "SelectField",
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
    option: string[];
    placeholder: string;
  };
};

type FormDataType = {
  label: string;
  placeholder: string;
  helperText: string;
  option: string[];
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
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={element.extraAttributes.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {element.extraAttributes.option.map((option, idx) => (
            <SelectItem key={idx} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

  const { label, required, placeholder, helperText, option } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(val) => {
          setValue(val);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, val);
          setError(!valid);
          submitValue(element.id, val);
        }}
      >
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {option.map((opt, idx) => (
            <SelectItem key={idx} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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

  const [options, setOptions] = useState<string[]>([
    ...element.extraAttributes.option,
  ]);

  const [formData, setFormData] = useState<FormDataType>({
    label: element.extraAttributes.label,
    placeholder: element.extraAttributes.placeholder,
    helperText: element.extraAttributes.helperText,
    option: element.extraAttributes.option,
    required: element.extraAttributes.required,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const applyChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...formData, option: options },
    });
    toast.success("Form Values Updated. Save it now!");
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
      <Separator />
      <div className="flex flex-col gap-4">
        <Label>Options</Label>
        {options.map((option, idx) => (
          <Input
            key={idx}
            value={option}
            onChange={(e) => handleOptionInputChange(e, idx)}
          />
        ))}
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            setOptions([...options, "New Option"]);
          }}
        >
          <AiOutlinePlus /> Add Option
        </Button>
      </div>
      <div>
        <Switch
          checked={formData.required}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, required: checked }))
          }
        />
        <Label>Required</Label>
      </div>
      <Button type="submit" className="bg-indigo-400 hover:bg-indigo-500">
        Update
      </Button>
    </form>
  );
}
