import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking, Invoice, InvoiceDTO, ParkingStatus, PaymentStatus, User } from '../../models/models';
import { BookingService } from '../../parking-cs/booking-component/service/booking-service';
import { UserService } from '../../user-cs/user-component/service/user-service';
import { InvoiceService } from './service/invoice-service';

@Component({
  selector: 'app-invoice-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './invoice-component.html',
  styleUrl: './invoice-component.css'
})
export class InvoiceComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private invoiceService: InvoiceService, private bookingService: BookingService, private userService: UserService) {}

  invoiceCreate: Invoice =
  {
    bookingId: 0,
    amount: 0,
    date: ''
  }
  messageCreate?: string;

  invoiceUpdate: Invoice =
  {
    id: 0,
    bookingId: 0,
    amount: 0,
    date: ''
  }
  messageUpdate?: string;

  invoiceList?: Invoice[];
  messageList?: string;

  invoiceGet: Invoice =
  {
    id: 0,
    bookingId: 0,
    amount: 0,
    date: ''
  }
  messageGet?: string;
  isInvoiceGotten: boolean = true;
  invoiceGetId: number = 0;

  messageDelete?: string;

  invoiceDetails: InvoiceDTO =
  {
    id: 0,
    booking: {
        id: 0,
        userId: 0,
        parkingSpot: {
            id: 0,
            location: '',
            status: ParkingStatus.Unknown
          },
        timestamp: new Date()
      },
    amount: 0,
    date: ''
  }
  messageDetails?: string;
  invoiceDetailsId: number = 0;
  isInvoiceDetailsGotten: boolean = false;

  allBookings: Booking[] = [];
  allUsers: User[] = [];

  paymentStatusEnumList=Object.values(PaymentStatus);

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((data)=>this.allBookings=data);
    this.userService.getAllUsers().subscribe((data)=>this.allUsers=data);
    this.getAllInvoices();
  }

  populateUpdateForm(invoice: Invoice) : void
  {
    this.invoiceUpdate={...invoice};
  }

  createInvoice(): void
  {
    this.invoiceService.createInvoice(this.invoiceCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="Invoice Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`Invoice Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updateInvoiceById(): void
  {
    this.invoiceService.updateInvoiceById(this.invoiceUpdate.id!, this.invoiceUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.invoiceUpdate=data;
        this.messageUpdate="Invoice Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`Invoice Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllInvoices(): void
  {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data)=>{
        console.log(data);
        this.invoiceList=data;
        this.messageList="Invoice List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`Invoice List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deleteInvoiceById(id: number): void
  {
    this.invoiceService.deleteInvoiceById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="Invoice Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`Invoice Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getInvoiceById(): void
  {
    this.invoiceService.getInvoiceById(this.invoiceGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.invoiceGet=data;
        this.isInvoiceGotten=true;
        this.messageGet="Invoice Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isInvoiceGotten=false;
        this.messageGet=`Invoice Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getInvoiceDetailsById(): void
  {
    this.invoiceService.getInvoiceDetailsById(this.invoiceDetailsId).subscribe({
      next: (data)=>{
        console.log(data);
        this.invoiceDetails=data;
        this.isInvoiceDetailsGotten=true;
        this.messageDetails="Invoice Details Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isInvoiceDetailsGotten=false;
        this.messageDetails=`Invoice Details Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}




