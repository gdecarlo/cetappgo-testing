const sharp = require('sharp');
const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════════

// Obtener carpeta desde argumentos de línea de comandos
const TARGET_DIR = process.argv[2];

// Ajustes de compresión (calidad 80 = punto óptimo peso/calidad)
const QUALITY = 80;

// ═══════════════════════════════════════════════════════════════════
// VALIDACIÓN
// ═══════════════════════════════════════════════════════════════════

if (!TARGET_DIR) {
    console.error('❌ Error: Debes especificar una carpeta de evidencias.');
    console.error('');
    console.error('Uso: node optimize-images.js <carpeta_evidencia>');
    console.error('');
    console.error('Ejemplos:');
    console.error('  node optimize-images.js .playwright-mcp/evidence/agenda/tc001');
    console.error('  node optimize-images.js .playwright-mcp/evidence/agenda/tc005');
    process.exit(1);
}

if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌ Error: La carpeta "${TARGET_DIR}" no existe.`);
    process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

async function optimizeImages() {
    console.log(`📁 Optimizando imágenes en: ${TARGET_DIR}`);
    console.log('');

    // Buscar imágenes recursivamente
    const pattern = `${TARGET_DIR}/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}`;
    const files = await glob(pattern);

    if (files.length === 0) {
        console.log('⚠️  No se encontraron imágenes para optimizar.');
        return;
    }

    console.log(`🔍 Encontradas ${files.length} imágenes. Procesando...`);
    console.log('');

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let optimizedCount = 0;

    for (const file of files) {
        // Evitar procesar imágenes ya marcadas como optimizadas
        if (file.includes('_opt.') || file.includes('_optimized.')) {
            console.log(`⏭️  Saltando (ya optimizada): ${path.basename(file)}`);
            continue;
        }

        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const dir = path.dirname(file);
        const tempPath = path.join(dir, `${name}_temp${ext}`);

        try {
            // Obtener tamaño original
            const originalStats = fs.statSync(file);
            const originalSize = originalStats.size;
            totalOriginalSize += originalSize;

            const image = sharp(file);
            const metadata = await image.metadata();

            // Optimizar según formato
            if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
                await image
                    .jpeg({ quality: QUALITY, mozjpeg: true })
                    .toFile(tempPath);
            } else if (metadata.format === 'png') {
                await image
                    .png({ quality: QUALITY, compressionLevel: 9, palette: true })
                    .toFile(tempPath);
            } else {
                console.log(`⏭️  Formato no soportado: ${path.basename(file)}`);
                continue;
            }

            // Obtener tamaño optimizado
            const optimizedStats = fs.statSync(tempPath);
            const optimizedSize = optimizedStats.size;

            // Solo reemplazar si hay mejora
            if (optimizedSize < originalSize) {
                fs.unlinkSync(file);
                fs.renameSync(tempPath, file);
                totalOptimizedSize += optimizedSize;

                const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
                const originalKB = (originalSize / 1024).toFixed(0);
                const optimizedKB = (optimizedSize / 1024).toFixed(0);

                console.log(`✅ ${name}${ext}: ${originalKB} KB → ${optimizedKB} KB (-${reduction}%)`);
                optimizedCount++;
            } else {
                // No hay mejora, eliminar temp y mantener original
                fs.unlinkSync(tempPath);
                totalOptimizedSize += originalSize;
                console.log(`➖ ${name}${ext}: sin mejora posible (mantener original)`);
            }

        } catch (error) {
            console.error(`❌ Error procesando ${path.basename(file)}:`, error.message);
            // Limpiar archivo temporal si existe
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        }
    }

    // Resumen final
    console.log('');
    const savedBytes = totalOriginalSize - totalOptimizedSize;
    const savedKB = (savedBytes / 1024).toFixed(0);
    console.log(`📊 Total: ${optimizedCount} imágenes optimizadas. Ahorro total: ${savedKB} KB`);
}

// ═══════════════════════════════════════════════════════════════════
// EJECUCIÓN
// ═══════════════════════════════════════════════════════════════════

optimizeImages().catch(err => {
    console.error('❌ Error fatal:', err);
    process.exit(1);
});