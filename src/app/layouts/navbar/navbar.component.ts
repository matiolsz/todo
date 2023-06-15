import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  

  isWindowSmallerThan992px: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.isWindowSmallerThan992px = window.innerWidth < 992;
  }


}
