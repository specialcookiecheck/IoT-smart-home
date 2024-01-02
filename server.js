import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
import jsonparser  from "jsonparser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json);
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

//const jsonParser = bodyParser.json();
app.get("/hi", function (request, response) {
  console.log("hi");
  response.send("hi");
})
app.get("/weathertop", function (request, response) {
  console.log("weathertop received");
  response.send("weathertop");
})
app.post("/weathertoplive", jsonparser, function(req, res) {
  console.log("webhook received");
  console.log(req.body);
})

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(
    `WeatherTop started on http://localhost:${listener.address().port}`
  );
});
