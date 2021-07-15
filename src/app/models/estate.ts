export class Estate {
    name: string;
    municipality:string
    city: string;
    street: string;
    streetNumber:string;
    ownerUsername:string;
    typeOfAdvertisement:string;
    price:number;
    idAdvertisement:number;
    size:number;
    typeOfEstate:string;
    numberOfFloors:number;
    floorNumber:number;
    gallery: Array<string>;
    furniture:boolean;
    numberOfRooms:number;
    promoted:boolean;
    approved:boolean;
    views:number;
    sold:boolean;

    constructor(name:string, municipality:string, city:string, street:string,owner:string, streetNum:string,adType:string,size:number, price:number, estateType:string, floorCNT:number,floorNum:number,media: string[], furniture:boolean, numberOfR:number,approved:boolean){
        this.name=name;
        this.municipality=municipality;
        this.city=city;
        this.street=street;
        this.streetNumber=streetNum ;
        this.ownerUsername=owner;
        this.typeOfAdvertisement=adType;
        this.price=price;
        this.idAdvertisement=0;
        this.size=size;
        this.typeOfEstate=estateType;
        this.numberOfFloors=floorCNT;
        this.floorNumber=floorNum;
        this.furniture=furniture;
        this.numberOfRooms=numberOfR;
        this.gallery=media;
        this.views=0;
        this.approved=approved;
        this.promoted=false;
        this.sold=false;
    }


}