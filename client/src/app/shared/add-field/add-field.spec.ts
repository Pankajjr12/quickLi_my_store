import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddField } from './add-field';

describe('AddField', () => {
  let component: AddField;
  let fixture: ComponentFixture<AddField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
