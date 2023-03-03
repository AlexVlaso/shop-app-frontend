import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';

import { Country } from 'src/app/model/country';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/orderItem';
import { Purchase } from 'src/app/model/purchase';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
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
  totalPrice = 0;
  totalQuantity = 0;
  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private checkoutService: CheckoutService,
    private router: Router,
    private cartService: CartService
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
    this.cartService.cartTotalPrice.subscribe(
      (data) => (this.totalPrice = data)
    );
    this.cartService.cartTotalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
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
    if (this.checkoutFormsGroup.invalid) {
      this.checkoutFormsGroup.markAllAsTouched();
      return;
    }
    //Set up order
    const order = new Order(this.totalPrice, this.totalQuantity);
    //Set up orderItem
    const cartItems = this.cartService.cart;
    const orderItems = cartItems.map(
      (tempCartItem) => new OrderItem(tempCartItem)
    );

    //Set up Customer
    const customer: Customer =
      this.checkoutFormsGroup.controls['customer'].value;
    //Set up Address
    const address = this.checkoutFormsGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(address.region));
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(address.country)
    );

    address.state = shippingState.name;
    address.country = shippingCountry.name;
    //Set up Purchase
    const purchase: Purchase = new Purchase(
      address,
      customer,
      order,
      orderItems
    );

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(
          `Your order is ready. Yor tracking number is ${response.orderTrackingNumber}`
        );
        this.resetCart();
      },
      error: (err) => {
        alert(`Some problems, please try again. Problem is ${err.message}`);
      },
    });
  }
  resetCart() {
    this.cartService.cartTotalPrice.next(0);
    this.cartService.cartTotalQuantity.next(0);
    this.cartService.cart = [];
    this.checkoutFormsGroup.reset();
    this.router.navigateByUrl('/products');
  }
}
