import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  hideBar: boolean = false;
  lastScroll: number = 0;
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      let currentScroll = window.pageYOffset || 
        document.documentElement.scrollTop;
      
      if (currentScroll > this.lastScroll) {
        this.hideBar = true;
      } else {
        this.hideBar = false;
      }
      this.lastScroll = currentScroll < 0 ? 0 : currentScroll;
    });
  }
}
