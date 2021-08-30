import Game from "./game";

export default class DOM {
  constructor() {
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

    window.logo = this.logo;
    window.background = this.background;
    window.leftSwatch = this.leftSwatch;
    window.rightSwatch = this.rightSwatch;
    window.score = this.score;
    window.newColor = newColor;

    this.colorConvert = require("color-convert");

    // assign game toggles by default to web browser click
    this.colorChanger_start = "mousedown";
    this.colorChanger_end = "mouseup";
    this.colorChanger_cancel = "";

    // reassigns game toggle to touch if decive browser is mobile
    document.addEventListener("load", () => {
      if (mobileAndTabletCheck()) {
        this.colorChanger_start = "touchstart";
        this.colorChanger_end = "touchend";
        this.colorChanger_cancel = "touchcancel";
      }
    });

    //Assign events

    this.gameWindow.addEventListener("resize", () => {
      let tvBounds = this.background.getBoundingClientRect();
      let scoreBounds = this.score.getBoundingClientRect();
      let pointsBounds = this.points.getBoundingClientRect();

      let TVsize = getComputedStyle(this.background).height;
      let targetSize = parseInt(TVsize) - 20;

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
      this.rootStyle.setProperty(
        "--Score-left",
        `${tvBounds.left + tvBounds.width * 0.802 - scoreBounds.width / 2}px`
      );
      this.rootStyle.setProperty(
        "--Score-top",
        `${tvBounds.top + tvBounds.height * 0.504 - scoreBounds.height / 2}px`
      );
    });
    // document.defaultView.window.addEventListener("load", () => {
    //   console.log("loaded");

    //   const TVsize = getComputedStyle(this.background).height;
    //   const targetSize = parseInt(TVsize) - 20;

    //   this.rootStyle.setProperty(
    //     "--TV-size",
    //     `${this.background.getBoundingClientRect().height}px`
    //   );
    //   this.rootStyle.setProperty(
    //     "--Score-left",
    //     `${tvBounds.left + tvBounds.width * 0.802}px`
    //   );
    //   this.rootStyle.setProperty(
    //     "--Score-top",
    //     `${tvBounds.top + tvBounds.height * 0.504}px`
    //   );
    //   this.rootStyle.setProperty(
    //     "--Points-height",
    //     `${this.gameBounds.width}px`
    //   );
    //   this.rootStyle.setProperty(
    //     "--Points-width",
    //     `${this.gameBounds.height}px`
    //   );
    // });

    this.leftSwatch.addEventListener(this.colorChanger_start, down);
    this.leftSwatch.addEventListener(this.colorChanger_end, up);
    //Also clear the interval when user leaves the window with mouse
    this.leftSwatch.addEventListener(this.colorChanger_cancel, up);

    ///----> End Logic for Click & Touch Event <----///

    // capture game element and disable context menu
    this.targets.addEventListener("contextmenu", (e) => e.preventDefault());
    // returns true if client device is mobile.
    function mobileAndTabletCheck() {
      let check = false;
      (function(a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }

    ///----> Start Logic for Click & Touch Event <----///

    let clickID = -1; //Global ID of mouse down interval
    function down() {
      if (clickID == -1)
        //Prevent multimple loops!
        clickID = setInterval(whileDown, 60 /*execute every 1ms*/);
    }
    function up() {
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

      let left_target_hsl = this.colorConvert.rgb.hsl(target_rgb_intARR);

      let new_target_color_hsl = [
        left_target_hsl[0] + 10,
        ...left_target_hsl.slice(1),
      ];

      let new_target_color_rgb = this.colorConvert.hsl.rgb(
        new_target_color_hsl
      );

      this.rootStyle.setProperty(
        "--LC",
        `rgb(${new_target_color_rgb.join(",")})`
      );
    };

    const randomRGB_style = () => {
      let random_0_to_359 =
        Math.round(Math.floor(Math.random() * 359) / 10) * 10;
      let hsl_arr = [random_0_to_359, 100, 50];

      let rgb_arr = this.colorConvert.hsl.rgb(hsl_arr);
      let rgb_style = `rgb(${rgb_arr.join(",")})`;

      return rgb_style;
    };

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
      let HSLs_array = this.colorConvert.rgb.hsl(RGBs_array);

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
