import Game from "./game";

export default class DOM {
  constructor(device) {
    this.game = new Game();

    this.gameWindow = document.defaultView.window;
    this.rootStyle = document.querySelector(":root").style;
    this.gameBounds = document.querySelector(".game").getBoundingClientRect();
    this.logo = document.getElementById("logo");
    this.background = document.getElementById("background");
    this.leftSwatch = document.getElementById("leftSwatch");
    this.rightSwatch = document.getElementById("rightSwatch");
    this.score = document.getElementById("score");
    this.points = document.getElementById("points");
    this.pointsVal = document.querySelector("#points > p");
    this.targets = document.querySelector("target");
    this.randomRGB_style = randomRGB_style;

    window.logo = this.logo;
    window.background = this.background;
    window.leftSwatch = this.leftSwatch;
    window.rightSwatch = this.rightSwatch;
    window.score = this.score;
    window.newColor = newColor;

    const colorConvert = require("color-convert");

    if (device) {
      this.colorChanger_start = "touchstart";
      this.colorChanger_end = "touchend";
      this.colorChanger_cancel = "touchcancel";
    } else {
      this.colorChanger_start = "mousedown";
      this.colorChanger_end = "mouseup";
      this.colorChanger_cancel = "";
    }

    //Assign events

    document.getElementById("logo").addEventListener("click", () => {
      document.getElementById("header").classList.toggle("expand");
    });
    document.getElementById("header").addEventListener("click", () => {
      document.getElementById("header").classList.toggle("expand");
    });

    this.gameWindow.addEventListener("resize", () => {
      let tvBounds = this.background.getBoundingClientRect();
      let scoreBounds = this.score.getBoundingClientRect();
      let pointsBounds = this.points.getBoundingClientRect();

      let TVsize = getComputedStyle(this.background).height;
      let targetSize = parseInt(TVsize) - 20;

      document
        .querySelector(":root")
        .style.setProperty(
          "--Logo-left",
          `${document.querySelector("#logo").getBoundingClientRect().width /
            2}px`
        );
      document
        .querySelector(":root")
        .style.setProperty(
          "--Score-font-size",
          `${document.querySelector("#background").getBoundingClientRect()
            .width * 0.044}px`
        );

      this.rootStyle.setProperty(
        "--ScoreBG-width",
        `${document.querySelector("#background").getBoundingClientRect().width *
          0.22}px`
      );
      this.rootStyle.setProperty(
        "--ScoreBG-height",
        `${document.querySelector("#background").getBoundingClientRect()
          .height * 0.22}px`
      );
      this.rootStyle.setProperty(
        "--ScoreBG-top",
        `${document.querySelector("#background").getBoundingClientRect()
          .height * 0.588}px`
      );
      this.rootStyle.setProperty(
        "--ScoreBG-left",
        `${document.querySelector("#background").getBoundingClientRect()
          .height * 0.588}px`
      );
      this.rootStyle.setProperty(
        "--Score-top",
        `${document.querySelector("#background").getBoundingClientRect().top +
          document.querySelector("#background").getBoundingClientRect().height *
            0.675 -
          document.querySelector("#score").getBoundingClientRect().height /
            2}px`
      );
      this.rootStyle.setProperty(
        "--Score-left",
        `${document.querySelector("#background").getBoundingClientRect().left +
          document.querySelector("#background").getBoundingClientRect().width *
            0.7 -
          document.querySelector("#score").getBoundingClientRect().width / 2}px`
      );

      this.rootStyle.setProperty("--TV-size", `${targetSize}px`);
      this.rootStyle.setProperty("--Swatch-width", `${targetSize / 4}px`);
      this.rootStyle.setProperty("--Swatch-height", `${targetSize / 2}px`);
      this.rootStyle.setProperty(
        "--Points-top",
        `${tvBounds.height * 0.42 - pointsBounds.height / 2}px`
      );
      this.rootStyle.setProperty(
        "--Points-left",
        `${parseInt(getComputedStyle(document.querySelector("body")).width) /
          2 -
          pointsBounds.width / 2}px`
      );
    });

    this.leftSwatch.addEventListener(this.colorChanger_start, (e) => {
      debugger;
      if (e.which === 1 || e.which === 0) {
        down();
      }
    });
    this.leftSwatch.addEventListener(this.colorChanger_end, (e) => {
      if (e.which === 1 || e.which === 0) {
        up();
      }
    });
    //Also clear the interval when user leaves the window with mouse
    this.leftSwatch.addEventListener(this.colorChanger_cancel, (e) => {
      if (e.which === 1 || e.which === 0) {
        up();
      }
    });

    ///----> End Logic for Click & Touch Event <----///

    // capture game element and disable context menu
    this.targets.addEventListener("contextmenu", (e) => e.preventDefault());

    ///----> Start Logic for Click & Touch Event <----///

    let clickID = -1; //Global ID of mouse down interval
    function down() {
      document.getElementById("leftSwatch").classList.add("clear");
      if (clickID == -1)
        //Prevent multimple loops!
        clickID = setInterval(whileDown, 60 /*execute every 60ms*/);
    }
    function up() {
      document.getElementById("leftSwatch").classList.remove("clear");
      if (clickID != -1) {
        //Only stop if exists
        clearInterval(clickID);
        clickID = -1;
      }
      getScore();
    }
    function whileDown() {
      setColor();
    }

    // Sets color of Player's color swatch
    const setColor = () => {
      let target_rgb_stringARR = getComputedStyle(this.leftSwatch)
        .background.slice(4)
        .split(")")[0]
        .split(",");

      let target_rgb_intARR = [];
      target_rgb_stringARR.forEach((val) =>
        target_rgb_intARR.push(parseInt(val))
      );

      let left_target_hsl = colorConvert.rgb.hsl(target_rgb_intARR);

      let new_target_color_hsl = [
        left_target_hsl[0] + 10,
        ...left_target_hsl.slice(1),
      ];

      let new_target_color_rgb = colorConvert.hsl.rgb(new_target_color_hsl);

      this.rootStyle.setProperty(
        "--LC",
        `rgb(${new_target_color_rgb.join(",")})`
      );
    };

    function randomRGB_style() {
      let random_0_to_359 =
        Math.round(Math.floor(Math.random() * 359) / 10) * 10;
      let hsl_arr = [random_0_to_359, 100, 50];

      let rgb_arr = colorConvert.hsl.rgb(hsl_arr);
      let rgb_style = `rgb(${rgb_arr.join(",")})`;

      return rgb_style;
    }

    const convertStyles_RGBtoHSL = (ele) => {
      // takes a document element and returns
      // an array of the HSL values converted from RGB.

      let rgb_stringVals = getComputedStyle(ele)
        .background.slice(4)
        .split(")")[0]
        .split(",");

      let RGBs_array = [];
      rgb_stringVals.forEach((string_val) =>
        RGBs_array.push(parseInt(string_val))
      );

      // colorConvert imported from NPM library
      // passed array of RGB values returned as HSL
      let HSLs_array = colorConvert.rgb.hsl(RGBs_array);

      return HSLs_array;
    };
    const getScore = () => {
      document.getElementById("leftSwatch");
      // .style.setProperty("pointer-events", "none");
      const pointsBounds = this.points.getBoundingClientRect();
      let points = 0;
      let diff = 0;
      let leftSwatch = convertStyles_RGBtoHSL(this.leftSwatch)[0];
      let rightSwatch = convertStyles_RGBtoHSL(this.rightSwatch)[0];

      if (leftSwatch[0] < rightSwatch[0]) {
        diff = rightSwatch[0] - leftSwatch[0];
      } else {
        diff = leftSwatch - rightSwatch;
      }
      points = Math.floor(
        Math.cos((leftSwatch - rightSwatch) * (Math.PI / 180)) * 100
      );

      let newScore = this.game.addPoints(points);
      if (points >= 0) {
        this.pointsVal.innerText = `+${points}`;
      } else {
        this.pointsVal.innerText = `${points}`;
      }
      this.points.classList.toggle("hide");
      this.points.classList.toggle("wobble-hor-bottom");
      this.score.innerText = newScore;
      this.rootStyle.setProperty(
        "--Points-left",
        `${parseInt(getComputedStyle(document.querySelector("body")).width) /
          2 -
          pointsBounds.width / 2}px`
      );
      setTimeout(() => {
        newColor(), this.points.classList.toggle("hide");
        this.points.classList.toggle("wobble-hor-bottom");
      }, 1500);
      // this.points.classList.remove("wobble-hor-bottom");
    };

    let swapID;
    let colorSwapper = 0;

    function newColor() {
      swapID = setInterval(() => {
        document
          .querySelector(":root")
          .style.setProperty("--RC", randomRGB_style());
        document
          .querySelector(":root")
          .style.setProperty("--LC", randomRGB_style());
        colorSwapper += 1;
        if (colorSwapper === 20) {
          clearInterval(swapID);
          swapID = null;
          colorSwapper = 0;
        }
      }, 15);
      document
        .getElementById("leftSwatch")
        .style.setProperty("pointer-events", "all");
    }
  }
}
