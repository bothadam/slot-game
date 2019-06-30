import {
    BetSettingsEvents
} from "./BetSettingsEvents.js";

var betSettingsEvents = new BetSettingsEvents();
export class BetSettingsController {
    plusButton = document.getElementById('betPlusButton');
    minusButton = document.getElementById('betMinusButton');

    constructor() {
        this.plusButton.addEventListener('click', this.plusButtonClicked);
        this.minusButton.addEventListener('click', this.minusButtonClicked);
    }

    minusButtonClicked() {
        document.dispatchEvent(betSettingsEvents.betChangedEvent);
    }

    plusButtonClicked() {
        betSettingsEvents.betChangedEvent.detail.newBet = 26;
        document.dispatchEvent(betSettingsEvents.betChangedEvent);
    }
}