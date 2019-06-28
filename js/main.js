import {
    ReelController
} from "./ReelController.js"

var betButton = document.getElementById("betButton");
var spinButton = document.getElementById("spinButton");
var autoplayButton = document.getElementById("autoplayButton");

var reelController = new ReelController();
var gameState = "";

spinButton.addEventListener("click", reelController.spinButtonClicked);

document.addEventListener("slotSpinning", onGameStateEventChanged, false);
document.addEventListener("slotStopped", onGameStateEventChanged, false);

function onGameStateEventChanged(event) {
    if (event.detail.state == "slotSpinning") {
        console.log('spin started');
        gameState = "slotSpinning";
    } else if (event.detail.state == "slotStopped") {
        console.log('spin ended or something');
        gameState = "slotStopped";
    }
}