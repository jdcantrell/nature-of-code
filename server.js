const fs = require("fs");
const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");

hbs.registerHelper("eq", function eq(arg1, arg2, options) {
  return options.lookupProperty(options.data.root, arg1) === arg2;
});

const app = express();

app.use(logger("dev"));

app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/vendor", express.static("node_modules/p5/lib"));
app.use("/vendor/addons", express.static("node_modules/p5/lib/addons"));

// eslint-disable-next-line no-underscore-dangle
app.engine("html", hbs.__express);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/templates`);

app.get("/:experiment?", (req, res) => {
  // get list of experiments
  const files = fs.readdirSync("./js/").map((file) => file.replace(".js", ""));

  let current;
  if (req.params.experiment) {
    // see if file exists
    const filename = req.params.experiment.replace(/[^a-zA-Z0-9-]/g, "");
    if (fs.existsSync(`${__dirname}/js/${filename}.js`)) {
      current = filename;
    } else {
      res.status(404).send("Process not found!").end();
      return;
    }
  } else {
    // randomly pick one
    current = files[Math.round(Math.random() * (files.length - 1))];
  }

  // generate html
  res.render("index.html", {
    current,
    experiments: files.sort(),
  });
});

const listener = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log(`Your app is listening on port ${listener.address().port}`);
});
