import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeStatComponent } from './volume-stat.component';

describe('VolumeStatComponent', () => {
  let component: VolumeStatComponent;
  let fixture: ComponentFixture<VolumeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
