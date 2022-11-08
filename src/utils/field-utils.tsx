import { getAssetPath, h } from "@stencil/core";
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
    case ControlType.ObjectCounter:
      if (field.required) return field?.value?.image?.length > 0 && field.value.counted != null;
      else return true;
    default:
      throw 'Field type not supported';
  }
}

export function getSymbol(field: Field): any {
  return field.required ? <span class="mandatory-symbol">*</span> : null;
}

export function getIconPNGPath(iconName: string): string {
  return getAssetPath(`../assets/${iconName}.png`);
}

export function getIconSVGPath(iconName: string): string {
  return getAssetPath(`../assets/${iconName}.svg`);
}