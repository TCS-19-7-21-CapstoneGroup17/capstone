import { AdminService } from './../admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  addMsg:string = "";
  addError:string = "";
  updateMsg:string = "";
  updateError:string = "";
  deleteMsg:string = "";
  deleteError:string = "";
  empAddMsg:string = "";
  empAddError:string = "";
  empDelMsg:string = "";
  empDelError:string = "";

  addProductRef = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });
  updateProductRef = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  })
  deleteProductRef = new FormGroup({
    productName: new FormControl()
  })
  addEmpRef = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl()
  })
  delEmpRef = new FormGroup({
    _id: new FormControl()
  })
  generateReportRef = new FormGroup({
    timeFilter: new FormControl("", Validators.required),
    day: new FormControl(),
    month: new FormControl(),
    year: new FormControl(),
    orderFilter: new FormControl("", Validators.required),
    userID: new FormControl(),
    productName: new FormControl()
  })

  constructor(public adminSer: AdminService,
    public router: Router) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.addMsg = "";
    this.addError = "";
    let product = this.addProductRef.value;
    this.adminSer.addProduct(product).
      subscribe(result => {
        if (result == "Product stored successfully") {
          this.addMsg = result;
        } else {
          this.addError = result;
        }
      },
        error => console.log(error));
    this.addProductRef.reset();
  }
  updateProduct() {
    this.updateMsg="";
    this.updateError="";
    let product = this.updateProductRef.value;
    console.log(product);
    this.adminSer.updateProduct(product).
      subscribe(result => {
        console.log(result);
        if (result.result) {
          this.updateMsg = result.msg;
        } 
        else {
          this.updateError = result.msg;  
        }
      },
        error => console.log(error));
    this.updateProductRef.reset();
  }
  deleteProduct() {
    this.deleteMsg="";
    this.deleteError="";
    let product = this.deleteProductRef.value;
    this.adminSer.deleteProduct(product).
      subscribe(result => {
        if (result.result) {
          this.deleteMsg = result.msg;
        } else {
          this.deleteError = result.msg;
        }
      },
        error => console.log(error));
    this.deleteProductRef.reset();
  }
  addEmployee() {
    this.empAddMsg = "";
    this.empAddError = "";
    let employee = this.addEmpRef.value;
    //get loginInfo from session storage and add to request
    let admin = JSON.parse(sessionStorage.getItem("admin")!);
    let empAddRequest = {firstname:employee.firstname, lastname:employee.lastname, email:employee.email, adminUsername:admin.username, adminPassword:admin.password}
    console.log(empAddRequest);
    this.adminSer.addEmployee(empAddRequest).subscribe(result=> {
      if (result.result) {
        this.empAddMsg = result.msg;
      }
      else {
        this.empAddError = result.msg;
      }
    })
    this.addEmpRef.reset();
  }
  deleteEmployee() {
    this.empDelMsg = "";
    this.empDelError = "";
    let employee = this.delEmpRef.value;
    console.log(employee);
    //get loginInfo from session storage and add to request
    let admin = JSON.parse(sessionStorage.getItem("admin")!);
    let empDelRequest = {_id:employee._id, adminUsername:admin.username, adminPassword:admin.password};
    console.log(empDelRequest);
    this.adminSer.deleteEmployee(empDelRequest).subscribe(result=> {
      if (result.result) {
        this.empDelMsg = result.msg;
      }
      else {
        this.empDelError = result.msg;
      }
    }) 
  this.delEmpRef.reset();
  }

  days: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  // months: Array<string> =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: Array<number> = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  getTime: string = ""
  getFilter: string = ""
  errorMsg: string = "" //holds error message (if any)
  allRecords?: Array<any> //holds array of all records
  
  updateGetTime() {
    this.getTime = this.generateReportRef.value.timeFilter;
    console.log(this.getTime)
  }

  updateGetFilter() {
    this.getFilter = this.generateReportRef.value.orderFilter;
    console.log(this.getFilter)
  }
  generateReport() {

    let genReport = this.generateReportRef.value;
    console.log("do generate report");
    // console.log(genReport)

    if (genReport.timeFilter == 'Day') {
      let report;
      if (this.getFilter == "Product Name") {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "product", productName: genReport.productName }
      }
      else if (this.getFilter == "User ID") {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "user", userId: genReport.userID }
      }
      else {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "" }
      }
      console.log(report)
      this.adminSer.getDailyReport(report).subscribe(report => {
        if (report.result) {
          console.log(report.records)
          this.allRecords = report.records
        }
        else {
          this.errorMsg = report.msg
        }
      });
    }
    else if (genReport.timeFilter == "Week") {
      let report;
      if (this.getFilter == "Product Name") {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "product", productName: genReport.productName }
      }
      else if (this.getFilter == "User ID") {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "user", userId: genReport.userID }
      }
      else {
        report = { day: genReport.day, month: genReport.month - 1, year: genReport.year, filter: "" }
      }
      console.log(report)
      this.adminSer.getWeeklyReport(report).subscribe(report => {
        if (report.result) {
          console.log(report.records)
          this.allRecords = report.records
        }
        else {
          this.errorMsg = report.msg
        }
      });
    }
    else if (genReport.timeFilter == "Monthly") {
      let report;
      if (this.getFilter == "Product Name") {
        report = { month: genReport.month - 1, year: genReport.year, filter: "product", productName: genReport.productName }
      }
      else if (this.getFilter == "User ID") {
        report = { month: genReport.month - 1 , year: genReport.year, filter: "user", userId: genReport.userID }
      }
      else {
        report = { month: genReport.month - 1, year: genReport.year, filter: "" }
      }
      console.log(report)
      this.adminSer.getMonthlyReport(report).subscribe(report => {
        if (report.result) {
          console.log(report.records)
          this.allRecords = report.records
        }
        else {
          this.errorMsg = report.msg
        }
      });
      
    }
    else {
      let report;
      if (this.getFilter == "Product Name") {
        report = { year: genReport.year, filter: "product", productName: genReport.productName}
      }
      else if (this.getFilter == "User ID") {
        report = {year: genReport.year, filter:"user", userId: genReport.userID}
      }
      else {
        report = {year: genReport.year, filter: ""}
      }
      console.log(report)
      this.adminSer.getYearlyReport(report).subscribe(report => {
        if (report.result) {
          console.log(report.records)
          this.allRecords = report.records
        }
        else {
          this.errorMsg = report.msg
        }
      });
    }
  }
}
