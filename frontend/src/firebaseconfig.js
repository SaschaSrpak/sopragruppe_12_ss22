import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyALX2D5j2MI2OrVBTZ-nLHeYe9QDflT-mk",
    authDomain: "sopra-6237a.firebaseapp.com",
    projectId: "sopra-6237a",
    databaseURL: "https://sopra-6237a-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "sopra-6237a.appspot.com",
    messagingSenderId: "805029827580",
    appId: "1:805029827580:web:ec2280a5d3074fcd719879"
    };


let firebaseApp
if(!getApps().length){
    firebaseApp= initializeApp(firebaseConfig);
}
else{
    firebaseApp= getApps()[0];
}

export default firebaseApp;