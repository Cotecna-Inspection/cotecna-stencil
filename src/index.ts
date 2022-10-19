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
  emailBoxField.style.cssText = 'margin-top:16px;';
  emailBoxField.field = EMAIL_BOX_FIELD;
  emailBoxField.control = EMAIL_BOX_FIELD_CONTROL;

  setTimeout(() => {
    emailBoxField.control = {
      ...EMAIL_BOX_FIELD_CONTROL, 
      defaultEmails: [
        'testuser-1@cotecna.es',
        'testuser-2@cotecna.es',
        'testuser-3@cotecna.es',
        'testuser-4@cotecna.es',
        'testuser-5@cotecna.es',
        'testuser-6@cotecna.es',
        'testuser-7@cotecna.es',
        'testuser-8@cotecna.es',
        'testuser-9@cotecna.es',
        'testuser-10@cotecna.es'
      ]
    };
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


