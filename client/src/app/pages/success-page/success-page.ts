import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  standalone: false,
  templateUrl: './success-page.html',
  styleUrl: './success-page.scss',
})
export class SuccessPage implements OnInit {

  message = 'Payment';

  ngOnInit(): void {

    const navigation = history.state;

    if (navigation?.text) {
      this.message = navigation.text;
    }

    console.log(navigation);
  }

}
