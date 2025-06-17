import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/models';
import { UserService } from './service/user-service';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css'
})
export class UserComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private userService: UserService) {}

  userCreate: User =
  {
    name: '',
    email: ''
  }
  messageCreate?: string;

  userUpdate: User =
  {
    id: 0,
    name: '',
    email: ''
  }
  messageUpdate?: string;

  userList?: User[];
  messageList?: string;

  userGet: User =
  {
    id: 0,
    name: '',
    email: ''
  }
  messageGet?: string;
  isUserGotten: boolean = true;
  userGetId: number = 0;

  messageDelete?: string;

  ngOnInit(): void {
    this.getAllUsers();
  }

  populateUpdateForm(user: User) : void
  {
    this.userUpdate={...user};
  }

  createUser(): void
  {
    this.userService.createUser(this.userCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="User Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`User Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updateUserById(): void
  {
    this.userService.updateUserById(this.userUpdate.id!, this.userUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.userUpdate=data;
        this.messageUpdate="User Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`User Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllUsers(): void
  {
    this.userService.getAllUsers().subscribe({
      next: (data)=>{
        console.log(data);
        this.userList=data;
        this.messageList="User List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`User List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteUserById(id: number): void
  {
    this.userService.deleteUserById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="User Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`User Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getUserById(): void
  {
    this.userService.getUserById(this.userGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.userGet=data;
        this.isUserGotten=true;
        this.messageGet="User Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isUserGotten=false;
        this.messageGet=`User Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}
