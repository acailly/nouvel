const fs = require("fs");
const readline = require("readline");

// Inspired by https://stackoverflow.com/a/45556848

module.export = function (filePath, lineCount, callback) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath),
  });
  let lineCounter = 0; 
  let wantedLines = [];
  lineReader.on("line", function (line) {
    lineCounter++;
    wantedLines.push(line);
    if (lineCounter == lineCount) {
      lineReader.close();
    }
  });
  lineReader.on("close", function () {
    callback(wantedLines);
  });
};
