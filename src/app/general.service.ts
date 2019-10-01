import { Injectable } from '@angular/core';
import {Book} from './schema/book';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  cart: Set<Book>= new Set<Book>();

  constructor(private http: HttpClient) {
    let cart = sessionStorage.getItem("cart");
    if(cart) {
      this.cart = new Set<Book>(JSON.parse(cart).books);
    }
  }
  setCart() {
    let cart = this.cart;
    let books = new Array(...cart);
    let cartObj = {
      books: []
    }
    for(let i=0;i< books.length; i++) {
      let book = books[i];
      cartObj.books.push(book);
    }
    sessionStorage.setItem("cart", JSON.stringify(cartObj))
  }
  getData(): Observable<any> {
    //return this.http.get(environment.bookApi);
    return this.http.get('/assets/books.json');
  }
}
