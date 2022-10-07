import { newSpecPage } from '@stencil/core/testing';
import { OcrField } from '../ocr-field';

describe('ocr-field', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OcrField],
      html: `<cotecna-ocr></cotecna-ocr>`,
    });
    expect(page.root).toEqualHtml(`
      <cotecna-ocr>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cotecna-ocr>
    `);
  });
});
