import axios from "axios";

const blynkAuth = 'Id8ho2TW5jHNcB384TY966cZO-DwlOVy';

export const smartHomeAnalytics = {
  async getAllBlynkReadings(){
    const getBlynkReadings = await axios.get(`https://fra1.blynk.cloud/external/api/getAll?token=${blynkAuth}`);
    console.log(getBlynkReadings.data);
    const { blynkButton, refreshPage } = smartHomeAnalytics.blynkStatus(getBlynkReadings.data.v0);
    const blynkTemp = smartHomeAnalytics.blynkTemp(getBlynkReadings.data.v1);
    const blynkPressure = getBlynkReadings.data.v2;
    const blynkHumid = getBlynkReadings.data.v3;
    const blynkLight = getBlynkReadings.data.v4;
    const blynkResults = { 
      blynkRaw: getBlynkReadings.data, 
      button: blynkButton, 
      refreshPage: refreshPage,
      temp: blynkTemp, 
      pressure: blynkPressure, 
      humidity: blynkHumid,
      light: blynkLight,
    };
    //const blynkReadings = getBlynkReadings;
    console.log(blynkResults);
    return blynkResults
  },
  
  blynkStatus(blynkReading) {
    let blynkButton;
    let refreshPage;
    if (blynkReading == 0) {
      blynkButton = 'off';
      refreshPage = false;
    } else {
      blynkButton = 'on';
      refreshPage = true;
    }
    return { blynkButton, refreshPage };
  },
  
  blynkTemp(blynkReading) {
    const blynkTemp = `${Math.round(blynkReading * 100) / 100} Celsius`;
    return blynkTemp;
  },
  
  blynkLight(blynkReading) {
    let blynkLight;
    if (blynkReading == 0) {
      blynkLight = 'Dark';
    } else {
      blynkLight = 'Light';
    }
    return blynkLight;
  }
}