import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditCartService } from 'src/app/customer/edit-cart.service';
import { UserService } from 'src/app/employee/user.service';
import { User, UserWithFunds } from '../user';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  constructor(public user_service: UserService, public cart_service:EditCartService) { }

  // userIDref = new FormGroup({
  //   userId:new FormControl(),
  // })

  userFundsAcct = new FormGroup({
    bankAccountref: new FormControl(),
    fundsAmtRef: new FormControl()
  });

  showFundsPageFlag:boolean = false;
  amt:Number = -1;
  msg?:string
  _id?:number

  ngOnInit(): void {
    this._id = this.cart_service.getUserID();
    this.user_service.pullFundsInfo(this._id).
    subscribe(result => {
      let userInfo:UserWithFunds = result;
      this.amt = userInfo.fundsAmt;
      console.log(result);
    },
    error => console.log(error));
  }

  // submitUserId() {
  //   this._id = this.cart_service.getUserID();
  //   this.user_service.pullFundsInfo(this._id).
  //   subscribe(result => {
  //     let userInfo:UserWithFunds = result;
  //     this.amt = userInfo.fundsAmt;
  //     console.log(result);
  //   },
  //   error => console.log(error));
  // this.showFundsPageFlag = true;
  // }

  fundsTransaction(){
    this._id = this.cart_service.getUserID();
    let bankInfo = this.userFundsAcct.value;
    this.user_service.updateFundsInfo(this._id, bankInfo).
    subscribe(result=> {
      this.msg = result;
    },
    error=>console.log(error));
  }

}
