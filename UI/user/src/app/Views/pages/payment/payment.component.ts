import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
  payments = [];
  ngOnInit(): void {
    this.payments = [
      {
        serviceName: 'hello1',
        items: 1,
        amount: 200,
      },
      {
        serviceName: 'hello2',
        items: 2,
        amount: 200,
      },
      {
        serviceName: 'hello3',
        items: 3,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 1,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 2,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 3,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 1,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 2,
        amount: 200,
      },
      {
        serviceName: 'Official Printing',
        items: 3,
        amount: 200,
      },
    ];
  }
  redirectToCart() {
    this.router.navigate(['dashboard/services']);
  }
}
