# slot-game
Simply host the game using xampp (or mamp for mac), and open the main.html file in the html folder (yeah yeah i know i need and index.html file).

Note to self (look away if you are not me)
Setup and use webpack
npm init -y
npm install webpack -g
npm install babel-loader babel-core babel-preset-es2015 --save-dev
npm install --save-dev @babel/core @babel/preset-env
npm install --save-dev @babel/plugin-proposal-class-properties
npm i terser-webpack-plugin --save-dev


/////

Image compression knowledge
->Use solid colors instead of using gradients.
->700x700 px is still pretty ok slot symbol size
->Use straight lines when designing, curved lines don't compress as well
->Don't use rounded edges for lines (same reason as above)
->Scale down the image first and then use https://tinypng.com/ to compress it (25% gain).


