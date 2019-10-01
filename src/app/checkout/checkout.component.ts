import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit {
  cart: any = [];
  totalPrice = 0;
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.cart = new Array(...this.generalService.cart).map(bookString => JSON.parse(bookString));
    console.log(this.cart);
    let total =0;
    this.cart.forEach(book => {
      total += book.price;
    });
    this.totalPrice = total;
  }
  removeFromCart(book) {
    this.generalService.cart.delete(JSON.stringify(book).trim());
    this.generalService.setCart();
    this.init();
  }

}
