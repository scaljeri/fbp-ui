import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RandomNumberGeneratorComponent } from './random-number-generator.component';

describe('RandomNumberGeneratorComponent', () => {
  let component: RandomNumberGeneratorComponent;
  let fixture: ComponentFixture<RandomNumberGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomNumberGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomNumberGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
