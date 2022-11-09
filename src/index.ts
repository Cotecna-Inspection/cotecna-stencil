import { configEmailBox } from "./integration-test/emailbox-integration";
import { configMultiDropdown } from "./integration-test/multidropdown-integration";
import { configObjectCounter } from "./integration-test/object-counter-integration";

configEmailBox();
configMultiDropdown();
configObjectCounter();

document.addEventListener('fieldChange', (event: any) => {
  console.log('fieldChange.event', event.detail.value);
});
