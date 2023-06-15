import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTodoComponent } from './small-todo.component';

describe('SmallTodoComponent', () => {
  let component: SmallTodoComponent;
  let fixture: ComponentFixture<SmallTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
