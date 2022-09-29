export { Components, JSX } from './components';

import { ControlType } from './enums/controlType';

function configMultiDropdown() {
  var multidropdownField: any = document.querySelector('cotecna-multidropdown');

  multidropdownField.field = {
    id: '1',
    type: ControlType.MultiDropdown,
    label: 'Packaging',
    order: 1,
    propertyName: 'packaging',
    value: [],
    readableValue: [],
    required: true,
    visible: true,
    valid: false,
    readOnly: false
  }

  multidropdownField.control = {
    id: '1',
    options: [
      {
        id: 'a56a91b5-7ee6-4599-a971-036b44270fb7',
        name: 'Other (details)'
      },
      {
        id: 'd23c557d-00ce-4960-a721-0a89caabcd1d',
        name: 'Sack'
      },
      {
        id: 'aa6becb8-ca07-4f27-85d2-5cd708c153d7',
        name: 'Metal'
      },
      {
        id: 'cb36983e-4149-48d0-bbd7-5cd857964afa',
        name: 'Crate'
      },
      {
        id: 'ab69177b-395b-45cb-86c0-693f8925df24',
        name: 'Bundle'
      },
      {
        id: '9f7bde25-3354-421e-82d4-774b06532b28',
        name: 'Wood'
      },
      {
        id: '6ad3028a-b5c9-41ae-afcb-a29ff3c2cb9b',
        name: 'Cardboard'
      },
      {
        id: 'b1487931-f872-40cd-a3af-a3b7e8490554',
        name: 'Drum'
      },
      {
        id: '03723b7f-0009-49ab-9e50-cd387298a359',
        name: 'Box'
      },
      {
        id: '342974bd-a2d2-4023-b82f-dae7761629b7',
        name: 'Plastic'
      },
      {
        id: '123c3d15-9567-4d91-83c4-dc63270b57b2',
        name: 'Kraft Paper'
      },
      {
        id: '5f6716d6-d69b-4f15-88e5-e432da1e57cb',
        name: 'Cylindrical'
      }
    ]
  }
}

function configEmailBox() {
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

configMultiDropdown();
configEmailBox();

document.addEventListener('change', (event: any) => {
  console.log('event', event.detail);
}, false);
