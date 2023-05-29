const fs = require("fs");
const readline = require("readline");
const path = require("path");

async function main(inputFile) {
  let outputFile = path.join(
    __dirname,
    "/output-files",
    "cleaned_" + path.basename(inputFile)
  );

  const fileStream = fs.createReadStream(inputFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let toWrite = [];

  for await (const line of rl) {
    
    if (line.includes("[stdout]")) {
      const infoStart = line.indexOf("INFO:") + "INFO:".length;
      const info = line.slice(infoStart).trim();
      toWrite.push(info);
    }
  }

  fs.writeFileSync(outputFile, toWrite.join("\n"), "utf8");
}

const dirPath = path.join(__dirname, "/input-files");
const files = fs.readdirSync(dirPath);

for (let file of files) {
  console.log("FILE IS", file);
  main(path.join(dirPath, file));
}
