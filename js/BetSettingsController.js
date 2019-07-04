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
    _plusButtonActive = true;
    _minusButtonActive = true;

    constructor(cur, allValid) {
        this._plusButton.addEventListener('click', this._plusButtonClicked.bind(this));
        this._minusButton.addEventListener('click', this._minusButtonClicked.bind(this));
        this._currentBetIndex = cur;
        this._allValidBets = allValid;
        this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
        this._determineBetButtonsActive();
    }

    /**
     * @param {number} value
     */
    set currentBet(value) {
        this._currentBet = value;
    }

    /**
     * @param {number[]} array of valid bets
     */
    set allValidBets(value) {
        this._allValidBets = value;
    }

    //public

    deactivateBetButtons() {
        this._setPlusButtonActive(false);
        this._setMinusButtonActive(false);
    }

    activateBetButtons() {
        this._setPlusButtonActive(true);
        this._setMinusButtonActive(true);
    }

    // private

    _minusButtonClicked() {
        const withinRange = this._currentBetIndex > 0;
        if (withinRange == true && this._minusButtonActive == true) {
            this._currentBetIndex--;
            this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
            betSettingsEvents.betChangedEvent.detail.newBet = this._allValidBets[this._currentBetIndex];
            this._onBetChangedEvent()
        }
    }

    _plusButtonClicked() {
        const withinRange = this._currentBetIndex < this._allValidBets.length - 1;
        if (withinRange == true && this._plusButtonActive == true) {
            this._currentBetIndex++;
            this._betDisplayArea.innerHTML = this._allValidBets[this._currentBetIndex];
            betSettingsEvents.betChangedEvent.detail.newBet = this._allValidBets[this._currentBetIndex];
            this._onBetChangedEvent()
        }

    }

    _onBetChangedEvent() {
        document.dispatchEvent(betSettingsEvents.betChangedEvent);
        this._determineBetButtonsActive();
    }

    _determineBetButtonsActive() {
        if (this._currentBetIndex != 0 && this._currentBetIndex != (this._allValidBets.length - 1)) {
            this._setMinusButtonActive(true);
            this._setPlusButtonActive(true);
        } else if (this._currentBetIndex == 0) {
            this._setMinusButtonActive(false);
        } else if (this._currentBetIndex == (this._allValidBets.length - 1)) {
            this._setPlusButtonActive(false);
        }
    }

    _setPlusButtonActive(active) {
        if (active === true) {
            this._plusButtonActive = active;
            this._plusButton.style.backgroundImage = "url('../assets/console/plusButton.png')";
        } else if (active == false) {
            this._plusButtonActive = active;
            this._plusButton.style.backgroundImage = "url('../assets/console/plusButtonDisabled.png')";
        }
    }

    _setMinusButtonActive(active) {
        if (active === true) {
            this._minusButtonActive = active;
            this._minusButton.style.backgroundImage = "url('../assets/console/minusButton.png')";
        } else if (active == false) {
            this._minusButtonActive = active;
            this._minusButton.style.backgroundImage = "url('../assets/console/minusButtonDisabled.png')";
        }
    }





}