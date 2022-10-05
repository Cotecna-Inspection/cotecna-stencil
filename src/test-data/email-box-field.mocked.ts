import { ControlType } from "../enums/controlType";

export const EMAIL_BOX_FIELD = {
  id: "2",
  type: ControlType.EmailBox,
  label: "Share by Email",
  order: 2,
  propertyName: "share-by-email",
  value: ["testA@cotecna.es", "testB@cotecna.es"],
  readableValue: [],
  required: false,
  visible: true,
  valid: false,
  readOnly: false,
};

export const EMAIL_BOX_FIELD_CONTROL = {
  defaultEmails: [
    'marcel.pujol@cotecna.es',
    'carles.romo@cotecna.es',
    'eltjo.kraai@cotecna.es'
  ]
}
