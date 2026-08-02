import { Component } from '@angular/core';
import { UserState } from '../../store/user/user.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  user!: UserState;

  constructor(private store: Store<AppState>) {

    this.store.select(state => state.user).subscribe(user => {
      this.user = user;
      console.log('user dashboard', user);
    });

  }
}
