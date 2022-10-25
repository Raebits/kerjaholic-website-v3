import firebase from "firebase";

export class UserRegisterEmail {
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    password: string = "";
    passwordConfirm: string = "";
    phoneNumber: string = "";
    dateBirth: string = "1999-01-01";
    gender: string =  "male";
    role: string =  "workerIndividual";
}