import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-field',
  standalone: false,
  templateUrl: './add-field.html',
  styleUrl: './add-field.scss',
})
export class AddField  implements OnInit, OnDestroy {

  ngOnInit() {
    console.log('AddField created');
  }

  ngOnDestroy() {
    console.log('AddField destroyed');
  }

  @Input() fieldName = '';

  @Output() fieldNameChange = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.fieldNameChange.emit(value);
  }
}
