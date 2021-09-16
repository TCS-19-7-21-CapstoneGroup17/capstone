
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EditCartService } from '../edit-cart.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMsg: string = ""

  signinRef = new FormGroup({
    _id: new FormControl(),
    password: new FormControl()
  })

  constructor(public editCartSer: EditCartService, public router:Router) { }

  ngOnInit(): void {
  }

  doSignIn() {
    console.log(this.signinRef.value);
    this.editCartSer.checkSignIn(this.signinRef.value).subscribe(res => {
      console.log(res);
      if (res.result) {
        console.log("SignIn successful");
        localStorage.setItem("userID", JSON.stringify(this.signinRef.value._id));
        this.router.navigate(["user/add-groceries"]);
      }
      // if userID/password incorrect, display error message
      else {
        this.errorMsg = res.msg;
      }
    })
  }
}