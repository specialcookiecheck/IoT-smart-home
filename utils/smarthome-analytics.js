import axios from "axios";

const blynkAuth = 'Id8ho2TW5jHNcB384TY966cZO-DwlOVy';

let blynkButton;
let blynkTemp;
let blynkPressure;
let blynkHumid;

export const smartHomeAnalytics = {
  async getAllBlynkReadings(){
    const getBlynkReadings = await axios.get(`https://fra1.blynk.cloud/external/api/getAll?token=${blynkAuth}`);
    console.log(getBlynkReadings.data);
    smartHomeAnalytics.blynkStatus(getBlynkReadings.data.v0);
    smartHomeAnalytics.blynkTemp(getBlynkReadings.data.v1);
    blynkPressure = getBlynkReadings.data.v2;
    blynkHumid = getBlynkReadings.data.v3;
    const blynkResults = { 
      blynkRaw: getBlynkReadings.data, 
      button: blynkButton, 
      temp: blynkTemp, 
      pressure: blynkPressure, 
      humidity: blynkHumid
    };
    //const blynkReadings = getBlynkReadings;
    console.log(blynkResults);
    return blynkResults
  },
  
  blynkStatus(blynkReading) {
    if (blynkReading == 0) {
      blynkButton = 'off';
    } else {
      blynkButton = 'on';
    }
    return blynkButton;
  },
  
  blynkTemp(blynkReading) {
    blynkTemp = `${blynkReading} Celsius`
  }
}