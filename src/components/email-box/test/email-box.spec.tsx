import { newSpecPage } from '@stencil/core/testing';
import { EmailBox } from '../email-box';

describe('email-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EmailBox],
      html: `<email-box></email-box>`,
    });
    expect(page.root).toEqualHtml(`
      <email-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </email-box>
    `);
  });
});
