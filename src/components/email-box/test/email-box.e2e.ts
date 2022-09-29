import { newE2EPage } from '@stencil/core/testing';

describe('email-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<email-box></email-box>');

    const element = await page.find('email-box');
    expect(element).toHaveClass('hydrated');
  });
});
