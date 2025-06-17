import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService
{
  private baseUrl: string="http://localhost:3000/parking/parkingspot"
  constructor(private http: HttpClient) { }

  createParkingSpot(parkingSpot: ParkingSpot) : Observable<ParkingSpot>
  {
    return this.http.post<ParkingSpot>(`${this.baseUrl}`, parkingSpot);
  }

  updateParkingSpotById(id: number, parkingSpot: ParkingSpot) : Observable<ParkingSpot>
  {
    return this.http.put<ParkingSpot>(`${this.baseUrl}/${id}`, parkingSpot);
  }

  getAllParkingSpots() : Observable<ParkingSpot[]>
  {
    return this.http.get<ParkingSpot[]>(`${this.baseUrl}`);
  }

  deleteParkingSpotById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getParkingSpotById(id: number) : Observable<ParkingSpot>
  {
    return this.http.get<ParkingSpot>(`${this.baseUrl}/${id}`);
  }
}


