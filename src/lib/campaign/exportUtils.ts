// src/lib/campaign/exportUtils.ts

import jsPDF from 'jspdf';
import { ExportOptions } from '@/types/campaign';

/**
 * Download image from data URL
 */
export function downloadImage(dataURL: string, filename: string, format: 'png' | 'jpg') {
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Export canvas as PDF
 */
export function exportAsPDF(
    dataURL: string,
    width: number,
    height: number,
    filename: string
) {
    // Convert px to mm (assuming 96 DPI)
    const widthMm = (width * 25.4) / 96;
    const heightMm = (height * 25.4) / 96;

    const orientation = width > height ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [widthMm, heightMm],
    });

    pdf.addImage(dataURL, 'PNG', 0, 0, widthMm, heightMm);
    pdf.save(`${filename}.pdf`);
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(templateTitle: string): string {
    const timestamp = new Date().toISOString().slice(0, 10);
    const safeName = templateTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return `${safeName}-${timestamp}`;
}

/**
 * Convert data URL to Blob for upload
 */
export function dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

/**
 * Main export function
 */
export async function exportTemplate(
    canvas: any, // fabric.Canvas
    templateTitle: string,
    options: ExportOptions
): Promise<void> {
    const { format, quality } = options;
    const filename = options.filename || generateFilename(templateTitle);

    // Determine multiplier for quality
    const multiplier = quality === 'print' ? 4 : 1; // 4x for print (300dpi equivalent)

    // Export canvas to data URL
    const dataURL = canvas.toDataURL({
        format: format === 'jpg' ? 'jpeg' : 'png',
        quality: format === 'jpg' ? 0.9 : 1.0,
        multiplier,
    });

    // Execute export based on format
    if (format === 'pdf') {
        exportAsPDF(dataURL, canvas.width, canvas.height, filename);
    } else {
        downloadImage(dataURL, filename, format);
    }
}
