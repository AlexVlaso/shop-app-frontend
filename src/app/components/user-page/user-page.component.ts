import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderHistoryItem } from 'src/app/model/order-history-item';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  orderHistory: OrderHistoryItem[] = [];
  storage: Storage = sessionStorage;
  userEmail: string;
  userName: string;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    this.userEmail = this.storage.getItem('userEmail')!;
    this.userName = this.storage.getItem('userName')!;
  }
  ngOnInit(): void {
    this.spinner.show();
    this.userService.getListOfOrders(this.userEmail).subscribe((data) => {
      this.orderHistory = data._embedded.orders;
      this.spinner.hide();
    });
  }
}
