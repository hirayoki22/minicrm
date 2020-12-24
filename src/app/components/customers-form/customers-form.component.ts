import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';

import { Contact } from '../../models/contact';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {
  contact: Contact = {
    id: null,
    firstname: null,
    lastname: null,
    initials: null,
    company: null,
    avatar: null,
    contact: {
      phone: null,
      email: null
    },
    createdDate: null
  }
  showHiddenFields: boolean = false;
  @Input() showForm: boolean = false;
  @Input() isUpdating: boolean = false;
  @Output() updateFinished = new EventEmitter<boolean>();


  constructor(private contactService: CustomersService) { }

  ngOnInit(): void {
    this.contactService.toBeUpdated.subscribe(contact => {
      if (contact.id !== null) {
        this.showHiddenFields = true;

        this.contact = {
          id: contact.id,
          firstname: contact.firstname,
          lastname: contact.lastname,
          initials: contact.initials,
          company: contact.company,
          avatar: contact.avatar,
          contact: {
            phone: contact.contact.phone,
            email: contact.contact.email
          },
          createdDate: contact.createdDate
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    this.contact.initials =
      this.contact.firstname[0].toUpperCase() +
      this.contact.lastname[0].toUpperCase();

    this.contact.contact.phone = 
      this.formatPhone(this.contact.contact.phone);

    if (!this.contact.avatar) {
      const colors = [
        '#ff3481', '#66d91a', '#ffbb0e', 
        '#7e5aff', '#2389ff', '#ff3737'
      ];

      this.contact['defaultAvatar'] = 
        colors[Math.floor(Math.random() * colors.length)];
    }

    if (!this.isUpdating) {
      this.contact.id = this.generateId();
      this.contact.createdDate = new Date();
      this.contact.isNew = true;
      this.contactService.addContact(this.contact);      
    } else {
      this.contact.lastModified = new Date();
      this.contactService.updateContact(this.contact);
      this.showForm = false;
      this.showHiddenFields = false;
      this.updateFinished.emit(true);
    }

    this.resetForm();
    form.reset()
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  formatPhone(phone: string): string {
    return phone.replace(
      /^\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/, 
      '($1) $2-$3'
    );
  }

  resetForm() {
    this.contact = {
      id: null,
      firstname: '',
      lastname: '',
      initials: null,
      company: '',
      avatar: null,
      contact: {
        phone: '',
        email: ''
      },
      createdDate: null
    }
  }
}
