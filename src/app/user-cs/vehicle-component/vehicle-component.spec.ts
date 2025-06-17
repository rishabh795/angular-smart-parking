import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Vehicle, VehicleType } from '../../models/models';
import { VehicleComponent } from './vehicle-component';

describe('VehicleComponent', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  let vehicle: Vehicle;
  let vehicleTwo: Vehicle;
  let htmlPage: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    htmlPage = fixture.nativeElement as HTMLElement;

    vehicle = {
        id: 1,
        type: VehicleType.Car,
        user: {
          id: 1,
          name: '1',
          email: '1'
        }
    };

    vehicleTwo = {
      id: 2,
      type: VehicleType.Truck,
      user: {
        id: 2,
        name: '2',
        email: '2'
      }
  };

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the list has been retrieved - get all', ()=>{

    const mockVehicleList = [vehicle, vehicleTwo];
    component.vehicleList = mockVehicleList;
    fixture.detectChanges();

    const rows = htmlPage.querySelectorAll('tbody');

    expect(rows.length).toBe(mockVehicleList.length);
  });

  it('should check if the update variable has been populated - populate update form', ()=>{
    component.populateUpdateForm(vehicle);
    expect(component.vehicleUpdate).toEqual(vehicle);
  });

  it('should click the button and check if the function has been called - create', ()=>{
    
    const buttons = htmlPage.querySelectorAll('button');
    const buttonCreate = Array.from(buttons).find(btn=>btn.textContent?.includes('Create'));

    const spy = spyOn(component, 'createVehicle');
    buttonCreate?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should click the button and check if the function has been called - update', ()=>{
    
    component.vehicleUpdate=vehicle;
    fixture.detectChanges();

    const buttons = htmlPage.querySelectorAll('button');
    const buttonUpdate = Array.from(buttons).find(btn=>btn.textContent?.includes('Update'));
   
    const spy = spyOn(component, 'updateVehicleById');
    buttonUpdate?.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should click the button and check if the function has been called - get by id', ()=>{

    const buttons = htmlPage.querySelectorAll('button');
    const buttonGet = Array.from(buttons).find(btn=>btn.textContent?.includes('Get'));

    const spy = spyOn(component, 'getVehicleById');
    buttonGet?.click();
    expect(spy).toHaveBeenCalled();
  });

  
});
