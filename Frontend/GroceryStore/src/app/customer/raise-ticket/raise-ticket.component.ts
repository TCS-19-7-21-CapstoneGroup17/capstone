import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditCartService } from '../edit-cart.service';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {

  ticketRef = new FormGroup({
    userID: new FormControl(),
    reason: new FormControl()
  })

  constructor(public editCartSer: EditCartService) { }

  ngOnInit(): void {
  }

  submitTicket() {
    let ticket = { "userID": this.ticketRef.value.userID, "reason": this.ticketRef.value.reason };
    this.editCartSer.sendTicket(ticket).subscribe((result) => {
      console.log(result);
    })
  }

}
