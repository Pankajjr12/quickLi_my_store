import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  readonly isMobile = signal(window.innerWidth < 768);

  constructor() {
    this.checkScreen();

    window.addEventListener('resize', () => {
      this.checkScreen();
    });
  }

  private checkScreen() {
    this.isMobile.set(window.innerWidth < 768);
  }
}