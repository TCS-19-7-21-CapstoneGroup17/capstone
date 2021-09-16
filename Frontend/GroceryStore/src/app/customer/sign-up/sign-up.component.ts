import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EditCartService } from '../edit-cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMsg: string = "";

  signupRef = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    emailId: new FormControl(),
    password: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
  });

  constructor(public editCartSer: EditCartService, public router: Router) { }

  ngOnInit(): void {
    // if on signup page, userID == -1
    localStorage.setItem("userID", JSON.stringify(-1))
  }

  doSignup() {
    // based on result {result:bool, msg:string}, display messages? success/fail
    this.editCartSer.addUser(this.signupRef.value).subscribe(res => {
      if (res.result) {
        console.log("Successfully added User");
        console.log(res);
        localStorage.setItem("userID", JSON.stringify(res.uid));
        console.log(localStorage.getItem("userID"))
        this.router.navigate(["user/add-groceries"]);
      }
      else {
        console.log("Failed to add User");
        console.log(res.msg)
        this.errorMsg = res.msg;
      }
    });
    
  }

}
