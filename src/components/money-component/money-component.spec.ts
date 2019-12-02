import { MoneyComponent } from './money-component';
import { newSpecPage } from '@stencil/core/dist/testing';

describe('money-component', () => {
  const component = new MoneyComponent();

  const changedSpy = jest.fn();

  component.updateform = changedSpy

  it('builds', () => {
    expect(component).toBeTruthy();
  });

  it('updateMoney function for null value', () => {
    component.updateMoney('euro', null);
    component.updateMoney('cent', null);
    expect(component.money).toBe('0,00');
  });

  it('updateMoney function actual value for euro', () => {
    component.updateMoney('euro', 100);
    component.updateMoney('cent', null);
    expect(component.money).toBe('100,00');
  });

  it('updateMoney function actual value for euro and cent', () => {
    component.updateMoney('euro', 100);
    component.updateMoney('cent', 10);
    expect(component.money).toBe('100,10');
  });

  it('updateMoney function has to call parent function', () => {
    component.updateMoney('euro', 100);
    component.updateMoney('cent', 10);
    expect(changedSpy).toBeCalledWith('euro', '100,00', true);
  });

  it('add component in page', async() => {
    const page = await newSpecPage({
      components: [MoneyComponent],
      html: `<div></div>`
    });

    let component = page.doc.createElement('money-component');
    page.root.appendChild(component);
    expect(page.doc.getElementsByTagName('money-component').length).toBe(1);
  });

});
