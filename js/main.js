import {
    ReelController
} from "./ReelController.js"
import {
    BetSettingsController
} from "./BetSettingsController.js"

var reelController = new ReelController();
var betSettingsController = new BetSettingsController();
var gameState = "";
var totalBet = 0;

document.addEventListener("slotSpinning", onGameStateEventChanged, false);
document.addEventListener("slotStopped", onGameStateEventChanged, false);
document.addEventListener("onBetChanged", onBetChanged, false);

function onGameStateEventChanged(event) {
    if (event.detail.state == "slotSpinning") {
        console.log('spin started');
        gameState = "slotSpinning";
    } else if (event.detail.state == "slotStopped") {
        console.log('spin ended or something');
        gameState = "slotStopped";
    }
}

function onBetChanged(event) {
    console.log('betchanged' + event.detail.newBet);
}