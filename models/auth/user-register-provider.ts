import firebase from "firebase";

export class UserRegisterProvider {
    firebaseUser: firebase.User;
    phoneNumber: string = "";
    dateBirth: string = "1999-01-01";
    gender: string =  "male";
    role: string =  "workerIndividual";
    status: string =  "-"
    username: string = "";
    domisile: number;
}