import { getAssetPath } from "@stencil/core";
import { ControlType } from "../enums/controlType";
import { Field } from "../models/field";

export function isValid(field: Field) {
  switch(field.type) {
    case ControlType.MultiDropdown:
      if (field.required) return field?.value?.length > 0;
      else return true;
    default:
      throw 'Field type not supported';
  }
}

export function getIconPath(iconName: string): string {
  return getAssetPath(`../assets/${iconName}.png`);
}
