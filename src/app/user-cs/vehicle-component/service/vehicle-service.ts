import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService
{
  private baseUrl: string="http://localhost:1000/user/vehicle"
  constructor(private http: HttpClient) { }

  createVehicle(vehicle: Vehicle) : Observable<Vehicle>
  {
    return this.http.post<Vehicle>(`${this.baseUrl}`, vehicle);
  }

  updateVehicleById(id: number, vehicle: Vehicle) : Observable<Vehicle>
  {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, vehicle);
  }

  getAllVehicles() : Observable<Vehicle[]>
  {
    return this.http.get<Vehicle[]>(`${this.baseUrl}`);
  }

  deleteVehicleById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getVehicleById(id: number) : Observable<Vehicle>
  {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }
}

