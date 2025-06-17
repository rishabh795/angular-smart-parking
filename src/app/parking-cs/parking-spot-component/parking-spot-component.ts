import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParkingSpot, ParkingStatus, User } from '../../models/models';
import { UserService } from '../../user-cs/user-component/service/user-service';
import { ParkingSpotService } from './service/parking-spot-service';

@Component({
  selector: 'app-parking-spot-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './parking-spot-component.html',
  styleUrl: './parking-spot-component.css'
})
export class ParkingSpotComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private parkingSpotService: ParkingSpotService, private userService: UserService) {}

  parkingSpotCreate: ParkingSpot =
  {
    location: '',
    status: ParkingStatus.Unknown
  }
  messageCreate?: string;

  parkingSpotUpdate: ParkingSpot =
  {
    id: 0,
    location: '',
    status: ParkingStatus.Unknown
  }
  messageUpdate?: string;

  parkingSpotList?: ParkingSpot[];
  messageList?: string;

  parkingSpotGet: ParkingSpot =
  {
    id: 0,
    location: '',
    status: ParkingStatus.Unknown
  }
  messageGet?: string;
  isParkingSpotGotten: boolean = true;
  parkingSpotGetId: number = 0;

  messageDelete?: string;

  allUsers: User[] = [];

  parkingSpotTypeEnumList=Object.values(ParkingStatus);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data)=>this.allUsers=data);
    this.getAllParkingSpots();
  }

  populateUpdateForm(parkingSpot: ParkingSpot) : void
  {
    this.parkingSpotUpdate={...parkingSpot};
  }

  createParkingSpot(): void
  {
    this.parkingSpotService.createParkingSpot(this.parkingSpotCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="ParkingSpot Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`ParkingSpot Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updateParkingSpotById(): void
  {
    this.parkingSpotService.updateParkingSpotById(this.parkingSpotUpdate.id!, this.parkingSpotUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.parkingSpotUpdate=data;
        this.messageUpdate="ParkingSpot Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`ParkingSpot Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllParkingSpots(): void
  {
    this.parkingSpotService.getAllParkingSpots().subscribe({
      next: (data)=>{
        console.log(data);
        this.parkingSpotList=data;
        this.messageList="ParkingSpot List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`ParkingSpot List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteParkingSpotById(id: number): void
  {
    this.parkingSpotService.deleteParkingSpotById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="ParkingSpot Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`ParkingSpot Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getParkingSpotById(): void
  {
    this.parkingSpotService.getParkingSpotById(this.parkingSpotGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.parkingSpotGet=data;
        this.isParkingSpotGotten=true;
        this.messageGet="ParkingSpot Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isParkingSpotGotten=false;
        this.messageGet=`ParkingSpot Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}


