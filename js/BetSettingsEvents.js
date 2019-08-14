export class BetSettingsEvents {
    betChangedEvent = new CustomEvent(
        "onBetChanged", {
            detail: {
                newBet: 1,
            },
            bubbles: true,
            cancelable: true
        }
    );

    constructor() {

    }

    // get betChangedEvent() {
    //     return this.betChangedEvent;
    // }

}