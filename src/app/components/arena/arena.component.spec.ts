import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { MainComponent } from './arena.component';
import { NodeManagerService } from 'src/app/services/node-manager.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        { provide: NodeManagerService, useValue: {} },
        { provide: Store, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
