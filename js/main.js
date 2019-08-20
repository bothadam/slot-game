import {
    ReelController
} from "./ReelController.js"
import {
    BetSettingsController
} from "./BetSettingsController.js"
import {
    SpinButtonController
} from "./SpinButtonController.js";

class Main {
    _totalBet = 0;
    _allValidBets = [10, 20, 50, 100];
    _currentBetIndex = 0;

    _spinButtonController = new SpinButtonController();
    _reelController = new ReelController();
    _betSettingsController = new BetSettingsController(this._currentBetIndex, this._allValidBets);
    _gameState = "";

    constructor() {
        document.addEventListener("slotSpinning", this._onGameStateEventChanged.bind(this), false);
        document.addEventListener("slotStopped", this._onGameStateEventChanged.bind(this), false);
        document.addEventListener("onBetChanged", this._onBetChanged.bind(this), false);
        document.addEventListener("spinButtonClicked", this._onSpinButtonClicked.bind(this), false);
        document.addEventListener("autoplayButtonClicked", this._onAutoplayButtonClicked.bind(this), false);
        document.addEventListener("testButtonClicked", this._onTestButtonClicked.bind(this), false);
    }

    _onGameStateEventChanged(event) {
        if (event.detail.state == "slotSpinning") {
            this._gameState = "slotSpinning";
            this._betSettingsController.deactivateBetButtons();
        } else if (event.detail.state == "slotStopped") {
            this._gameState = "slotStopped";
            this._betSettingsController.determineBetButtonsActive();
            this._spinButtonController.setSpinButtonActive(true);
        }
    }

    _onBetChanged(event) {
        this._totalBet = event.detail.newBet;
    }

    _onSpinButtonClicked(event) {
        this._reelController.spinButtonClicked();
    }

    _onAutoplayButtonClicked(event) {
        this._reelController.autoplayButtonClicked();
    }

    _onTestButtonClicked(event) {
       this._reelController.testButtonClicked(); 
    }

}
var main = new Main();