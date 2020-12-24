import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { CustomersService } from '../../../../services/customers.service';

@Component({
  selector: 'app-sortmenu',
  templateUrl: './sortmenu.component.html',
  styleUrls: ['./sortmenu.component.css']
})
export class SortmenuComponent implements OnInit {
  showSortMenu: boolean = false;
  sortOption: string;

  sortOptions: any = [
    { type: 'createdDate', name: 'Creation Date', selected: false, asc: true },
    { type: 'firstname', name: 'First Name', selected: false, asc: true },
    { type: 'lastname', name: 'Last Name', selected: false, asc: true },
    { type: 'email', name: 'Email Address', selected: false, asc: true },  
    { type: 'company', name: 'Company', selected: false, asc: true },  
  ];
 

  constructor(private contactService: CustomersService) { }

  ngOnInit(): void {
    this.onOutsideClick();
  }

  onClick(option: any) {
    this.sortOptions.map(option => option.selected = false);
    option.selected = true;
    
    this.sortOption = option.name;
    this.contactService.sortContacts(option.type, option.asc);
    
    option.asc = !option.asc;
    this.sortOptions.map(cur => {
      if (cur !== option) cur.asc = true;
      return cur;
    });    
  }

  onOutsideClick() {
    window.addEventListener('click', e => {
      let target = <Element>e.target;

      if (!target.matches('.sort-btn')) {
        this.showSortMenu = false;
      }
    });
  }
}
