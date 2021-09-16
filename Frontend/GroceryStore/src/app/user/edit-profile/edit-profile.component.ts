import { Component, OnInit } from '@angular/core';
import { EditCartService } from 'src/app/customer/edit-cart.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  _id?:number;
  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";
  dob:string = "";
  phone:string = "";
  address:string = "";

  errorMessage:string = "";
  successMessage:string = "";
  
  constructor(public userService:UserService, public cartService:EditCartService) { }

  ngOnInit(): void {
    this._id = this.cartService.getUserID();
    //get and load user details into fields
    this.userService.get_userData({_id:this._id}).subscribe(res=> {
      console.log(res);
      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.email = res.emailId;
      this.password = res.password;
      this.dob = res.dob;
      this.phone = res.phone;
      this.address = res.address;
    })
  }

  updateProfile() {
    let update = {
      _id:this._id,
      firstname:this.firstname,
      lastname:this.lastname,
      emailId:this.email,
      password:this.password,
      dob:this.dob,
      phone:this.phone,
      address:this.address
    }
    this.userService.updateProfile(update).subscribe(result=> {
      console.log(result);
      if (result.modifiedCount == 1) { //update was successful
        this.successMessage = "Successfully updated account";
      }
      else {
        this.errorMessage = "Failed to update account";
      }
    });
  }
}
