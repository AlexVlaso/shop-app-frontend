import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  checkoutFormsGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.checkoutFormsGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: ['Ukraine'],
        region: [''],
        city: [''],
        address: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        card: [''],
      }),
    });
  }
  onSubmit() {
    console.log(this.checkoutFormsGroup.get('customer')?.value);
    console.log(this.checkoutFormsGroup.get('shippingAddress')?.value);
  }
}
