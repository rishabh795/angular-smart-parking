import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from '../../models/models';
import { UserService } from './service/user-service';
import { UserComponent } from './user-component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let user: User;
  let userTwo: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    user={id:1, name: '1', email:'1'};
    userTwo={id:2, name: '2', email:'2'};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the create heading title - create function area', ()=>{
    const htmlPage = fixture.nativeElement as HTMLElement;
    const heading = htmlPage.querySelector('h2');
    expect(heading?.textContent).toContain('Create User');
  });

  it('should check the button click - create', ()=>{
    const spy = spyOn(component, 'createUser');
    const htmlPage = fixture.nativeElement as HTMLElement;
    const buttons = htmlPage.querySelectorAll('button');
    const buttonCreate = Array.from(buttons).find(btn=>btn.textContent?.includes('Create'));
    buttonCreate?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render userlist properly for get all - get all area', ()=>{
    
    const mockUsers: User[] = [user, userTwo];
    component.userList = mockUsers;
    fixture.detectChanges();
    const htmlPage = fixture.nativeElement as HTMLElement;
    const tbList = htmlPage.querySelectorAll('tbody');
    expect(tbList.length).toBe(mockUsers.length);

  });

  //Data Binding check
  it('should populate the update variable - populate Update Form', ()=>{
    component.populateUpdateForm(user);

    expect(component.userUpdate).toEqual(user);
  });

  //Simulating a service call and checking confirmation message
  it('should set messageGet on successful getById - get by id', () => {
    const userService = TestBed.inject(UserService);
    //Alternate way to TestBed.inject^
    //spyOn(component['userService'], 'getUserById').and.returnValue(of(mockUser));
    spyOn(userService, 'getUserById').and.returnValue(of(user));
  
    component.userGetId = 1;
    component.getUserById();
  
    expect(component.messageGet).toBe('User Retrieval Successful');
  });

  it('should display userGet.id in the table when user is fetched', () => {
    component.userGet = { id: 123, name: 'Shown', email: 'shown@example.com' };
    component.isUserGotten = true;
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const td = compiled.querySelector('tbody td');
    expect(td?.textContent).toContain('123');
  });

  it('should call updateUserById() when Update button is clicked - update by id', () => {
    component.userUpdate = user;
    fixture.detectChanges();
  
    const spy = spyOn(component, 'updateUserById');
  
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const updateBtn = Array.from(buttons).find(btn => btn.textContent?.includes('Update'));
    
    updateBtn?.click();
    expect(spy).toHaveBeenCalled();
  });

});
