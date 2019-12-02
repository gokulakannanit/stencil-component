import { newE2EPage } from '@stencil/core/testing';

describe('Money component', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/'});

    const element = await page.find('money-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders an ion-app', async () => {
    const page = await newE2EPage({ url: '/'});

    const element = await page.find('money-component > ion-app');
    expect(element).toHaveClass('hydrated');
  });
});
