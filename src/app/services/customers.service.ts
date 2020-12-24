import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject} from 'rxjs';

import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  contacts: Contact[];
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

  private totalContact = new BehaviorSubject<number>(0);
  currentTotal = this.totalContact.asObservable();

  private updateSubject = new BehaviorSubject<Contact>(this.contact);
  toBeUpdated = this.updateSubject.asObservable();

  private contactView = new BehaviorSubject<string>('List');
  viewMode = this.contactView.asObservable();

  constructor() { 
    if (localStorage.getItem('Contacts') == null) {
      this.contacts = [];
    } else {
      this.contacts = JSON.parse(localStorage.getItem('Contacts'));
    }
    this.setDefaultContacts();
    this.getContactsTotal();
  }

  setDefaultContacts = async () => {
    let res = await fetch('./api/contacts.json');
    let contacts = await res.json();

    if(localStorage.getItem('Contacts') == null) {
      localStorage.setItem('Contacts', JSON.stringify(contacts));
    } 
  }

  changeContactView(mode: string) {
    this.contactView.next(mode);
  }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  getContactsTotal() {
    this.totalContact.next(this.contacts.length);
  }

  addContact(contact: Contact) {
    this.contacts.unshift(contact);
    
    setTimeout(() => {
      delete this.contacts[0].isNew;
      localStorage.setItem('Contacts', JSON.stringify(this.contacts));
    }, 2000);

    this.getContactsTotal();
  }

  editContact(contact: Contact) {
    this.updateSubject.next(contact);
  }

  updateContact(contact: Contact){
    const index = this.contacts.findIndex(c => c.id == contact.id);

    this.contacts.splice(index, 1);
    this.contacts.unshift(contact);
    localStorage.setItem('Contacts', JSON.stringify(this.contacts));
  }

  removeContact(contact: Contact) {
    if (confirm('Are you sure?')) {
      const index = this.contacts.findIndex(c => c.id == contact.id);

      this.contacts.splice(index, 1);
      localStorage.setItem('Contacts', JSON.stringify(this.contacts));

      this.getContactsTotal();
    }
  }

  sortContacts(option: string, ASC: boolean) {
    if (option == 'createdDate') {
      if (ASC) {
        this.contacts.sort((a, b) => {
          return new Date(b.createdDate).getTime() - 
            new Date(a.createdDate).getTime();
        });
      } else {
        this.contacts.sort((a, b) => {
          return new Date(a.createdDate).getTime() - 
            new Date(b.createdDate).getTime();
        });
      }
    }
    else if (option !== 'email') {
      if (ASC) {
        this.contacts.sort((a, b) => {
          return a[option].toUpperCase() > 
            b[option].toUpperCase() ? -1 : 1;
        });
      } else {
        this.contacts.sort((a, b) => {
          return a[option].toUpperCase() > 
            b[option].toUpperCase() ? 1 : -1;
        });
      }
    } else {
      if (ASC) {
        this.contacts.sort((a, b) => {
          return a.contact[option] > 
            b.contact[option] ? -1 : 1;
        });
      } else {
        this.contacts.sort((a, b) => {
          return a.contact[option] > 
            b.contact[option] ? 1 : -1;
        });
      }
    }
  }
}