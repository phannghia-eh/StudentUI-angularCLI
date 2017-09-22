import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsComponentComponent } from './list-students-component.component';

describe('ListStudentsComponentComponent', () => {
  let component: ListStudentsComponentComponent;
  let fixture: ComponentFixture<ListStudentsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
