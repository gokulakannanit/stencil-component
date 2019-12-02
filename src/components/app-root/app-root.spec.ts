import { AppRoot } from './app-root';
import { newSpecPage } from '@stencil/core/dist/testing';

describe('app-root', () => {

  const component = new AppRoot();

  it('builds', () => {
    expect(component).toBeTruthy();
  });

  it('should update the form control when data passed from money component', () => {
    component.updateFormValue('euro', '100,00', true)    
    expect(component.formControls.euro.value).toBe('100,00');
  });

  it('should update the form control data for zip code', () => {
    component.changeFormValue('zipCode', '12345')    
    expect(component.formControls.zipCode.value).toBe('12345');
    expect(component.formControls.zipCode.isValid).toBeTruthy();
  });

  it('should update the form control data for License plate', () => {
    component.changeFormValue('licensePlate', 'ABC123')    
    expect(component.formControls.licensePlate.value).toBe('ABC123');
    expect(component.formControls.licensePlate.isValid).toBeTruthy();
  });
  it('add component in page', async() => {
    const page = await newSpecPage({
      components: [AppRoot],
      html: `<div></div>`
    });

    let component = page.doc.createElement('app-root');
    page.root.appendChild(component);
    expect(page.doc.getElementsByTagName('app-root').length).toBe(1);
  });

  it('should submit form while clicking on submit', () => {
    component.handleSubmit({preventDefault: function(){}});
    expect(component.submitted).toBeTruthy();
  });

});
