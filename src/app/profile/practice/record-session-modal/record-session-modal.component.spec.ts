import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSessionModalComponent } from './record-session-modal.component';

describe('RecordSessionModalComponent', () => {
  let component: RecordSessionModalComponent;
  let fixture: ComponentFixture<RecordSessionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordSessionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
