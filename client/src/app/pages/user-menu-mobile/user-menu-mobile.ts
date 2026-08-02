import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-menu-mobile',
  standalone: false,
  templateUrl: './user-menu-mobile.html',
  styleUrl: './user-menu-mobile.scss',
})
export class UserMenuMobile {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
