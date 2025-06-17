import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, BookingDTO } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookingService
{
  private baseUrl: string="http://localhost:3000/parking/booking"
  constructor(private http: HttpClient) { }

  createBooking(booking: Booking) : Observable<Booking>
  {
    return this.http.post<Booking>(`${this.baseUrl}`, booking);
  }

  updateBookingById(id: number, booking: Booking) : Observable<Booking>
  {
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking);
  }

  getAllBookings() : Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}`);
  }

  deleteBookingById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBookingById(id: number) : Observable<Booking>
  {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  getBookingDetailsById(id: number) : Observable<BookingDTO>
  {
    return this.http.get<BookingDTO>(`${this.baseUrl}/details/${id}`);
  }
}



