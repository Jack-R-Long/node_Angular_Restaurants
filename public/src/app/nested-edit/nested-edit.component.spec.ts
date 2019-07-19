import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedEditComponent } from './nested-edit.component';

describe('NestedEditComponent', () => {
  let component: NestedEditComponent;
  let fixture: ComponentFixture<NestedEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
