import { ControlType } from "../enums/controlType";

export function configEmailBox() {
    var emailBoxField: any = document.querySelector('cotecna-email-box');
  
    emailBoxField.field = {
      id: '2',
      type: ControlType.EmailBox,
      label: 'Share by Email',
      order: 2,
      propertyName: 'share-by-email',
      value: [],
      readableValue: [],
      required: false,
      visible: true,
      valid: false,
      readOnly: false
    };
  
    emailBoxField.control = {
      defaultEmails: [
        'marcel.pujol@cotecna.es',
        'carles.romo@cotecna.es',
        'eltjo.kraai@cotecna.es'
      ]
    };
  }