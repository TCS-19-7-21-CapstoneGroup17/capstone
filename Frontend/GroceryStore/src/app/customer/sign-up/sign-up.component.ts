import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditCartService } from '../edit-cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupRef = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    emailId: new FormControl(),
    password: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
  });

  constructor(public editCartSer: EditCartService) { }

  ngOnInit(): void {
  }

  doSignup() {
    this.editCartSer.addUser(this.signupRef.value).subscribe(result => {
      console.log(result);
    });
    // this.signupRef.reset();
  }

}
