import { smartHomeAnalytics } from "../utils/smarthome-analytics.js";
import { stationController } from "./station-controller.js";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, onChildAdded, onChildChanged } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYmxcCV46swSd2kIclmzbMplpufsEcCnk",
  authDomain: "smarthome-69bc6.firebaseapp.com",
  databaseURL: "https://smarthome-69bc6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smarthome-69bc6",
  storageBucket: "smarthome-69bc6.appspot.com",
  messagingSenderId: "1091415926980",
  appId: "1:1091415926980:web:814f1e505bea445dcd4191"
};

export const smartHomeController = {
  
  // renders Smart Home page
  async index(request, response) {
    const viewData = {
      title: "Smart Home",
      blynkResults: await smartHomeAnalytics.getAllBlynkReadings()
    };
    console.log("smartHome rendering");
    response.render("smarthome-view", viewData);
  },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);


/*
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smarthome-69bc6-default-rtdb.europe-west1.firebasedatabase.app"
});
*/


// Web app Firebase configuration
/*
const firebaseConfig = {
  apiKey: "AIzaSyCYmxcCV46swSd2kIclmzbMplpufsEcCnk",
  authDomain: "smarthome-69bc6.firebaseapp.com",
  databaseURL: "https://smarthome-69bc6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smarthome-69bc6",
  storageBucket: "smarthome-69bc6.appspot.com",
  messagingSenderId: "1091415926980",
  appId: "1:1091415926980:web:814f1e505bea445dcd4191"
};
*/

//const app = initializeApp(firebaseConfig);
//const firebase = initializeApp(firebaseConfig);




//firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
//const database = getDatabase(app);
//const database = firebase.database();



//const db = getDatabase();
const changeRef = ref(db, "events");
onChildChanged(changeRef, (snapshot) => {
  console.log(snapshot.val());
  const [lastChild, lastValues] = Object.entries(snapshot.val()).at(-1);
  console.log(lastChild);
  const data = lastValues;
  console.log("data: " + data);
  const event = data.event;
  const temp = data.temperature;
  const pressure = data.pressure;
  const humidity = data.humidity;
  const count = data.count;
  console.log(event);
  console.log(temp);
  console.log(pressure);
  console.log(count);
  stationController.addArduinoTouchReport(temp, pressure)
  /*
  childSnapshot.forEach(function(childSnapshot) {
    event = childSnapshot.val()["event"];
    temp = childSnapshot.val()["temperature"];
    pressure = childSnapshot.val()["pressure"];
    humidity = childSnapshot.val()["humidity"];
    count = childSnapshot.val()["count"];
    //document.getElementById("events").innerText += `Event: ${event}, Temp: ${temp}, Pressure: ${pressure}, Humidity: ${humidity}, Count: ${count} \n`
      })
    */
});
  
/*
changeRef.limitToLast(1).on("value", function(snapshot) {
  stationController.addArduinoTouchReport()
  snapshot.forEach(function(childSnapshot) {
    const event = childSnapshot.val()["event"];
    const temp = childSnapshot.val()["temperature"];
    const pressure = childSnapshot.val()["pressure"];
    const humidity = childSnapshot.val()["humidity"];
    const count = childSnapshot.val()["count"];
    document.getElementById("events").innerText += `Event: ${event}, Temp: ${temp}, Pressure: ${pressure}, Humidity: ${humidity}, Count: ${count} \n`
      })
  });
*/

/*
// Create database reference
const camRef = database.ref("events/button");

// Sync on any updates to the DB. THIS CODE RUNS EVERY TIME AN UPDATE OCCURS ON THE DB.
camRef.limitToLast(1).on("value", function(snapshot) {
  stationController.addArduinoTouchReport()
  snapshot.forEach(function(childSnapshot) {
    const event = childSnapshot.val()["event"];
    const temp = childSnapshot.val()["temperature"];
    const pressure = childSnapshot.val()["pressure"];
    const humidity = childSnapshot.val()["humidity"];
    const count = childSnapshot.val()["count"];
    document.getElementById("events").innerText += `Event: ${event}, Temp: ${temp}, Pressure: ${pressure}, Humidity: ${humidity}, Count: ${count} \n`
      })
  });
*/

