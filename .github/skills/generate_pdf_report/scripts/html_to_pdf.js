#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const playwright = require("playwright");

const args = process.argv.slice(2);

function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index === -1 || index === args.length - 1) {
    return null;
  }
  return args[index + 1];
}

const input = getArgValue("--input") || getArgValue("-i");
const output = getArgValue("--output") || getArgValue("-o");
const format = getArgValue("--format") || "A4";
const landscape = args.includes("--landscape");

if (!input) {
  console.error("Usage: node html_to_pdf.js --input <path/to/report.html> [--output <path/to/report.pdf>] [--format A4] [--landscape]");
  process.exit(1);
}

const inputPath = path.resolve(input);
if (!fs.existsSync(inputPath)) {
  console.error(`Input HTML not found: ${inputPath}`);
  process.exit(1);
}

const outputPath = output
  ? path.resolve(output)
  : path.join(path.dirname(inputPath), `${path.basename(inputPath, path.extname(inputPath))}.pdf`);

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "screen" });
  await page.pdf({
    path: outputPath,
    format,
    landscape,
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
})().catch((error) => {
  console.error("Failed to generate PDF:", error);
  process.exit(1);
});
