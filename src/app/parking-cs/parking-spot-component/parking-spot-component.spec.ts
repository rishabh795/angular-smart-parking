import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ParkingSpot, ParkingStatus } from '../../models/models';
import { ParkingSpotComponent } from './parking-spot-component';

describe('ParkingSpotComponent', () => {
  let component: ParkingSpotComponent;
  let fixture: ComponentFixture<ParkingSpotComponent>;

  //EXTRA 3 THINGS - declaration - must use let
  let htmlPage: HTMLElement;
  let parkingSpot: ParkingSpot;
  let parkingSpotTwo: ParkingSpot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingSpotComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //EXTRA 3 THINGS - initialization
    parkingSpot=
    {
        id: 1,
        location: '1',
        status: ParkingStatus.Parked
    }

    parkingSpotTwo =
    {
        id: 2,
        location: '2',
        status: ParkingStatus.Processing
    }

    htmlPage = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Create
  it('should click the button and check if the function has been called - create', ()=>{
    component.parkingSpotCreate = parkingSpot;
    fixture.detectChanges();
    const buttons = htmlPage.querySelectorAll('button');
    const buttonCreate = Array.from(buttons).find(btn=>btn.textContent?.includes('Create'));
    const spy = spyOn(component, 'createParkingSpot');
    buttonCreate?.click();
    expect(spy).toHaveBeenCalled();
  });


  //Update
  it('should click the button and check if the function has been called - update by id', ()=>{
    component.parkingSpotUpdate = parkingSpot;
    fixture.detectChanges();
    const buttons = htmlPage.querySelectorAll('button');
    const buttonUpdate = Array.from(buttons).find(btn=>btn.textContent?.includes('Update'));
    const spy = spyOn(component, 'updateParkingSpotById');
    buttonUpdate?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should check the list returned - get all',()=>{
    const parkingSpotList = [parkingSpot, parkingSpotTwo];
    component.parkingSpotList = parkingSpotList;
    fixture.detectChanges();
    const rows = htmlPage.querySelectorAll('tbody');
    expect(rows.length).toBe(parkingSpotList.length);
  });

  it('should click the button and check if the function has been called - get by id', ()=>{
    component.parkingSpotGet = parkingSpot;
    fixture.detectChanges();
    const buttons = htmlPage.querySelectorAll('button');
    const buttonGet = Array.from(buttons).find(btn=>btn.textContent?.includes('Get'));
    const spy = spyOn(component, 'getParkingSpotById');
    buttonGet?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should click the button and check if the function has been called - delete by id', ()=>{
    component.parkingSpotList = [parkingSpot, parkingSpotTwo];
    fixture.detectChanges();
    const buttons = htmlPage.querySelectorAll('button');
    const buttonDelete = Array.from(buttons).find(btn=>btn.textContent?.includes('Delete'));
    const spy = spyOn(component, 'deleteParkingSpotById');
    buttonDelete?.click();
    expect(spy).toHaveBeenCalled();
  })

  it('should populate the update property - populate update form', ()=>{
    component.populateUpdateForm(parkingSpot);
    fixture.detectChanges();
    expect(component.parkingSpotUpdate).toEqual(parkingSpot);
  });
});