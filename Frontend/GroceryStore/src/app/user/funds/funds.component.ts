import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/employee/user.service';
import { User, UserWithFunds } from '../user';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  constructor(public user_service: UserService) { }

  userIDref = new FormGroup({
    userId:new FormControl(),
  })

  showFundsPageFlag:boolean = false;

  ngOnInit(): void {
  }

  submitUserId() {
    let userId = this.userIDref.value;
    this.user_service.pullFundsInfo(userId).
    subscribe(result => {
      let userInfo:UserWithFunds = result;
      console.log(result);
    },
    error => console.log(error));
  this.showFundsPageFlag = true;
  }

}
