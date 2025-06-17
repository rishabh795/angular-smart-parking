import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParkingSpot, ParkingStatus } from '../../../models/models';
import { ParkingSpotService } from './parking-spot-service';

describe('ParkingSpotService', () => {
  let service: ParkingSpotService;

  //EXTRA //
  let http: HttpTestingController;
  let parkingSpot: ParkingSpot;
  let parkingSpotTwo: ParkingSpot;
  const baseUrl: string = `http://localhost:3000/parking/parkingspot`;
  //


  beforeEach(() => {
    TestBed.configureTestingModule({
      //
      imports: [HttpClientTestingModule]
      //
    });
    service = TestBed.inject(ParkingSpotService);

    //EXTRA //
    http=TestBed.inject(HttpTestingController);

    parkingSpot = 
    {
        id: 1,
        location: '1',
        status: ParkingStatus.Parked
    }

    parkingSpotTwo = 
    {
        id: 2,
        location: '2',
        status: ParkingStatus.Unparked
    }
    //
  });

  //EXTRA //
  afterEach(()=>{
    http.verify();
  })
  //

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test create via POST', ()=>{
    service.createParkingSpot(parkingSpot).subscribe(data=>expect(data).toEqual(parkingSpot));

    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(parkingSpot);
  });

  it('should test update by id via PUT', ()=>{
    service.updateParkingSpotById(parkingSpot.id!, parkingSpot).subscribe(data=>expect(data).toEqual(parkingSpot));

    const req = http.expectOne(baseUrl + `/${parkingSpot.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(parkingSpot);
  });

  it('should test get all via GET', ()=>{
    const parkingSpotList = [parkingSpot, parkingSpotTwo];
    service.getAllParkingSpots().subscribe(data=>{
      expect(data.length).toEqual(parkingSpotList.length);
      expect(data).toEqual(parkingSpotList);
    });

    const req = http.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(parkingSpotList);
  });

  it('should delete by id via DELETE', ()=>{
    service.deleteParkingSpotById(parkingSpot.id!).subscribe(data=>{expect(data).toBeNull()});

    const req = http.expectOne(baseUrl+`/${parkingSpot.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should test the get by id function via GET', ()=>{
    service.getParkingSpotById(parkingSpot.id!).subscribe(data=>{expect(data).toEqual(parkingSpot)});

    const req = http.expectOne(baseUrl + `/${parkingSpot.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(parkingSpot);
  });
});
