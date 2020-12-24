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

    this.getContactsTotal();
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


if(localStorage.getItem('Contacts') == null) {
  localStorage.setItem('Contacts', '[{"id":"c92efc57-ca09-43bd-ba1b-e7e33dca5822","firstname":"Marco","lastname":"DeFrange","initials":"MD","company":"Professional Singer","avatar":"https://robertreadphoto.com/wp-content/uploads/2019/09/x19-07-04_Trimaan-Gill_Shot_1_040-768x614.jpg.pagespeed.ic.9lLG9xCCet.jpg","contact":{"phone":"(454) 918-4000","email":"defrange.marco330@naturalvision.net"},"createdDate":"2020-02-24T01:34:05.746Z","lastModified":"2020-02-24T17:35:54.959Z"},{"id":"2","firstname":"Mark","lastname":"Ruffalo","initials":"MR","company":"Cascade Center BPO","avatar":"https://2d3z3x4e2xrx130kvm2hxdsp-wpengine.netdna-ssl.com/wp-content/uploads/2019/02/Tracy_Wright_Corvo_Photography_busienss_headshot-12.jpg","contact":{"phone":"(877) 294-2121"},"createdDate":"2019-08-01T14:25:05.000Z","lastModified":"2020-02-24T07:05:45.048Z"},{"id":"e2370291-3099-4a1d-b082-64b9f603e1f7","firstname":"Adison","lastname":"Pena","initials":"AP","company":"Maxpena Studio","avatar":"https://scontent.fsti4-1.fna.fbcdn.net/v/t1.0-9/37985267_2005256132827186_5589761182530535424_n.jpg?_nc_cat=109&_nc_sid=85a577&_nc_ohc=qqVdMBeAnZUAX8w0i6L&_nc_ht=scontent.fsti4-1.fna&oh=242d6e1e9f9afc69d5243b5f4e165434&oe=5EBEDAC3","contact":{"phone":"(829) 352-6198","email":"hirayoki.nova@gmail.com"},"createdDate":"2020-02-22T00:12:30.044Z","lastModified":"2020-02-24T02:28:21.265Z"},{"id":"6f116fac-18d2-4416-a820-6e6ef793c36b","firstname":"Raimer","lastname":"Lopez","initials":"RL","company":"Freelancer Designer","avatar":"https://scontent.fsti4-1.fna.fbcdn.net/v/t1.0-9/82157343_10218677754248282_46803040308559872_n.jpg?_nc_cat=109&_nc_sid=7aed08&_nc_ohc=kiKw84sa9_QAX_7Kbjp&_nc_ht=scontent.fsti4-1.fna&oh=3574d9dbb2ae558036482a734317f520&oe=5EFFDDB2","contact":{"phone":"(456) 788-4536","email":"raimerlro@gmail.com"},"createdDate":"2020-02-22T00:22:30.682Z","lastModified":"2020-02-24T02:28:14.194Z"},{"id":"66d4df87-0f82-4765-9e4e-fea1eda816fa","firstname":"Sophia","lastname":"Veldanova","initials":"SV","company":"Paris Magazine","avatar":"https://uhairstyleto.org/wp-content/uploads/2018/12/ad5136c3a0ef2e73b9ac9ae8402897ad.jpeg","contact":{"phone":"(365) 788-4566","email":"sophie.veldanova1605@parismagazine.com"},"createdDate":"2020-02-23T02:34:47.557Z"},{"id":"1","firstname":"Yumi","lastname":"Takeuchi","initials":"YT","company":"Yumi Productions","avatar":"https://kprofiles.com/wp-content/uploads/2019/12/EJ3W_BuUwAAeJD6-533x800.jpg","contact":{"phone":"(943) 455-9966","email":"yumiproductions@sora.com"},"createdDate":"2018-07-22T14:25:05.000Z"},{"id":"3","firstname":"Andrew","lastname":"Hesten","initials":"AH","company":"Envelop Solutions CO","contact":{"phone":"(202) 634-1573","email":"andrew.hesten0065@gmail.com"},"createdDate":"2016-05-13T22:03:55.000Z","defaultAvatar":"#ff3737","lastModified":"2020-02-24T00:13:35.309Z"}]');
} 