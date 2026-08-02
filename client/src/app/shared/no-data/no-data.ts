import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: false,
  templateUrl: './no-data.html',
  styleUrl: './no-data.scss',
})
export class NoData {

  @Input() title = 'No Data Found';
  @Input() message = 'There is nothing to display at the moment.';
  @Input() image = 'images/nodata.png';
}
