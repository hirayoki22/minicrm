import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-optionbar',
  templateUrl: './optionbar.component.html',
  styleUrls: ['./optionbar.component.css']
})
export class OptionbarComponent implements OnInit {
  addContact: boolean = false;
  showForm: boolean = false
  isUpdating: boolean = false;

  constructor(private contactService: CustomersService) { }

  ngOnInit(): void {
    this.contactService.toBeUpdated.subscribe(contact => {
      if (contact.id !== null) {
        this.isUpdating = true;
        this.showForm = true;
      }
    });
  }

  onClick() {
    this.showForm = !this.showForm;
  }
}
