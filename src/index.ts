export { Components, JSX } from './components';
import { EMAIL_BOX_FIELD, EMAIL_BOX_FIELD_CONTROL } from './test-data/email-box-field.mocked';
import { MULTIDROPDOWN_FIELD, MULTIDROPDOWN_FIELD_CONTROL } from './test-data/multidropdown-field.mocked';

function configMultiDropdown() {
  var multidropdownField: any = document.querySelector('cotecna-multidropdown');
  multidropdownField.field = MULTIDROPDOWN_FIELD;
  multidropdownField.control = MULTIDROPDOWN_FIELD_CONTROL;
}

function configEmailBox() {
  var emailBoxField: any = document.querySelector('cotecna-email-box');
  emailBoxField.field = EMAIL_BOX_FIELD;
  emailBoxField.control = EMAIL_BOX_FIELD_CONTROL;

  setTimeout(() => {
    emailBoxField.control = Object.assign({}, EMAIL_BOX_FIELD_CONTROL, { defaultEmails: ['marti.soriano@cotecna.es', 'testuser@cotecna.es']});
  }, 3000);
}

function setEvents() {
  const emailBoxCheckbox = document.getElementById('email-box-checkbox');
  const emailBoxField: any = document.querySelector('cotecna-email-box');
  emailBoxCheckbox?.addEventListener('change', (event: any) => {  
    const readonlyStatus = event.currentTarget.checked;
    emailBoxField.field = Object.assign({}, EMAIL_BOX_FIELD, { readOnly: readonlyStatus });
  }, false);
}

setEvents();
configMultiDropdown();
configEmailBox();

document.addEventListener('fieldChange', (event: any) => {
  console.log('fieldChange event', event.detail);
}, false);


