export class SpinButtonController {
    _spinButton = document.getElementById("spinButton");
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

    constructor() {
        this._spinButton.addEventListener("click", this._spinButtonClicked.bind(this));
    }

    //public
    setSpinButtonActive(active) {
        this._setSpinButtonActive(active);
    }


    // private

    _spinButtonClicked() {
        if (this._spinButtonActive == true) {
            console.log('hahahehe');
            document.dispatchEvent(this.spinButtonClicked);
            this._setSpinButtonActive(false);
        }
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