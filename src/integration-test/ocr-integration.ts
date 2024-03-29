import { ControlType } from "../enums/controlType";
import { Field } from '../models/field';

export function configOcr() {
  var ocrField: any = document.querySelector('cotecna-ocr');

  ocrField.field = {
    id: 'ocr-field',
    type: ControlType.OCR,
    label: 'Container number',
    order: 2,
    propertyName: 'ocr-field',
    value: null,
    readableValue: null,
    required: false,
    visible: true,
    valid: true,
    readOnly: false
  } as Field;

  ocrField.control = {
    id: 'ocr-field'
  }
}