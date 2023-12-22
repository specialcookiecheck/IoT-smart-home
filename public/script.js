// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYmxcCV46swSd2kIclmzbMplpufsEcCnk",
  authDomain: "smarthome-69bc6.firebaseapp.com",
  databaseURL: "https://smarthome-69bc6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smarthome-69bc6",
  storageBucket: "smarthome-69bc6.appspot.com",
  messagingSenderId: "1091415926980",
  appId: "1:1091415926980:web:814f1e505bea445dcd4191"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Create database reference
const camRef = database.ref("events/button");

// Sync on any updates to the DB. THIS CODE RUNS EVERY TIME AN UPDATE OCCURS ON THE DB.
camRef.limitToLast(1).on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    const event = childSnapshot.val()["event"];
    const temp = childSnapshot.val()["temperature"];
    const count = childSnapshot.val()["count"];
    document.getElementById("events").innerText += `Event: ${event}, Temp: ${temp}, Count: ${count} \n`
      })
  });