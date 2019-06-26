import {
    ReelController
} from "./ReelController.js"

var betButton = document.getElementById("betButton");
var spinButton = document.getElementById("spinButton");
var autoplayButton = document.getElementById("autoplayButton");

var reelController = new ReelController();



var gameState = "";

spinButton.addEventListener("click", reelController.spinButtonClicked);

document.addEventListener("slotStateChanged", newMessageHandler, false);

function newMessageHandler(e) {
    console.log('wragtag');
    console.log(e.detail);
}