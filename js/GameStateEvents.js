export class GameStateEvents {
    slotSpinning = new CustomEvent(
        "slotSpinning", {
            detail: {
                state: "slotSpinning",
            },
            bubbles: true,
            cancelable: true
        }
    );

    slotStopped = new CustomEvent(
        "slotStopped", {
            detail: {
                state: "slotStopped",
            },
            bubbles: true,
            cancelable: true
        }
    );

    constructor() {

    }

    get slotSpinning() {
        return this.slotSpinning;
    }

    get slotStopped() {
        return this.slotStopped;
    }
}