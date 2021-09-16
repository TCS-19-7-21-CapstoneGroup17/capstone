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

  userFundsAcct = new FormGroup({
    bankAccountref: new FormControl(),
    fundsAmtRef: new FormControl()
  });

  showFundsPageFlag:boolean = false;
  amt:Number = -1;
  msg?:string

  ngOnInit(): void {
  }

  submitUserId() {
    let userId = this.userIDref.value;
    this.user_service.pullFundsInfo(userId).
    subscribe(result => {
      let userInfo:UserWithFunds = result;
      this.amt = userInfo.fundsAmt;
      console.log(result);
    },
    error => console.log(error));
  this.showFundsPageFlag = true;
  }

  fundsTransaction(){
    let userId = this.userIDref.value;
    let bankInfo = this.userFundsAcct.value;
    let bankInfoWithId = {...userId , ...bankInfo};
    this.user_service.updateFundsInfo(bankInfoWithId).
    subscribe(result=> {
      this.msg = result;
    },
    error=>console.log(error));
  }

}
