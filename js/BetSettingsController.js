import {
    BetSettingsEvents
} from "./BetSettingsEvents.js";

var betSettingsEvents = new BetSettingsEvents();
export class BetSettingsController {
    _plusButton = document.getElementById('betPlusButton');
    _minusButton = document.getElementById('betMinusButton');
    _betDisplayArea = document.getElementById('betDisplayArea');
    _currentBetIndex = 0;
    _allValidBets = [0, 2, 3];

    constructor(cur, allValid) {
        this._plusButton.addEventListener('click', this._plusButtonClicked.bind(this));
        this._minusButton.addEventListener('click', this._minusButtonClicked.bind(this));
        this._currentBetIndex = cur;
        this._allValidBets = allValid;
        this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
    }

    /**
     * @param {number} value
     */
    set currentBet(value) {
        this._currentBet = value;
    }

    /**
     * @param {number[]} value
     */
    set allValidBets(value) {
        this._allValidBets = value;
    }

    _minusButtonClicked() {
        const withinRange = this._currentBetIndex > 0;
        if (withinRange == true) {
            this._currentBetIndex--;
            this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
            betSettingsEvents.betChangedEvent.detail.newBet = this._allValidBets[this._currentBetIndex];
            document.dispatchEvent(betSettingsEvents.betChangedEvent);
        }
    }

    _plusButtonClicked() {
        const withinRange = this._currentBetIndex < this._allValidBets.length - 1;
        if (withinRange == true) {
            this._currentBetIndex++;
            this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
            betSettingsEvents.betChangedEvent.detail.newBet = this._allValidBets[this._currentBetIndex];
            document.dispatchEvent(betSettingsEvents.betChangedEvent);
        }

    }
}