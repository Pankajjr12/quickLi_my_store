import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-table',
  standalone: false,
  templateUrl: './display-table.html',
  styleUrl: './display-table.scss',
})
export class DisplayTable {

  @Input() data: any[] = [];

  @Input() columns: any[] = [];
}
