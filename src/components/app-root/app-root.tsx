import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  @State() submitted = false;

  @State() isFormValid = false;

  @State() formControls = {
    zipCode: {
      value: null,
      validate: value => {
        var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        return zipCodePattern.test(value);
      },
      isValid: false
    },
    licensePlate: {
      value: null,
      validate: value => {
        var licensePattern = /(([a-zA-Z]{3}[0-9]{3})|(\w{2}-\w{2}-\w{2})|([0-9]{2}-[a-zA-Z]{3}-[0-9]{1})|([0-9]{1}-[a-zA-Z]{3}-[0-9]{2})|([a-zA-Z]{1}-[0-9]{3}-[a-zA-Z]{2}))/;
        return licensePattern.test(value);
      },
      isValid: false
    },
    euro: {
      value: null,
      validate: value => {
        var euroPattern = /^(([^0]{1})([0-9])*|(0{1}))(\,\d{2}){0,1}?$/;
        return euroPattern.test(value);
      },
      isValid: false
    },    
  };

  updateFormValue(controlName, value, isvalid){
    this.formControls[controlName].value = value;
    this.formControls[controlName].isValid = isvalid;
    /*this.formControls = {
      ...this.formControls,
      ['euro']: {
        ...this.formControls['euro'],
        value: value,
        isValid: isvalid
      }
    };*/
    console.log(this.formControls);
  }
  
  changeFormValue(controlName, value) {
    this.formControls = {
          ...this.formControls,
          [controlName]: {
          ...this.formControls[controlName],
          value: value,
          isValid: this.formControls[controlName].validate(value)
        }
      };
  }

  doFormValidation() {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitted = true;
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Form</ion-title>
        </ion-toolbar>
      </ion-header>,      
      <ion-content class="ion-padding">
        <ion-card class="ion-padding">
        <form onSubmit={e => this.handleSubmit(e)} novalidate>
          <ion-list>
            <ion-item>
            <ion-input name="zipCode" placeholder="Zip Code"
              type="text"
              value={this.formControls.zipCode.value}
              onInput={(ev: any) =>
                this.changeFormValue("zipCode", ev.target.value)
              } 
            />
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.formControls.zipCode.isValid || 
                this.submitted === false}>Zip code is invalid</p>
            </ion-text>
            <ion-item>
            <ion-input name="licensePlate" placeholder="License Plate"
              type="text"
              value={this.formControls.licensePlate.value}
              onInput={(ev: any) =>
                this.changeFormValue("licensePlate", ev.target.value)
              } 
            />
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.formControls.licensePlate.isValid || 
                this.submitted === false}>License Plate is invalid</p>
            </ion-text>
            <money-component submitted={this.submitted} updateform = {this.updateFormValue.bind(this)} ></money-component>
          </ion-list>          
          <ion-button type="submit" expand="block">
            Submit Form
          </ion-button>
        </form>
        </ion-card>
      </ion-content>
    ];
  }
}
