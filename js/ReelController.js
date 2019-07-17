import {
    GameStateEvents
} from "./GameStateEvents.js";

var allReels = new Array();
var gameStateEvents = new GameStateEvents();
export class ReelController {
    constructor() {
        for (var reel = 0; reel < 5; reel++) {
            allReels[reel] = new Array();
            for (var row = -1; row < 3; row++) {
                //create map of reels
                var symID = "symbol" + "_" + reel + "_" + row + "_";
                allReels[reel][row] = symID;

                //add symbols to reels
                var rand = Math.floor(Math.random() * (12 - 1 + 1) + 1);
                document.getElementById(allReels[reel][row]).style.backgroundImage = "url('../assets/symbols/s" + rand +
                    ".png')";

            }
        }
    }

    spinButtonClicked() {
        var singleSpinDuration = 0.2;
        var totalSpinDuration = 2;
        var resolveTime = 1;
        var totalResolveTime = resolveTime;

        document.dispatchEvent(gameStateEvents.slotSpinning);

        for (var reel = 0; reel < 5; reel++) {
            var time = singleSpinDuration;
            var originalTime = time;
            for (var row = -1; row < 3; row++) {
                var sym = document.getElementById(allReels[reel][row].toString());
                sym.addEventListener("webkitAnimationEnd", moveUpSymbol);
                sym.style.animationName = "spinsymbol_0_" + row + "_";
                sym.style.animationTimingFunction = "linear";
                sym.style.animationDuration = time + "s";
                sym.style.animationPlayState = "running";
                time = time - (originalTime * 0.25);
            }
        }

        function moveUpSymbol() {
            this.removeEventListener("webkitAnimationEnd", moveUpSymbol);
            this.style.top = "-33.33%";
            this.style.animationName = "genericSymbolSpin";
            this.style.animationDuration = singleSpinDuration + "s";
            this.style.animationPlayState = "running";
            var iterationCount = Math.round(totalSpinDuration / singleSpinDuration);
            this.style.animationIterationCount = iterationCount.toString();
            this.addEventListener("webkitAnimationEnd", resolveSymbol);
        }

        function resolveSymbol() {
            resolveTime = 0 + (totalResolveTime * 0.25);
            this.removeEventListener("webkitAnimationEnd", resolveSymbol);
            this.style.animationDuration = resolveTime + "s";
            this.style.animationTimingFunction = "linear";
            var animName = this.id.toString().split('_');
            this.style.animationName = "resolvesymbol_0_" + animName[2] + "_";
            this.style.animationPlayState = "running";
            this.style.animationIterationCount = 1;
            this.style.animationFillMode = "forwards";
            var rand = Math.floor(Math.random() * (12 - 1 + 1) + 1);
            document.getElementById(allReels[animName[1]][animName[2]]).style.backgroundImage = "url('../assets/symbols/s" +
                rand +
                ".png')";
            document.dispatchEvent(gameStateEvents.slotStopped);
        }
    }
}