export class User {
    ime:string;
    prezime:string;
    username:string;
    password:string;
    picture:string;
    email:string;
    city:string;
    country:string;
    userType:string;
    accepted:boolean

    constructor(name, surname, username, password, picture, email, city, country, accepted){
        this.ime=name;
        this.prezime=surname,
        this.username=username;
        this.password=password;
        this.picture=picture;
        this.email=email;
        this.city=city;
        this.country=country;
        this.userType='korisnik'
        this.accepted=accepted;
    }
}