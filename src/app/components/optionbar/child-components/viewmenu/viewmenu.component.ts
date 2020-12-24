import { Component, OnInit } from '@angular/core';

import { CustomersService } from '../../../../services/customers.service';

@Component({
  selector: 'app-viewmenu',
  templateUrl: './viewmenu.component.html',
  styleUrls: ['./viewmenu.component.css']
})
export class ViewmenuComponent implements OnInit {
  viewOptions: any = [
    { name: 'List', icon: '&#xe8ef;', selected: true },
    { name: 'Grid', icon: '&#xe8e9;', selected: false },
    { name: 'Small List', icon: '&#xe896;', selected: false },
  ];
  showViewMenu: boolean;
  viewOption: string = '&#xe8ef;';

  constructor(private contactService: CustomersService) { }

  ngOnInit(): void {
    this.onClickOutside();
  }

  changeView(option: any) {
    this.viewOptions.map(cur => {
      if (cur !== option) cur.selected = false;
    });

    option.selected = true;
    this.contactService.changeContactView(option.name);
    this.viewOption = option.icon;
  }

  onClickOutside() {
    window.addEventListener('click', e => {
      let target = <Element>e.target;

      if (!target.matches('.view-btn-ele')) {
        this.showViewMenu = false;
      }
    });
  }
}
