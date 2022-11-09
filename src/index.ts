import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { configEmailBox, configEmailBoxEvents } from "./integration-test/emailbox-integration";
import { configMultiDropdown } from "./integration-test/multidropdown-integration";
import { configOcr } from './integration-test/ocr-integration';
import { configObjectCounter } from "./integration-test/object-counter-integration";

defineCustomElements(window);

//components configuration for testing purposes
configMultiDropdown();
configEmailBox();
configEmailBoxEvents();
configOcr();
configObjectCounter();

document.addEventListener('fieldChange', (event: any) => {
  console.log('fieldChange.event', event.detail);
});
