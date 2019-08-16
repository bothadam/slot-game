export class SpinButtonController {
    _spinButton = document.getElementById("spinButton");
    _autoplayButton = document.getElementById("autoplayButton");
    _spinButtonActive = true;

    spinButtonClicked = new CustomEvent(
        "spinButtonClicked", {
            // detail: {
            //     spinButtonClicked: "true",
            // },
            bubbles: true,
            cancelable: true
        }
    );

    autoplayButtonClicked = new CustomEvent(
        "autoplayButtonClicked", {
            // detail: {
            //     spinButtonClicked: "true",
            // },
            bubbles: true,
            cancelable: true
        }
    );

    constructor() {
        this._spinButton.addEventListener("click", this._spinButtonClicked.bind(this));
        this._autoplayButton.addEventListener("click", this._autoplayButtonClicked.bind(this));
    }

    //public
    setSpinButtonActive(active) {
        this._setSpinButtonActive(active);
    }


    // private

    _spinButtonClicked() {
        if (this._spinButtonActive == true) {
            document.dispatchEvent(this.spinButtonClicked);
            this._setSpinButtonActive(false);
        }
    }

    _autoplayButtonClicked() {
        document.dispatchEvent(this.autoplayButtonClicked);
    }

    _setSpinButtonActive(active) {
        if (active === true) {
            this._spinButtonActive = active;
            this._spinButton.style.backgroundImage = "url('../assets/console/spinButton.png')";
        } else if (active == false) {
            this._spinButtonActive = active;
            this._spinButton.style.backgroundImage = "url('../assets/console/spinButtonDisabled.png')";
        }
    }

}