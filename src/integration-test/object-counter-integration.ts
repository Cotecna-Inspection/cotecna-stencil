import { ControlType } from "../enums/controlType";
import { Field } from "../models/field";

export function configObjectCounter() {
  var objectCounterField: any = document.querySelector('cotecna-object-counter');

  document.addEventListener('change', (event: any) => {
    console.log('event', event.detail);
  }, false);

  objectCounterField.field = {
    id: '3',
    type: ControlType.ObjectCounter,
    label: 'Object Counter Test',
    order: 1,
    propertyName: 'counter',
    value: null,
    readableValue: null,
    required: true,
    visible: true,
    valid: false,
    readOnly: false
  } as Field;

  objectCounterField.control = {
    datasourceUrl: "https://cotecna-ai-uat.azurewebsites.net/object/detection"
  }
}