import {
    ReelController
} from "./ReelController.js"
import {
    BetSettingsController
} from "./BetSettingsController.js"

class Main {
    _totalBet = 0;
    _allValidBets = [10, 20, 50, 100];
    _currentBetIndex = 0;

    _reelController = new ReelController();
    _betSettingsController = new BetSettingsController(this._currentBetIndex, this._allValidBets);
    _gameState = "";

    constructor() {
        document.addEventListener("slotSpinning", this._onGameStateEventChanged.bind(this), false);
        document.addEventListener("slotStopped", this._onGameStateEventChanged.bind(this), false);
        document.addEventListener("onBetChanged", this._onBetChanged.bind(this), false);
    }

    _onGameStateEventChanged(event) {
        if (event.detail.state == "slotSpinning") {
            console.log('spin started');
            this._gameState = "slotSpinning";
            this._betSettingsController.deactivateBetButtons();
        } else if (event.detail.state == "slotStopped") {
            console.log('spin ended or something');
            this._gameState = "slotStopped";
            this._betSettingsController.determineBetButtonsActive();
        }
    }

    _onBetChanged(event) {
        this._totalBet = event.detail.newBet;
        console.log(this._totalBet);
    }

}
var main = new Main();