import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vehicle, VehicleType } from '../../../models/models';
import { VehicleService } from './vehicle-service';

describe('VehicleService', () => {
  let service: VehicleService;

  //extra
  let httpMock: HttpTestingController;
  
  let baseUrl: string = `http://localhost:1000/user/vehicle`;
  const vehicle: Vehicle = {
      id: 1,
      type: VehicleType.Car,
      user: {
        id: 1,
        name: '1',
        email: '1'
      }
  }

  const vehicleTwo: Vehicle = {
    id: 2,
    type: VehicleType.Truck,
    user: {
      id: 2,
      name: '2',
      email: '2'
    }
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VehicleService);

    //extra
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create via POST', ()=>{
    service.createVehicle(vehicle).subscribe(data=>expect(vehicle).toEqual(vehicle));

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(vehicle);
  });

  it('should update by ID via PUT', ()=>{
    service.updateVehicleById(vehicle.id!, vehicle).subscribe(data=>expect(data).toEqual(vehicle));

    const req = httpMock.expectOne(baseUrl + `/${vehicle.id!}`);
    expect(req.request.method).toBe('PUT');
    req.flush(vehicle);
  });

  it('should get all via GET', ()=>{
    const vehicleList: Vehicle[] = [vehicle, vehicleTwo];
    service.getAllVehicles().subscribe(data=>{
      expect(data.length).toBe(vehicleList.length);
      expect(data).toEqual(vehicleList);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(vehicleList);
  });

  it('should get by ID via GET', ()=>{
    service.getVehicleById(vehicle.id!).subscribe(data=>expect(data).toEqual(vehicle));

    const req = httpMock.expectOne(baseUrl + `/${vehicle.id!}`);
    expect(req.request.method).toBe('GET');
    req.flush(vehicle);
  });

  it('should delete by ID via DELETE', ()=>{
    service.deleteVehicleById(vehicle.id!).subscribe(data=>expect(data).toBeNull());

    const req = httpMock.expectOne(baseUrl + `/${vehicle.id!}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
