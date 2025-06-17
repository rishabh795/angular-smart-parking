import { Routes } from '@angular/router';
import { UserCsPage } from './user-cs/user-cs-page/user-cs-page';
import { UserComponent } from './user-cs/user-component/user-component';
import { VehicleComponent } from './user-cs/vehicle-component/vehicle-component';
import { ParkingPage } from './parking-cs/parking-page/parking-page';
import { ParkingSpotComponent } from './parking-cs/parking-spot-component/parking-spot-component';
import { BookingComponent } from './parking-cs/booking-component/booking-component';
import { PaymentPage } from './payment-cs/payment-page/payment-page';
import { PaymentTransactionComponent } from './payment-cs/payment-transaction-component/payment-transaction-component';
import { InvoiceComponent } from './payment-cs/invoice-component/invoice-component';

export const routes: Routes = [
    {path:'user-cs/user-page', component: UserCsPage},
    {path:'user-cs/user-component', component: UserComponent},
    {path:'user-cs/vehicle-component',component: VehicleComponent},

    {path:'parking-cs/parking-page', component: ParkingPage},
    {path:'parking-cs/parking-spot-component', component: ParkingSpotComponent},
    {path:'parking-cs/booking-component',component: BookingComponent},

    {path:'payment-cs/payment-page', component: PaymentPage},
    {path:'payment-cs/payment-transaction-component', component: PaymentTransactionComponent},
    {path:'payment-cs/invoice-component',component: InvoiceComponent}
];
