import { Component, OnInit, ElementRef } from '@angular/core';
import { Book } from '../schema/book';
import { GeneralService } from '../general.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {

  isSticky = false;
  searchText: string = "";
  currentBookList: Book[] = [];
  cart = new Set<string>();
  bookList: Book[] = [
    {
      "bookID": 40139,
      "title": "Gone Bamboo",
      "authors": "Anthony Bourdain",
      "average_rating": 3.47,
      "isbn": 1841953679,
      "language_code": "eng",
      "ratings_count": 1021,
      "price": 2105
    },
    {
      "bookID": 40143,
      "title": "The Family That Couldn't Sleep: A Medical Mystery",
      "authors": "D.T. Max",
      "average_rating": 3.9,
      "isbn": "081297252X",
      "language_code": "eng",
      "ratings_count": 232,
      "price": 2106
    },
    {
      "bookID": 40145,
      "title": "Dear Genius: The Letters of Ursula Nordstrom",
      "authors": "Ursula Nordstrom-Leonard S. Marcus-Maurice Sendak",
      "average_rating": 4.39,
      "isbn": 64462358,
      "language_code": "eng",
      "ratings_count": 518,
      "price": 2107
    }
  ];
  sortKey = "";
  current = 1;
  total = 1;
  pageSize = 20;
  totalPages = 1
  constructor(private el: ElementRef, private generalSerive: GeneralService) { }

  ngOnInit() {
    this.generalSerive.getData().subscribe(res => {
      this.bookList = [...res];
      this.currentBookList = [...res];
      this.total = this.currentBookList.length;
      this.totalPages = parseInt("" + this.currentBookList.length / 10);
    }, err => {
      console.log(err);
    })
    this.currentBookList = [...this.bookList];
  }
  searchBooks() {
    let result = [];
    if (!this.searchText.trim()) {
      this.currentBookList = this.bookList;
      return;
    }
    for(let i=0; i<this.bookList.length;i++ ) {
      let book = this.bookList[i];
      let searchRE = new RegExp(this.searchText.trim());
      if (searchRE.test(("" + book.title).toLowerCase()) || searchRE.test(("" + book.authors).toLowerCase()) || searchRE.test(("" + book.isbn).toLowerCase())) {
        result.push(book);
      }
    }
    this.currentBookList = result;
  }
  sortBooks() {
    if (!this.sortKey) {
      // Do not sort
      return;
    }
    this.currentBookList = this.currentBookList.sort((a, b) => {
      if (this.sortKey == "average_rating" || this.sortKey == "ratings_count") {
        // Descending order
        return b[this.sortKey] - a[this.sortKey];
      }
      if (this.sortKey == "price") {
        // Ascending order (number)
        return a[this.sortKey] - b[this.sortKey];
      }
      // Ascending order (string)
      return ("" + a[this.sortKey]).localeCompare("" + b[this.sortKey]);
    })
  }
  addToCart(book: Book) {
    console.log(this.generalSerive.cart)
    this.generalSerive.cart.add(JSON.stringify(book));
    this.generalSerive.setCart();
  }
  removeFromCart(book: Book) {
    console.log(this.generalSerive.cart)
    this.generalSerive.cart.delete(JSON.stringify(book));
    this.generalSerive.setCart();
  }
  inCart(book) {
    return this.generalSerive.cart.has(JSON.stringify(book));
  }
  getCartSize() {
    console.log("cart size called");
    return this.generalSerive.cart.size;
  }
  // prevPage() {
  //   if (this.current == 1) {
  //     return;
  //   }
  //   this.current--;
  // }
  // nextPage() {
  //   if (this.current == this.totalPages) {
  //     return;
  //   }
  //   this.current++;
  // }

}
