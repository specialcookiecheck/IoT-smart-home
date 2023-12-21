import { smartHomeAnalytics } from "../utils/smarthome-analytics.js";
import axios from "axios";


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