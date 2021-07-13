export class Offer {
    typeOfOffer:string    //iznajmljivanje-prodaja
    idAdvertisement: number;
    nameOfAdvertisement: string;
    offerFrom:string;
    offerTo:string;
    date1:string;
    date2:string;
    accepted:boolean;
    price:number;
    transactionFees:number;
    status:string;
    idOffer:string;


    constructor(typeOfOffer, idAdvertisement, nameOfAdv, o1, o2, d1, d2, accepted, fee, status, price){
        this.typeOfOffer=typeOfOffer;
        this.idAdvertisement=idAdvertisement;
        this.nameOfAdvertisement=nameOfAdv;
        this.offerFrom=o1;
        this.offerTo=o2;
        this.date1=d1;
        this.price=price
        this.date2=d2;
        this.accepted=accepted;
        this.transactionFees=fee;
        this.status=status;
        this.idOffer="";
    }
}