import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking, BookingDTO, ParkingSpot, ParkingStatus, User } from '../../models/models';
import { UserService } from '../../user-cs/user-component/service/user-service';
import { ParkingSpotService } from '../parking-spot-component/service/parking-spot-service';
import { BookingService } from './service/booking-service';

@Component({
  selector: 'app-booking-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css'
})
export class BookingComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private bookingService: BookingService, private parkingSpotService: ParkingSpotService, private userService: UserService) {}

  bookingCreate: Booking =
  {
    userId: 0,
    parkingSpot: {
        id: 0,
        location: '',
        status: ParkingStatus.Unknown
      },
    timestamp: new Date()
  }
  messageCreate?: string;

  bookingUpdate: Booking =
  {
    id: 0,
    userId: 0,
    parkingSpot: {
        id: 0,
        location: '',
        status: ParkingStatus.Unknown
      },
    timestamp: new Date()
  }
  messageUpdate?: string;

  bookingList?: Booking[];
  messageList?: string;

  bookingGet: Booking =
  {
    id: 0,
    userId: 0,
    parkingSpot: {
        id: 0,
        location: '',
        status: ParkingStatus.Unknown
      },
    timestamp: new Date()
  }
  messageGet?: string;
  isBookingGotten: boolean = true;
  bookingGetId: number = 0;

  messageDelete?: string;

  bookingDetails: BookingDTO =
  {
    id: 0,
    user: {
      id: 0,
      name: '',
      email: ''
    },
    parkingSpot: {
        id: 0,
        location: '',
        status: ParkingStatus.Unknown
      },
    timestamp: new Date()
  }
  messageDetails?: string;
  bookingDetailsId: number = 0;
  isBookingDetailsGotten: boolean = false;

  allParkingSpots: ParkingSpot[] = [];
  allUsers: User[] = [];

  ngOnInit(): void {
    this.parkingSpotService.getAllParkingSpots().subscribe((data)=>this.allParkingSpots=data);
    this.userService.getAllUsers().subscribe((data)=>this.allUsers=data);
    this.getAllBookings();
  }

  populateUpdateForm(booking: Booking) : void
  {
    this.bookingUpdate={...booking};
  }

  createBooking(): void
  {
    this.bookingService.createBooking(this.bookingCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="Booking Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`Booking Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updateBookingById(): void
  {
    this.bookingService.updateBookingById(this.bookingUpdate.id!, this.bookingUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.bookingUpdate=data;
        this.messageUpdate="Booking Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`Booking Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllBookings(): void
  {
    this.bookingService.getAllBookings().subscribe({
      next: (data)=>{
        console.log(data);
        this.bookingList=data;
        this.messageList="Booking List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`Booking List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteBookingById(id: number): void
  {
    this.bookingService.deleteBookingById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="Booking Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`Booking Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getBookingById(): void
  {
    this.bookingService.getBookingById(this.bookingGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.bookingGet=data;
        this.isBookingGotten=true;
        this.messageGet="Booking Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isBookingGotten=false;
        this.messageGet=`Booking Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getBookingDetailsById(): void
  {
    this.bookingService.getBookingDetailsById(this.bookingDetailsId).subscribe({
      next: (data)=>{
        console.log(data);
        this.bookingDetails=data;
        this.isBookingDetailsGotten=true;
        this.messageDetails="Booking Details Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isBookingDetailsGotten=false;
        this.messageDetails=`Booking Details Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}


