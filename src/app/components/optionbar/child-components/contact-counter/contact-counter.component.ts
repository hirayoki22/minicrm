import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../../../../services/customers.service';

@Component({
  selector: 'app-contact-counter',
  templateUrl: './contact-counter.component.html',
  styleUrls: ['./contact-counter.component.css']
})
export class ContactCounterComponent implements OnInit {
  contactTotal: number;

  constructor(private contactService: CustomersService) { }

  ngOnInit() {
    this.contactService.currentTotal.subscribe(total => {
      this.contactTotal = total;
    });
  }

  
}
