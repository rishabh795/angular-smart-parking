import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../models/models';
import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;

  //extra

  let httpMock: HttpTestingController;
  const user: User = { id: 1, name: '1', email: '1' };
  const userTwo: User = { id: 2, name: '2', email: '2'};
  const baseUrl: string = `http://localhost:1000/user/user`;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);

    //extra

    httpMock = TestBed.inject(HttpTestingController);
  });

  //extra
  afterEach(()=> {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should run the create function via post - create', ()=>{
    service.createUser(user).subscribe(data=>{expect(data).toEqual(user)});

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST'); //ITS CASE SENSITIVE
    req.flush(user);
  });

  it('should run the update by id function - update by id', ()=>{
    service.updateUserById(user.id!, user).subscribe(data=>{expect(data).toEqual(user)});

    const req = httpMock.expectOne(baseUrl + `/${user.id!}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('should run return a list of objects - get all', ()=>{
    const userList = [user, userTwo];
    service.getAllUsers().subscribe(data=>{
      expect(data.length).toBe(userList.length);
      expect(data).toEqual(userList);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(userList);
  });

  it('should return an object based on the id - get by id', ()=>{
    service.getUserById(user.id!).subscribe(data=>expect(data).toEqual(user));

    const req = httpMock.expectOne(baseUrl + `/${user.id!}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should return a null in the case of a delete - delete by id', ()=>{
    service.deleteUserById(user.id!).subscribe(data=>expect(data).toBeNull());

    const req = httpMock.expectOne(baseUrl + `/${user.id!}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
