import { ControlType } from "../enums/controlType";
import { EMAIL_BOX_FIELD } from "../test-data/email-box-field.mocked";

export function configEmailBox() {
  var emailBoxField: any = document.querySelector("cotecna-email-box");

  emailBoxField.field = {
    id: "2",
    type: ControlType.EmailBox,
    label: "Share by Email",
    order: 2,
    propertyName: "share-by-email",
    value: [],
    readableValue: [],
    required: false,
    visible: true,
    valid: false,
    readOnly: false,
  };

  emailBoxField.control = {
    defaultEmails: [
      "user1@mycompany.com",
      "user2@mycompany.com",
      "user3@mycompany.com",
    ],
  };
}

export function configEmailBoxEvents() {
  const emailBoxCheckbox = document.getElementById('email-box-checkbox');
  const emailBoxField: any = document.querySelector('cotecna-email-box');
  emailBoxCheckbox?.addEventListener('change', (event: any) => {  
    const readonlyStatus = event.currentTarget.checked;
    emailBoxField.field = Object.assign({}, EMAIL_BOX_FIELD, { readOnly: readonlyStatus });
  }, false);
}
