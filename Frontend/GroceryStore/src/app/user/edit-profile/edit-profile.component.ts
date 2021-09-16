import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/employee/user.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public user_service:UserService) { }

  _id:Number = -1;
  firstname:String = "";
  lastname:String = "";
  emailId:String = "";
  password:String = "";
  dob:String = "";
  phone:Number = -1;
  address:String = "";

  userIDref = new FormGroup({
    userId:new FormControl(),
  })

  editProfileRef = new FormGroup({
    firstnameRef:new FormControl(),
    lastnameRef:new FormControl(),
    emailIdRef:new FormControl(),
    passwordRef:new FormControl(),
    dobRef:new FormControl(),
    phoneRef:new FormControl(),
    addressRef:new FormControl()
  })

  showProfileFlag:boolean = false;

  ngOnInit(): void {
  }

  submitUserId() {
    let userId = this.userIDref.value;
    this.user_service.pullUserInfo(userId).
    subscribe(result => {
      let userInfo:User = result;
      console.log(result);
      this._id = userInfo._id
      this.firstname = userInfo.firstname
      this.lastname = userInfo.lastname
      this.emailId = userInfo.emailId
      this.password = userInfo.password
      this.dob = userInfo.dob
      this.phone = userInfo.phone
      this.address = userInfo.address
    },
    error => console.log(error));
  this.showProfileFlag = true;
  }

  editInformation() {
    let newInfo = this.editProfileRef.value;
    let userId = this.userIDref.value;
    let completeInfo = {...userId , ...newInfo};
    console.log(completeInfo);
    // let jsonVer = JSON.stringify(completeInfo);
    // console.log(jsonVer);
    this.user_service.updateUserInfo(completeInfo).
    subscribe(result => console.log(result),
    error => console.log(error));

    console.log("done");
  }
  
}
