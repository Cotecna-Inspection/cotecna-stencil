import { newE2EPage } from '@stencil/core/testing';

describe('ocr-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ocr-box></ocr-box>');

    const element = await page.find('ocr-box');
    expect(element).toHaveClass('hydrated');
  });
});
