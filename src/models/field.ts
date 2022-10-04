import { ControlType } from "../enums/controlType";

export interface Field {
  id: string;
  type: ControlType;
  label: string;
  order: number;
  propertyName: string;
  value: any;
  readableValue?: any;
  required: boolean;
  visible?: boolean;
  valid: boolean;
  readOnly: boolean;
  showActions?: boolean; //TODO: tbd
  duplicated?: boolean; //TODO: tbd
}