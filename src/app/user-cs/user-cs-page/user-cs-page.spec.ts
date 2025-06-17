import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { UserCsPage } from './user-cs-page';

describe('UserCsPage', () => {
  let component: UserCsPage;
  let fixture: ComponentFixture<UserCsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCsPage, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
