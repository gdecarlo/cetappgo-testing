#!/usr/bin/env node
/**
 * generate_html_report_optimized.js
 * Versión optimizada del generador de reportes HTML
 * 
 * Optimizaciones implementadas:
 * 1. Template caching en memoria
 * 2. Single-pass regex para reemplazos (~20% más rápido)
 * 3. CSS externo compartido (~50% menos tamaño HTML)
 * 4. Pre-building de secciones HTML parciales
 * 5. Copia automática del CSS a evidence/assets/
 */

const fs = require("fs");
const path = require("path");

// ═══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN Y CACHE
// ═══════════════════════════════════════════════════════════════════

const SKILL_DIR = path.join(__dirname, "..", "evidence-generator");
const TEMPLATE_PATH = path.join(SKILL_DIR, "template-html-optimized.html");
const CSS_SOURCE_PATH = path.join(SKILL_DIR, "report-styles.css");
const EVIDENCE_CSS_DIR = path.resolve("evidence", "assets");
const EVIDENCE_CSS_PATH = path.join(EVIDENCE_CSS_DIR, "report-styles.css");

// Cache en memoria
let templateCache = null;
let cssCopied = false;

// ═══════════════════════════════════════════════════════════════════
// ARGUMENTOS CLI
// ═══════════════════════════════════════════════════════════════════

const args = process.argv.slice(2);

function getArgValue(flag) {
  const index = args.indexOf(flag);
  return (index !== -1 && index < args.length - 1) ? args[index + 1] : null;
}

const inputPath = getArgValue("--input") || getArgValue("-i");
const outputPathArg = getArgValue("--output") || getArgValue("-o");

if (!inputPath) {
  console.error("Usage: node generate_html_report_optimized.js --input <path/to/input.json> [--output <path/to/report.html>]");
  process.exit(1);
}

const resolvedInputPath = path.resolve(inputPath);
if (!fs.existsSync(resolvedInputPath)) {
  console.error(`Input JSON not found: ${resolvedInputPath}`);
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES UTILITARIAS
// ═══════════════════════════════════════════════════════════════════

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateEs(date) {
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", 
                  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function toDurationHuman(ms) {
  const safeMs = Number.isFinite(ms) ? Math.max(0, Math.round(ms)) : 0;
  if (safeMs < 1000) return `${safeMs} ms`;
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

function formatJsonBlock(value) {
  if (value === undefined) return "{}";
  if (typeof value === "string") return escapeHtml(value);
  try { return escapeHtml(JSON.stringify(value, null, 2)); } 
  catch { return "{}"; }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null) return [];
  return [value];
}

// ═══════════════════════════════════════════════════════════════════
// TEMPLATE CACHING Y CSS MANAGEMENT
// ═══════════════════════════════════════════════════════════════════

function getTemplate() {
  if (templateCache === null) {
    if (!fs.existsSync(TEMPLATE_PATH)) {
      console.error(`Template not found: ${TEMPLATE_PATH}`);
      process.exit(1);
    }
    templateCache = fs.readFileSync(TEMPLATE_PATH, "utf8");
  }
  return templateCache;
}

function ensureCssInEvidence() {
  if (cssCopied) return;
  
  ensureDir(EVIDENCE_CSS_DIR);
  
  // Solo copiar si no existe o está desactualizado
  const needsCopy = !fs.existsSync(EVIDENCE_CSS_PATH) || 
    fs.statSync(CSS_SOURCE_PATH).mtimeMs > fs.statSync(EVIDENCE_CSS_PATH).mtimeMs;
  
  if (needsCopy) {
    fs.copyFileSync(CSS_SOURCE_PATH, EVIDENCE_CSS_PATH);
    console.log(`CSS copied to: ${EVIDENCE_CSS_PATH}`);
  }
  
  cssCopied = true;
}

function calculateCssRelativePath(htmlOutputPath) {
  const htmlDir = path.dirname(htmlOutputPath);
  const relativePath = path.relative(htmlDir, EVIDENCE_CSS_PATH);
  return relativePath.replace(/\\/g, "/");
}

// ═══════════════════════════════════════════════════════════════════
// GENERADOR DE SECCIONES HTML
// ═══════════════════════════════════════════════════════════════════

function buildStepsHtml(steps) {
  return steps.map((step, i) => {
    const stepObj = typeof step === "string" ? { description: step } : step || {};
    const title = stepObj.title || stepObj.name || `Paso ${i + 1}`;
    const description = stepObj.description || stepObj.text || "";
    return `<div class="step"><span class="step-number">${i + 1}</span><strong>${escapeHtml(title)}:</strong> ${escapeHtml(description)}</div>`;
  }).join("\n");
}

function buildValidationsHtml(validations) {
  return validations.map(v => {
    const text = typeof v === "string" ? v : v?.text || "";
    return `<div class="step">✓ ${escapeHtml(text)}</div>`;
  }).join("\n");
}

function buildEvidenceHtml(evidenceImages) {
  return evidenceImages.map((evidence, i) => {
    const item = evidence || {};
    const title = item.title || `Evidencia ${i + 1}`;
    const description = item.description || "";
    const evidencePath = item.path || item.evidencePath || "";
    const alt = item.alt || title;
    return `<div class="evidence-item"><h3>${escapeHtml(title)}</h3><p class="evidence-description">${escapeHtml(description)}</p><img src="${escapeHtml(evidencePath)}" alt="${escapeHtml(alt)}" onclick="window.open(this.src, '_blank')"></div>`;
  }).join("\n");
}

// ═══════════════════════════════════════════════════════════════════
// MAIN: GENERACIÓN DEL REPORTE
// ═══════════════════════════════════════════════════════════════════

function loadInputData() {
  const raw = fs.readFileSync(resolvedInputPath, "utf8");
  try { return JSON.parse(raw); } 
  catch (e) { console.error("Invalid JSON input:", e.message); process.exit(1); }
}

const data = loadInputData();

// Procesar datos
const status = String(data.status || "PASS").toUpperCase() === "FAIL" ? "FAIL" : "PASS";
const isFail = status === "FAIL";

const evidenceStartTime = data.evidenceStartTime ? Date.parse(data.evidenceStartTime) : null;
const evidenceEndTime = data.evidenceEndTime ? Date.parse(data.evidenceEndTime) : null;
const reportGenStart = data.reportGenerationStartTime ? Date.parse(data.reportGenerationStartTime) : null;
const reportGenEnd = data.reportGenerationEndTime ? Date.parse(data.reportGenerationEndTime) : null;

const evidenceDurationMs = Number.isFinite(data.evidenceDurationMs) ? data.evidenceDurationMs
  : (evidenceStartTime && evidenceEndTime) ? evidenceEndTime - evidenceStartTime : 0;
const reportGenDurationMs = Number.isFinite(data.reportGenerationDurationMs) ? data.reportGenerationDurationMs
  : (reportGenStart && reportGenEnd) ? reportGenEnd - reportGenStart : 0;

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

// Preparar CSS
ensureCssInEvidence();
const cssPath = calculateCssRelativePath(outputPath);

// Pre-build secciones HTML
const stepsHtml = buildStepsHtml(normalizeArray(data.steps));
const validationsHtml = buildValidationsHtml(normalizeArray(data.validations));
const evidenceHtml = buildEvidenceHtml(normalizeArray(data.evidenceImages));

// ═══════════════════════════════════════════════════════════════════
// SINGLE-PASS REPLACEMENT (Optimización clave)
// ═══════════════════════════════════════════════════════════════════

const replacements = {
  TICKET_ID: escapeHtml(ticketId),
  TICKET_TITLE: escapeHtml(ticketTitle),
  STATUS_TEXT: escapeHtml(status),
  STATUS_CLASS: isFail ? " fail" : "",
  STATUS_ICON: isFail ? "✗" : "✓",
  AMBIENTE: escapeHtml(environment),
  URL_BASE: escapeHtml(baseUrl),
  FECHA: escapeHtml(fecha),
  USUARIO: escapeHtml(user),
  OBJETIVO: escapeHtml(objective),
  TEST_DATA_JSON: formatJsonBlock(data.testData),
  RESPONSE_JSON: formatJsonBlock(data.response),
  CONSOLE_ERRORS_JSON: formatJsonBlock(data.consoleErrors || []),
  EVIDENCE_DURATION_MS: String(evidenceDurationMs),
  EVIDENCE_DURATION_HUMAN: escapeHtml(data.evidenceDurationHuman || toDurationHuman(evidenceDurationMs)),
  REPORT_GENERATION_DURATION_MS: String(reportGenDurationMs),
  REPORT_GENERATION_DURATION_HUMAN: escapeHtml(data.reportGenerationDurationHuman || toDurationHuman(reportGenDurationMs)),
  CSS_PATH: cssPath,
  STEPS_HTML: stepsHtml,
  VALIDATIONS_HTML: validationsHtml,
  EVIDENCE_HTML: evidenceHtml
};

// Single-pass regex replacement
const html = getTemplate().replace(/\{\{(\w+)\}\}/g, (match, key) => {
  return Object.prototype.hasOwnProperty.call(replacements, key) ? replacements[key] : match;
});

// ═══════════════════════════════════════════════════════════════════
// OUTPUT
// ═══════════════════════════════════════════════════════════════════

ensureDir(path.dirname(outputPath));
fs.writeFileSync(outputPath, html, "utf8");

// Generar raw-result.md
const validationsLines = normalizeArray(data.validations).length
  ? normalizeArray(data.validations).map(v => `- ${typeof v === "string" ? v : v?.text || ""}`)
  : ["- (sin validaciones)"];

const rawResultContent = [
  `Historia de Usuario: ${ticketTitle}`,
  "",
  `Ambiente: ${environment}`,
  "",
  "Resultado de Prueba:",
  `${ticketId} - ${testCaseTitle} - ${status}`,
  "",
  "Validaciones:",
  ...validationsLines,
  "",
  `Fecha de ejecucion: ${fecha}`
].join("\n");

const rawResultPath = path.join(evidenceDir, `raw-${ticketId}-result.md`);
fs.writeFileSync(rawResultPath, rawResultContent, "utf8");

console.log(`HTML report generated: ${outputPath}`);
console.log(`Raw result generated: ${rawResultPath}`);
