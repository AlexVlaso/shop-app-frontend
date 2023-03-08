import { Component, Inject, OnInit } from '@angular/core';
import { OrderHistoryItem } from 'src/app/model/order-history-item';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  orderHistory: OrderHistoryItem[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {}
}
