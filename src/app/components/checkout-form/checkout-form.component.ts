import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from 'src/app/model/country';
import { State } from 'src/app/model/state';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent implements OnInit {
  checkoutFormsGroup!: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService
  ) {}
  ngOnInit(): void {
    this.checkoutFormsGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        region: [''],
        city: [''],
        address: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        card: [''],
      }),
    });
    this.countryService.getListOfCountries().subscribe((data) => {
      this.countries = data._embedded.countries;
    });
  }
  handleListOfStates() {
    const formGroup = this.checkoutFormsGroup.get('shippingAddress');
    const countryCode = formGroup?.value.country.code;
    this.countryService.getListOfStates(countryCode).subscribe((data) => {
      this.states = data._embedded.states;
      formGroup?.get('region')?.setValue(this.states[0]);
    });
  }
  onSubmit() {
    console.log(this.checkoutFormsGroup.get('customer')?.value);
    console.log(this.checkoutFormsGroup.get('shippingAddress')?.value);
  }
}
