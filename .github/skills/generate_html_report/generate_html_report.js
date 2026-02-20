#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index === -1 || index === args.length - 1) {
    return null;
  }
  return args[index + 1];
}

const inputPath = getArgValue("--input") || getArgValue("-i");
const outputPathArg = getArgValue("--output") || getArgValue("-o");
const templatePath =
  getArgValue("--template") ||
  path.join(__dirname, "..", "evidence-generator", "template-html-base.html");

if (!inputPath) {
  console.error("Usage: node generate_html_report.js --input <path/to/input.json> [--output <path/to/report.html>] [--template <path/to/template.html>]");
  process.exit(1);
}

const resolvedInputPath = path.resolve(inputPath);
if (!fs.existsSync(resolvedInputPath)) {
  console.error(`Input JSON not found: ${resolvedInputPath}`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateEs(date) {
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()] || "";
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}

function toDurationHuman(ms) {
  const safeMs = Number.isFinite(ms) ? Math.max(0, Math.round(ms)) : 0;
  if (safeMs < 1000) {
    return `${safeMs} ms`;
  }
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

function replaceSection(html, startMarker, endMarker, content) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return html;
  }
  const before = html.slice(0, startIndex);
  const after = html.slice(endIndex + endMarker.length);
  return `${before}${content}${after}`;
}

function formatJsonBlock(value) {
  if (value === undefined) {
    return "{}";
  }
  if (typeof value === "string") {
    return escapeHtml(value);
  }
  try {
    return escapeHtml(JSON.stringify(value, null, 2));
  } catch (error) {
    return "{}";
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function loadInputData() {
  const raw = fs.readFileSync(resolvedInputPath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Invalid JSON input:", error.message);
    process.exit(1);
  }
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null) return [];
  return [value];
}

const data = loadInputData();
const template = fs.readFileSync(templatePath, "utf8");

const statusRaw = String(data.status || "PASS").toUpperCase();
const status = statusRaw === "FAIL" ? "FAIL" : "PASS";
const statusText = status;

const evidenceStartTime = data.evidenceStartTime ? Date.parse(data.evidenceStartTime) : null;
const evidenceEndTime = data.evidenceEndTime ? Date.parse(data.evidenceEndTime) : null;
const reportGenerationStartTime = data.reportGenerationStartTime ? Date.parse(data.reportGenerationStartTime) : null;
const reportGenerationEndTime = data.reportGenerationEndTime ? Date.parse(data.reportGenerationEndTime) : null;

const evidenceDurationMs = Number.isFinite(data.evidenceDurationMs)
  ? data.evidenceDurationMs
  : evidenceStartTime && evidenceEndTime
    ? evidenceEndTime - evidenceStartTime
    : 0;
const reportGenerationDurationMs = Number.isFinite(data.reportGenerationDurationMs)
  ? data.reportGenerationDurationMs
  : reportGenerationStartTime && reportGenerationEndTime
    ? reportGenerationEndTime - reportGenerationStartTime
    : 0;

const evidenceDurationHuman = data.evidenceDurationHuman || toDurationHuman(evidenceDurationMs);
const reportGenerationDurationHuman = data.reportGenerationDurationHuman || toDurationHuman(reportGenerationDurationMs);

const executionDate = data.executionDate ? new Date(data.executionDate) : new Date();
const fecha = data.fecha || formatDateEs(executionDate);

const ticketId = data.ticketId || "TC-000";
const ticketTitle = data.ticketTitle || "";
const testCaseTitle = data.testCaseTitle || ticketTitle || ticketId;
const environment = data.environment || data.ambiente || "";
const baseUrl = data.baseUrl || data.urlBase || "";
const user = data.user || data.usuario || "";
const objective = data.objective || data.objetivo || "";
const sourceFile = data.sourceFile || "";

const evidenceDir = data.evidenceDir
  ? path.resolve(data.evidenceDir)
  : path.resolve("evidence", sourceFile || "", ticketId);

const outputPath = outputPathArg
  ? path.resolve(outputPathArg)
  : path.join(evidenceDir, `${ticketId}_reporte.html`);

const steps = normalizeArray(data.steps);
const validations = normalizeArray(data.validations);
const evidenceImages = normalizeArray(data.evidenceImages);

const stepsHtml = steps
  .map((step, index) => {
    const stepObj = typeof step === "string" ? { description: step } : step || {};
    const title = stepObj.title || stepObj.name || `Paso ${index + 1}`;
    const description = stepObj.description || stepObj.text || "";
    return [
      "                    <div class=\"step\">",
      `                        <span class=\"step-number\">${index + 1}</span>`,
      `                        <strong>${escapeHtml(title)}:</strong> ${escapeHtml(description)}`,
      "                    </div>"
    ].join("\n");
  })
  .join("\n");

const validationsHtml = validations
  .map((validation) => {
    const text = typeof validation === "string" ? validation : validation?.text || "";
    return [
      "                    <div class=\"step\">",
      `                        PASS ${escapeHtml(text)}`,
      "                    </div>"
    ].join("\n");
  })
  .join("\n");

const evidenceHtml = evidenceImages
  .map((evidence, index) => {
    const item = evidence || {};
    const title = item.title || `Evidencia ${index + 1}`;
    const description = item.description || "";
    const evidencePath = item.path || item.evidencePath || "";
    const alt = item.alt || title;
    return [
      "                    <div class=\"evidence-item\">",
      `                        <h3>${escapeHtml(title)}</h3>`,
      `                        <p style=\"color: #666; margin-bottom: 10px;\">${escapeHtml(description)}</p>`,
      `                        <img src=\"${escapeHtml(evidencePath)}\" alt=\"${escapeHtml(alt)}\" onclick=\"window.open(this.src, '_blank')\">`,
      "                    </div>"
    ].join("\n");
  })
  .join("\n");

let html = template;

html = replaceSection(html, "<!-- {{STEPS_START}} -->", "<!-- {{STEPS_END}} -->", `\n${stepsHtml}\n                `);
html = replaceSection(html, "<!-- {{VALIDATIONS_START}} -->", "<!-- {{VALIDATIONS_END}} -->", `\n${validationsHtml}\n                `);
html = replaceSection(html, "<!-- {{EVIDENCE_START}} -->", "<!-- {{EVIDENCE_END}} -->", `\n${evidenceHtml}\n                `);

const replacements = new Map([
  ["{{TICKET_ID}}", escapeHtml(ticketId)],
  ["{{TICKET_TITLE}}", escapeHtml(ticketTitle)],
  ["{{STATUS}}", escapeHtml(status)],
  ["{{STATUS_TEXT}}", escapeHtml(statusText)],
  ["{{AMBIENTE}}", escapeHtml(environment)],
  ["{{URL_BASE}}", escapeHtml(baseUrl)],
  ["{{FECHA}}", escapeHtml(fecha)],
  ["{{USUARIO}}", escapeHtml(user)],
  ["{{OBJETIVO}}", escapeHtml(objective)],
  ["{{TEST_DATA_JSON}}", formatJsonBlock(data.testData)],
  ["{{RESPONSE_JSON}}", formatJsonBlock(data.response)],
  ["{{CONSOLE_ERRORS_JSON}}", formatJsonBlock(data.consoleErrors || [])],
  ["{{EVIDENCE_DURATION_MS}}", escapeHtml(evidenceDurationMs)],
  ["{{EVIDENCE_DURATION_HUMAN}}", escapeHtml(evidenceDurationHuman)],
  ["{{REPORT_GENERATION_DURATION_MS}}", escapeHtml(reportGenerationDurationMs)],
  ["{{REPORT_GENERATION_DURATION_HUMAN}}", escapeHtml(reportGenerationDurationHuman)]
]);

for (const [token, value] of replacements.entries()) {
  html = html.split(token).join(String(value));
}

const isFail = status === "FAIL";
html = html.replace(/<div class="status">/, `<div class="status${isFail ? " fail" : ""}">`);
html = html.replace(
  /<span class="status-badge[^"]*">.*?<\/span>/,
  `<span class="status-badge${isFail ? " fail" : ""}">${escapeHtml(statusText)}</span>`
);

ensureDir(path.dirname(outputPath));
fs.writeFileSync(outputPath, html, "utf8");

const validationsLines = validations.length
  ? validations.map((validation) => {
      const text = typeof validation === "string" ? validation : validation?.text || "";
      return `- ${text}`;
    })
  : ["- (sin validaciones)"];

const rawResultLines = [
  `Historia de Usuario: ${ticketTitle || ""}`,
  "",
  `Ambiente: ${environment || ""}`,
  "",
  "Resultado de Prueba:",
  `${ticketId} - ${testCaseTitle} - ${status}`,
  "",
  "Validaciones:",
  ...validationsLines,
  "",
  `Fecha de ejecucion: ${fecha}`
];

const rawResultPath = path.join(evidenceDir, `raw-${ticketId}-result.md`);
fs.writeFileSync(rawResultPath, rawResultLines.join("\n"), "utf8");

console.log(`HTML report generated: ${outputPath}`);
console.log(`Raw result generated: ${rawResultPath}`);
