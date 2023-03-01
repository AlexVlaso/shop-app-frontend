import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from 'src/app/model/country';
import { State } from 'src/app/model/state';
import { CountryService } from 'src/app/services/country.service';
import { ShopValidator } from 'src/app/validators/shopValidator';

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
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidator.notOnlyWhiteSpace,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidator.notOnlyWhiteSpace,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      shippingAddress: this.formBuilder.group({
        country: ['', Validators.required],
        region: ['', Validators.required],
        city: ['', [Validators.required, ShopValidator.notOnlyWhiteSpace]],
        address: ['', [Validators.required, ShopValidator.notOnlyWhiteSpace]],
        zipCode: ['', [Validators.required, ShopValidator.notOnlyWhiteSpace]],
      }),
      creditCard: this.formBuilder.group({
        card: [''],
      }),
    });
    this.countryService.getListOfCountries().subscribe((data) => {
      this.countries = data._embedded.countries;
    });
  }
  get firstName() {
    return this.checkoutFormsGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormsGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormsGroup.get('customer.email');
  }
  get country() {
    return this.checkoutFormsGroup.get('shippingAddress.country');
  }
  get region() {
    return this.checkoutFormsGroup.get('shippingAddress.region');
  }
  get city() {
    return this.checkoutFormsGroup.get('shippingAddress.city');
  }
  get address() {
    return this.checkoutFormsGroup.get('shippingAddress.address');
  }
  get zipCode() {
    return this.checkoutFormsGroup.get('shippingAddress.zipCode');
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
    console.log(this.firstName?.errors);
    console.log(this.checkoutFormsGroup.get('customer')?.value);
    console.log(this.checkoutFormsGroup.get('shippingAddress')?.value);
  }
}
