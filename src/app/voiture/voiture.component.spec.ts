import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VoitureComponent } from './voiture.component';

describe('VoitureComponent', () => {
  let component: VoitureComponent;
  let fixture: ComponentFixture<VoitureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
