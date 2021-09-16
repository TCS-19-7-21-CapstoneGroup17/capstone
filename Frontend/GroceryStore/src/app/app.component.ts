import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GroceryStore';

  isHomePage: boolean = true;

  isClicked() {
    this.isHomePage = false;
  }
}
