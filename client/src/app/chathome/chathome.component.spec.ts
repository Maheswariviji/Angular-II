import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChathomeComponent } from './chathome.component';

describe('ChathomeComponent', () => {
  let component: ChathomeComponent;
  let fixture: ComponentFixture<ChathomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChathomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChathomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
