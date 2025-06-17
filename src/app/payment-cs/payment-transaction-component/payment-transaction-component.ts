import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParkingSpot, PaymentStatus, PaymentTransaction, PaymentTransactionDTO, User } from '../../models/models';
import { ParkingSpotService } from '../../parking-cs/parking-spot-component/service/parking-spot-service';
import { UserService } from '../../user-cs/user-component/service/user-service';
import { PaymentTransactionService } from './service/payment-transaction-service';

@Component({
  selector: 'app-payment-transaction-component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './payment-transaction-component.html',
  styleUrl: './payment-transaction-component.css'
})
export class PaymentTransactionComponent implements OnInit
{
  constructor(private cdr: ChangeDetectorRef, private paymentTransactionService: PaymentTransactionService, private parkingSpotService: ParkingSpotService, private userService: UserService) {}

  paymentTransactionCreate: PaymentTransaction =
  {
    amount: 0,
    userId: 0,
    status: PaymentStatus.Unknown
  }
  messageCreate?: string;

  paymentTransactionUpdate: PaymentTransaction =
  {
    id: 0,
    amount: 0,
    userId: 0,
    status: PaymentStatus.Unknown
  }
  messageUpdate?: string;

  paymentTransactionList?: PaymentTransaction[];
  messageList?: string;

  paymentTransactionGet: PaymentTransaction =
  {
    id: 0,
    amount: 0,
    userId: 0,
    status: PaymentStatus.Unknown
  }
  messageGet?: string;
  isPaymentTransactionGotten: boolean = true;
  paymentTransactionGetId: number = 0;

  messageDelete?: string;

  paymentTransactionDetails: PaymentTransactionDTO =
  {
    id: 0,
    amount: 0,
    user: {
      id: 0,
      name: '',
      email: ''
    },
    status: PaymentStatus.Unknown
  }
  messageDetails?: string;
  paymentTransactionDetailsId: number = 0;
  isPaymentTransactionDetailsGotten: boolean = false;

  allParkingSpots: ParkingSpot[] = [];
  allUsers: User[] = [];

  paymentStatusEnumList=Object.values(PaymentStatus);

  ngOnInit(): void {
    this.parkingSpotService.getAllParkingSpots().subscribe((data)=>this.allParkingSpots=data);
    this.userService.getAllUsers().subscribe((data)=>this.allUsers=data);
    this.getAllPaymentTransactions();
  }

  populateUpdateForm(paymentTransaction: PaymentTransaction) : void
  {
    this.paymentTransactionUpdate={...paymentTransaction};
  }

  createPaymentTransaction(): void
  {
    this.paymentTransactionService.createPaymentTransaction(this.paymentTransactionCreate).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageCreate="PaymentTransaction Creation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageCreate=`PaymentTransaction Creation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  updatePaymentTransactionById(): void
  {
    this.paymentTransactionService.updatePaymentTransactionById(this.paymentTransactionUpdate.id!, this.paymentTransactionUpdate).subscribe({
      next: (data)=>{
        console.log(data);
        this.paymentTransactionUpdate=data;
        this.messageUpdate="PaymentTransaction Updation Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageUpdate=`PaymentTransaction Updation Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getAllPaymentTransactions(): void
  {
    this.paymentTransactionService.getAllPaymentTransactions().subscribe({
      next: (data)=>{
        console.log(data);
        this.paymentTransactionList=data;
        this.messageList="PaymentTransaction List Retrieval Successful";
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageList=`PaymentTransaction List Retireval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  deletePaymentTransactionById(id: number): void
  {
    this.paymentTransactionService.deletePaymentTransactionById(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.messageDelete="PaymentTransaction Deletion Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.messageDelete=`PaymentTransaction Deletion Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getPaymentTransactionById(): void
  {
    this.paymentTransactionService.getPaymentTransactionById(this.paymentTransactionGetId).subscribe({
      next: (data)=>{
        console.log(data);
        this.paymentTransactionGet=data;
        this.isPaymentTransactionGotten=true;
        this.messageGet="PaymentTransaction Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isPaymentTransactionGotten=false;
        this.messageGet=`PaymentTransaction Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }

  getPaymentTransactionDetailsById(): void
  {
    this.paymentTransactionService.getPaymentTransactionDetailsById(this.paymentTransactionDetailsId).subscribe({
      next: (data)=>{
        console.log(data);
        this.paymentTransactionDetails=data;
        this.isPaymentTransactionDetailsGotten=true;
        this.messageDetails="PaymentTransaction Details Retrieval Successful";
        this.ngOnInit();
        this.cdr.detectChanges();
        
      },
      error: (err)=>{
        console.error(err);
        this.isPaymentTransactionDetailsGotten=false;
        this.messageDetails=`PaymentTransaction Details Retrieval Error: ${err.message}`;
        this.cdr.detectChanges();
      }
    });
  }
}



