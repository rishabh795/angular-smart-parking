import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentTransaction, PaymentTransactionDTO } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService 
{
  private baseUrl: string="http://localhost:2000/payment/paymenttransaction"
  constructor(private http: HttpClient) { }

  createPaymentTransaction(paymentTransaction: PaymentTransaction) : Observable<PaymentTransaction>
  {
    return this.http.post<PaymentTransaction>(`${this.baseUrl}`, paymentTransaction);
  }

  updatePaymentTransactionById(id: number, paymentTransaction: PaymentTransaction) : Observable<PaymentTransaction>
  {
    return this.http.put<PaymentTransaction>(`${this.baseUrl}/${id}`, paymentTransaction);
  }

  getAllPaymentTransactions() : Observable<PaymentTransaction[]>
  {
    return this.http.get<PaymentTransaction[]>(`${this.baseUrl}`);
  }

  deletePaymentTransactionById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPaymentTransactionById(id: number) : Observable<PaymentTransaction>
  {
    return this.http.get<PaymentTransaction>(`${this.baseUrl}/${id}`);
  }

  getPaymentTransactionDetailsById(id: number) : Observable<PaymentTransactionDTO>
  {
    return this.http.get<PaymentTransactionDTO>(`${this.baseUrl}/details/${id}`);
  }
}