import { getAssetPath } from "@stencil/core";
import { ControlType } from "../enums/controlType";
import { Field } from "../models/field";

export function isValid(field: Field) {
  switch(field.type) {
    case ControlType.MultiDropdown:
      if (field.required) return field?.value?.length > 0;
      else return true;
    case ControlType.EmailBox:
      if (field.required) return field?.value?.length > 0;
      else return true;
    default:
      throw 'Field type not supported';
  }
}

export function getIconPNGPath(iconName: string): string {
  return getAssetPath(`../assets/${iconName}.png`);
}

export function getIconSVGPath(iconName: string): string {
  return getAssetPath(`../assets/${iconName}.svg`);
}