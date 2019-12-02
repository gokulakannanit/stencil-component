import { newE2EPage } from '@stencil/core/testing';

describe('Money component', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/'});

    const element = await page.find('app-root >>> money-component >>> ion-item-group');
    expect(element).toHaveClass('hydrated');
  });

});
