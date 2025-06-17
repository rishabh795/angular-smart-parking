import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice, InvoiceDTO } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService
{
  private baseUrl: string="http://localhost:2000/payment/invoice"
  constructor(private http: HttpClient) { }

  createInvoice(invoice: Invoice) : Observable<Invoice>
  {
    return this.http.post<Invoice>(`${this.baseUrl}`, invoice);
  }

  updateInvoiceById(id: number, invoice: Invoice) : Observable<Invoice>
  {
    return this.http.put<Invoice>(`${this.baseUrl}/${id}`, invoice);
  }

  getAllInvoices() : Observable<Invoice[]>
  {
    return this.http.get<Invoice[]>(`${this.baseUrl}`);
  }

  deleteInvoiceById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getInvoiceById(id: number) : Observable<Invoice>
  {
    return this.http.get<Invoice>(`${this.baseUrl}/${id}`);
  }

  getInvoiceDetailsById(id: number) : Observable<InvoiceDTO>
  {
    return this.http.get<InvoiceDTO>(`${this.baseUrl}/details/${id}`);
  }
}