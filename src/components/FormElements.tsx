import { CheckboxFormElement } from "./Fields/Checkbox";
import { NumberFieldFormElement } from "./Fields/NumberField";
import { ParagraphFieldFormElement } from "./Fields/ParagraphField";
import { SelectFieldFormElement } from "./Fields/SelectField";
import { SeperatorFieldFormElement } from "./Fields/SeperatorField";
import { SpacerFieldFormElement } from "./Fields/SpacerField";
import { SubTitleFieldFormElement } from "./Fields/SubTitle";
import { TextAreaFormElement } from "./Fields/TextAreaField";
import { TextFieldFormElement } from "./Fields/TextField";
import { TitleFieldFormElement } from "./Fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "ParagraphField"
  | "SubTitleField"
  | "SpacerField"
  | "SeperatorField"
  | "NumberField"
  | "TextAreaField"
  | "Checkbox"
  | "SelectField";

export type ExtraAttributesType =
  | {
      label: string;
      helperText?: string;
      required?: boolean;
      placeholder?: string;
    }
  | {
      title: string;
    }
  | {
      space: number;
    }
  | Record<string, unknown>;

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: ExtraAttributesType;
};

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: string;
    label: string;
  };
  validate: (field: FormElementInstance, actualValue: string) => boolean;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  properties: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  SeperatorField: SeperatorFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  Checkbox: CheckboxFormElement,
  SelectField: SelectFieldFormElement,
};
