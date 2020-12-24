import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

import { Contact } from '../../models/contact';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [
    './customers.component.css',
    './small-list.component.css',
    './grid.component.css'
  ]
})
export class CustomersComponent implements OnInit {
  contacts: Contact[];
  loaded: boolean = false;
  editMenu = [
    { action: 'edit', text: 'Edit Contact', icon: '&#xe3c9;' },
    { action: 'remove', text: 'Remove', icon: '&#xe872;' },
    { action: 'duplicate', text: 'Duplicate', icon: '&#xe02e;' }
  ];
  viewMode: string;


  constructor(private contactService: CustomersService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.contactService.getContactsTotal(contacts.length);
      this.contacts = contacts;
      this.contactService.contacts = contacts;
      this.loaded = true;
    });

    this.contactService.viewMode.subscribe(mode => {
      this.viewMode = mode;
    });

    this.onOutsideClick();
  }

  showEditMenu(contact: Contact) {
    this.contacts.map(cur => {
      if (cur !== contact) cur.editMenu = false;
    });
    contact.editMenu = !contact.editMenu;
  }

  editMenuClick(action: string, contact: Contact) {
    delete contact.editMenu;

    switch (action) {
      case 'edit':
        this.contactService.editContact(contact);
        break;
      case 'remove':
        this.contactService.removeContact(contact);
        break;
      case 'duplicate':
        // Coming soon
        break;
      default:
        console.log('Invalid choice ', action);
        break;
    }
  }

  onOutsideClick() {
    window.addEventListener('click', e => {
      let target = <Element>e.target;
      
      if (!target.matches('.edit-btn')) {
        this.contacts.map(contact => {
          if (contact.editMenu) contact.editMenu = false;
        });
      }
    });
  }

  onViewModeChange() {
    return {
      'container-grid': this.viewMode == 'Grid',
      'container-small': this.viewMode == 'Small List'
    }
  }
    
}