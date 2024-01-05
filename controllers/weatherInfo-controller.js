import { accountsController } from "./accounts-controller.js";

export const weatherInfoController = {
  
  // renders the weather info page
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Weather Info",
      user: loggedInUser,
    };
    console.log("weatherinfo rendering");
    response.render("weatherinfo-view", viewData);
  },
};
