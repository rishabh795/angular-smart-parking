import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, Vehicle, VehicleType } from '../../models/models';
import { UserService } from '../user-component/service/user-service';
import { VehicleService } from './service/vehicle-service';

@Component({
  selector: 'app-vehicle-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './vehicle-component.html',
  styleUrl: './vehicle-component.css'
})
export class VehicleComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private vehicleService: VehicleService, private userService: UserService) {}

  vehicleCreate: Vehicle =
  {
    type: VehicleType.Unknown,
    user: {
      id: 0,
      name: '',
      email: ''
    }
  }
  messageCreate?: string;

  vehicleUpdate: Vehicle =
  {
    id: 0,
    type: VehicleType.Unknown,
    user: {
      id: 0,
      name: '',
      email: ''
    }
  }
  messageUpdate?: string;

  vehicleList?: Vehicle[];
  messageList?: string;

  vehicleGet: Vehicle =
  {
    id: 0,
    type: VehicleType.Unknown,
    user: {
      id: 0,
      name: '',
      email: ''
    }
  }
  messageGet?: string;
  isVehicleGotten: boolean = true;
  vehicleGetId: number = 0;

  messageDelete?: string;

  allUsers: User[] = [];

  vehicleTypeEnumList=Object.values(VehicleType);

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data)=>this.allUsers=data);
    this.getAllVehicles();
  }

  populateUpdateForm(vehicle: Vehicle) : void
  {
    this.vehicleUpdate={...vehicle};
  }

  createVehicle(): void
  {
    this.vehicleService.createVehicle(this.vehicleCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="Vehicle Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`Vehicle Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updateVehicleById(): void
  {
    this.vehicleService.updateVehicleById(this.vehicleUpdate.id!, this.vehicleUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.vehicleUpdate=data;
        this.messageUpdate="Vehicle Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`Vehicle Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllVehicles(): void
  {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data)=>{
        console.log(data);
        this.vehicleList=data;
        this.messageList="Vehicle List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`Vehicle List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteVehicleById(id: number): void
  {
    this.vehicleService.deleteVehicleById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="Vehicle Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`Vehicle Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getVehicleById(): void
  {
    this.vehicleService.getVehicleById(this.vehicleGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.vehicleGet=data;
        this.isVehicleGotten=true;
        this.messageGet="Vehicle Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isVehicleGotten=false;
        this.messageGet=`Vehicle Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}

