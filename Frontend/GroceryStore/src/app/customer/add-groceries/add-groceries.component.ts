import { Component, OnInit } from '@angular/core';
import { EditCartService } from '../edit-cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-groceries',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css', '../customer.component.css']
})
export class AddGroceriesComponent implements OnInit {
  // variables
  productsArray: Array<Product> = [];

  constructor(public editCartSer: EditCartService) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this.editCartSer.getAllProducts().subscribe(result => {
      this.productsArray = result;
      // use service class's function to display products 
      this.editCartSer.displayProducts(this.productsArray);
    });
    
  }


}
