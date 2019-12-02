import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'money-component',
  styleUrl: 'money-component.css'
})
export class MoneyComponent {

  @Prop({mutable: true}) money = null;

  @Prop({mutable: true}) submitted = false;

  @Prop() updateform;

  @State() isvalid = false

  @State() euro = null;

  @State() cent = null;

  updateMoney(controlName, value){
    this[controlName] = value;
    this.money = (this.euro ? this.euro : 0) + ',' + (this.cent ? this.cent : '00');
    var euroPattern = /^(([^0]{1})([0-9])*|(0{1}))(\,\d{2}){0,1}?$/;
    this.isvalid = euroPattern.test(value);
    if(this.isvalid){
      this.updateform('euro', this.money, this.isvalid);
    }
  }

  render() {
    return [
      <ion-item-group>
        <ion-item>
          <ion-label>Euro</ion-label>
          <ion-input name="euro" placeholder="0"
            type="text"
            value={this.euro}
            onInput={(ev: any) =>
              this.updateMoney("euro", ev.target.value)
            } 
          />
          <ion-input name="cent" placeholder="00"
            type="text"
            value={this.cent}
            onInput={(ev: any) =>
              this.updateMoney("cent", ev.target.value)
            } 
          /> 
        </ion-item>
      </ion-item-group>,
      <ion-text color="danger">
        <p hidden={this.isvalid || 
          this.submitted === false}>Euro is invalid</p>
      </ion-text>
    ];
  }
}
