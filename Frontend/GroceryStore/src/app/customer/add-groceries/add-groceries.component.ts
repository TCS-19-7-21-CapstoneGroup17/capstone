import { Component, OnInit } from '@angular/core';
import { EditCartService } from '../edit-cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-groceries',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css', '../customer.component.css']
})
export class AddGroceriesComponent implements OnInit {

  constructor(public editCartSer: EditCartService) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this.editCartSer.getAllProducts().subscribe(result => {
      this.editCartSer.displayProducts(result);
    });
  }
}
