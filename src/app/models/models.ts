//User

export interface User
{
    id?: number;
    name: string;
    email: string;
}

export interface Vehicle
{
    id?: number;
    type: VehicleType;
    user: User
}

export enum VehicleType
{
    Unknown="UNKNOWN",
    Car="CAR",
    Truck="TRUCK",
    Van="VAN"
}


//Parking
export interface ParkingSpot
{
    id?: number;
    location: string;
    status: ParkingStatus;
}

export enum ParkingStatus
{
    Unknown="UNKNOWN",
    Parked="PARKED",
    Unparked="UNPARKED",
    Processing="PROCESSING"
}

export interface Booking
{
    id?: number;
    userId: number; //Foreign to user in userMS
    parkingSpot: ParkingSpot; //internal
    timestamp: Date;
}

export interface BookingDTO
{
    id?: number;
    user: User; //Foreign to user in userMS
    parkingSpot: ParkingSpot; //internal
    timestamp: Date;
}

//Payment

export interface PaymentTransaction
{
    id?: number;
    amount: number; //Double datatype
    userId: number; //foreign
    status: PaymentStatus;
}

export interface PaymentTransactionDTO
{
    id?: number;
    amount: number; //Double datatype
    user: User; //foreign
    status: PaymentStatus;
}

export enum PaymentStatus
{
    Unknown="UNKNOWN",
    Paid="PAID",
    Not_Paid="NOT_PAID",
    Processing="PROCESSING"
}

export interface Invoice
{
    id?: number;
    bookingId: number; //foreign
    amount: number; //Double datatype
    date: string;
}

export interface InvoiceDTO
{
    id?: number;
    booking: Booking; //foreign
    amount: number; //Double datatype
    date: string;
}