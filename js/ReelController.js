import {
    GameStateEvents
} from "./GameStateEvents.js";

var allReels = new Array();
var gameStateEvents = new GameStateEvents();
const symbolConfig = require('../assets/symbols/allSyms.json');

export class ReelController {
    constructor() {
        for (var reel = 0; reel < 5; reel++) {
            allReels[reel] = new Array();
            for (var row = -1; row < 3; row++) {
                //create map of reels
                var symID = "symbol" + "_" + reel + "_" + row + "_";

                //Reposition and resize symbols to reels
                var randomSymbol = "s" +  Math.floor(Math.random() * (5 - 1 + 1) + 1);
                allReels[reel][row] = { symbolId: symID, assignedSymbolId: randomSymbol};
                var stylesheetWidth = (document.getElementById("symbolContainer").getBoundingClientRect().width) / (symbolConfig.frames[randomSymbol].frame.w / symbolConfig.meta.size.w);
                var stylesheetHeight = (document.getElementById("symbolContainer").getBoundingClientRect().height) / (symbolConfig.frames[randomSymbol].frame.h / symbolConfig.meta.size.h);
                document.getElementById(symID + "img").style.width = stylesheetWidth;
                document.getElementById(symID + "img").style.height = stylesheetHeight;

                var stylesheetMarginX = ((document.getElementById(symID + "img").getBoundingClientRect().width) * (symbolConfig.frames[randomSymbol].frame.x / symbolConfig.meta.size.w));
                var stylesheetMarginY = (document.getElementById(symID + "img").getBoundingClientRect().height) * (symbolConfig.frames[randomSymbol].frame.y / symbolConfig.meta.size.h);
                document.getElementById(symID + "img").style.left = "-" + Math.ceil(stylesheetMarginX) + "px";
                document.getElementById(symID + "img").style.top = "-" + (stylesheetMarginY) + "px";

            }

            window.addEventListener('resize', this.onWindowResize);
        }

        var winningNotches = new Array();
        winningNotches = [{
                reel: 0,
                row: 1
            }, {
                reel: 1,
                row: 0
            },
            {
                reel: 2,
                row: 0
            },
            {
                reel: 3,
                row: 0
            }
        ];
        // winningNotches.push(winningNotch, winningNotch2);
        // this.animateWinningSymbols(winningNotches);
    }

    animateWinningSymbols(winningNotches) {
        winningNotches.forEach(winningNotch => {
            var sym = document.getElementById(allReels[winningNotch.reel][winningNotch.row].symbolId);
            sym.style.animationName = 'winningAnimation';
            sym.style.animationTimingFunction = "linear";
            sym.style.animationDuration = 1 + "s";
            sym.style.animationPlayState = "running";
            sym.style.animationIterationCount = "infinite";
        });
    }

    spinButtonClicked() {
        var singleSpinDuration = 0.5;
        var totalSpinDuration = 2;
        var resolveTime = 1.5;
        var totalResolveTime = resolveTime;

        document.dispatchEvent(gameStateEvents.slotSpinning);

        // Blur the symbols.
        var allSymbolClasses = document.getElementsByClassName("symbolContainer");
        for (let i = 0; i < allSymbolClasses.length; i++) {
            allSymbolClasses[i].style.filter= "blur(2px)"
            
        }

        for (var reel = 0; reel < 5; reel++) {
            var time = singleSpinDuration;
            var originalTime = time;
            for (var row = -1; row < 3; row++) {
                var sym = document.getElementById(allReels[reel][row].symbolId.toString());
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
            // Unblur the symbols.
            var allSymbolClasses = document.getElementsByClassName("symbolContainer");
        for (let i = 0; i < allSymbolClasses.length; i++) {
            allSymbolClasses[i].style.filter= "unset"
            
        }
            resolveTime = 0 + (totalResolveTime * 0.25);
            this.removeEventListener("webkitAnimationEnd", resolveSymbol);
            this.style.animationDuration = resolveTime + "s";
            this.style.animationTimingFunction = "linear";
            var animName = this.id.toString().split('_');
            this.style.animationName = "resolvesymbol_0_" + animName[2] + "_";
            this.style.animationPlayState = "running";
            this.style.animationIterationCount = 1;
            this.style.animationFillMode = "forwards";

            //add symbols to reels
            var randomSymbol = "s" +  Math.floor(Math.random() * (5 - 1 + 1) + 1);
            var stylesheetWidth = (document.getElementById("symbolContainer").getBoundingClientRect().width) / (symbolConfig.frames[randomSymbol].frame.w / symbolConfig.meta.size.w);
            var stylesheetHeight = (document.getElementById("symbolContainer").getBoundingClientRect().height) / (symbolConfig.frames[randomSymbol].frame.h / symbolConfig.meta.size.h);
            document.getElementById(this.id + "img").style.width = stylesheetWidth;
            document.getElementById(this.id + "img").style.height = stylesheetHeight;

            var stylesheetMarginX = ((document.getElementById(this.id + "img").getBoundingClientRect().width) * (symbolConfig.frames[randomSymbol].frame.x / symbolConfig.meta.size.w));
            var stylesheetMarginY = (document.getElementById(this.id + "img").getBoundingClientRect().height) * (symbolConfig.frames[randomSymbol].frame.y / symbolConfig.meta.size.h);
            document.getElementById(this.id + "img").style.left = "-" + Math.ceil(stylesheetMarginX) + "px";
            document.getElementById(this.id + "img").style.top = "-" + (stylesheetMarginY) + "px";
            
            document.dispatchEvent(gameStateEvents.slotStopped);
        }
    }

    onWindowResize() {
        for (var reel = 0; reel < 5; reel++) {
            for (var row = -1; row < 3; row++) {
                //create map of reels
                // console.log((allReels[reel][row].assignedSymbolId));
                var symID = allReels[reel][row].symbolId;
                var symbolToResize = allReels[reel][row].assignedSymbolId;
                var stylesheetWidth = (document.getElementById("symbolContainer").getBoundingClientRect().width) / (symbolConfig.frames[symbolToResize].frame.w / symbolConfig.meta.size.w);
                var stylesheetHeight = (document.getElementById("symbolContainer").getBoundingClientRect().height) / (symbolConfig.frames[symbolToResize].frame.h / symbolConfig.meta.size.h);
                document.getElementById(symID + "img").style.width = stylesheetWidth;
                document.getElementById(symID + "img").style.height = stylesheetHeight;

                var stylesheetMarginX = ((document.getElementById(symID + "img").getBoundingClientRect().width) * (symbolConfig.frames[symbolToResize].frame.x / symbolConfig.meta.size.w));
                var stylesheetMarginY = (document.getElementById(symID + "img").getBoundingClientRect().height) * (symbolConfig.frames[symbolToResize].frame.y / symbolConfig.meta.size.h);
                document.getElementById(symID + "img").style.left = "-" + Math.ceil(stylesheetMarginX) + "px";
                document.getElementById(symID + "img").style.top = "-" + (stylesheetMarginY) + "px";

            }
        }
    }
}