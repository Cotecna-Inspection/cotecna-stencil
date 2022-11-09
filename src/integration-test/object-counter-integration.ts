import { ControlType } from "../enums/controlType";

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
    value: [],
    readableValue: [],
    required: true,
    visible: true,
    valid: false,
    readOnly: false
  }

  objectCounterField.control = {
    counterUrl: "https://cotecna-ai-uat.azurewebsites.net/object/detection"
  }
}