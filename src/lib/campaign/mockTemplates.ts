// src/lib/campaign/mockTemplates.ts

import { CampaignTemplate } from '@/types/campaign';
import { Timestamp } from 'firebase/firestore';

/**
 * Mock campaign templates for development
 * In production, these will be fetched from Firestore
 */

export const MOCK_TEMPLATES: CampaignTemplate[] = [
    // Anti-Self-Medication Category
    {
        templateId: 'anti-self-med-001',
        category: 'anti-self-med',
        title: 'Jangan Beli Antibiotik Tanpa Resep',
        description: 'Poster edukasi tentang bahaya membeli antibiotik tanpa resep dokter',
        thumbnailUrl: '/templates/thumbnails/anti-self-med-001.jpg',
        baseImageUrl: '/templates/bases/anti-self-med-001.png',
        width: 1080,
        height: 1080,
        format: 'instagram-post',
        editableZones: {
            pharmacyName: { x: 100, y: 900, fontSize: 32, color: '#FFFFFF' },
            address: { x: 100, y: 950, fontSize: 18, color: '#CCCCCC' },
            phone: { x: 100, y: 990, fontSize: 18, color: '#CCCCCC' },
        },
        downloads: 245,
        popularity: 85,
        tags: ['resep', 'dokter', 'apotek'],
        createdAt: Timestamp.now(),
    },
    {
        templateId: 'anti-self-med-002',
        category: 'anti-self-med',
        title: 'Tanya Farmasis Dulu',
        description: 'Ajakan untuk konsultasi dengan farmasis sebelum membeli obat',
        thumbnailUrl: '/templates/thumbnails/anti-self-med-002.jpg',
        baseImageUrl: '/templates/bases/anti-self-med-002.png',
        width: 1080,
        height: 1920,
        format: 'instagram-story',
        editableZones: {
            pharmacyName: { x: 100, y: 1700, fontSize: 36, color: '#FFFFFF' },
            phone: { x: 100, y: 1800, fontSize: 24, color: '#5EFCE8' },
        },
        downloads: 198,
        popularity: 75,
        tags: ['farmasis', 'konsultasi', 'aman'],
        createdAt: Timestamp.now(),
    },

    // Complete Course Category
    {
        templateId: 'complete-course-001',
        category: 'complete-course',
        title: 'Habiskan Antibiotikmu!',
        description: 'Pentingnya menghabiskan antibiotik sesuai resep',
        thumbnailUrl: '/templates/thumbnails/complete-course-001.jpg',
        baseImageUrl: '/templates/bases/complete-course-001.png',
        width: 1080,
        height: 1080,
        format: 'instagram-post',
        editableZones: {
            pharmacyName: { x: 100, y: 900, fontSize: 32, color: '#FFFFFF' },
            address: { x: 100, y: 950, fontSize: 18, color: '#CCCCCC' },
        },
        downloads: 312,
        popularity: 92,
        tags: ['habiskan', 'antibiotik', 'resistensi'],
        createdAt: Timestamp.now(),
    },
    {
        templateId: 'complete-course-002',
        category: 'complete-course',
        title: 'Set Alarm: Jangan Lupa Minum',
        description: 'Reminder untuk minum antibiotik sesuai jadwal',
        thumbnailUrl: '/templates/thumbnails/complete-course-002.jpg',
        baseImageUrl: '/templates/bases/complete-course-002.png',
        width: 1200,
        height: 630,
        format: 'facebook-post',
        editableZones: {
            pharmacyName: { x: 50, y: 550, fontSize: 28, color: '#FFFFFF' },
            phone: { x: 50, y: 590, fontSize: 20, color: '#5EFCE8' },
        },
        downloads: 156,
        popularity: 68,
        tags: ['alarm', 'jadwal', 'reminder'],
        createdAt: Timestamp.now(),
    },

    // Not for Flu Category
    {
        templateId: 'not-for-flu-001',
        category: 'not-for-flu',
        title: 'Flu Tidak Butuh Antibiotik',
        description: 'Edukasi bahwa flu adalah infeksi virus, bukan bakteri',
        thumbnailUrl: '/templates/thumbnails/not-for-flu-001.jpg',
        baseImageUrl: '/templates/bases/not-for-flu-001.png',
        width: 1080,
        height: 1080,
        format: 'instagram-post',
        editableZones: {
            pharmacyName: { x: 100, y: 900, fontSize: 32, color: '#FFFFFF' },
            address: { x: 100, y: 950, fontSize: 18, color: '#CCCCCC' },
        },
        downloads: 287,
        popularity: 88,
        tags: ['flu', 'virus', 'bakteri'],
        createdAt: Timestamp.now(),
    },
    {
        templateId: 'not-for-flu-002',
        category: 'not-for-flu',
        title: 'Batuk Pilek ≠ Antibiotik',
        description: 'Infografis tentang perbedaan virus dan bakteri',
        thumbnailUrl: '/templates/thumbnails/not-for-flu-002.jpg',
        baseImageUrl: '/templates/bases/not-for-flu-002.png',
        width: 2480,
        height: 3508,
        format: 'a4-poster',
        editableZones: {
            pharmacyLogo: { x: 100, y: 100, width: 200, height: 200 },
            pharmacyName: { x: 100, y: 3350, fontSize: 48, color: '#FFFFFF' },
            address: { x: 100, y: 3420, fontSize: 32, color: '#CCCCCC' },
        },
        downloads: 421,
        popularity: 95,
        tags: ['batuk', 'pilek', 'poster'],
        createdAt: Timestamp.now(),
    },

    // AMR Awareness Category
    {
        templateId: 'amr-awareness-001',
        category: 'amr-awareness',
        title: 'Apa itu Resistensi Antibiotik?',
        description: 'Penjelasan sederhana tentang AMR',
        thumbnailUrl: '/templates/thumbnails/amr-awareness-001.jpg',
        baseImageUrl: '/templates/bases/amr-awareness-001.png',
        width: 1080,
        height: 1080,
        format: 'instagram-post',
        editableZones: {
            pharmacyName: { x: 100, y: 900, fontSize: 32, color: '#FFFFFF' },
            customText: { x: 100, y: 500, fontSize: 24, color: '#FFFFFF', maxLength: 100 },
        },
        downloads: 195,
        popularity: 72,
        tags: ['amr', 'resistensi', 'edukasi'],
        createdAt: Timestamp.now(),
    },
    {
        templateId: 'amr-awareness-002',
        category: 'amr-awareness',
        title: 'Bijak Menggunakan Antibiotik',
        description: 'Tips penggunaan antibiotik yang bertanggung jawab',
        thumbnailUrl: '/templates/thumbnails/amr-awareness-002.jpg',
        baseImageUrl: '/templates/bases/amr-awareness-002.png',
        width: 1080,
        height: 1920,
        format: 'instagram-story',
        editableZones: {
            pharmacyName: { x: 100, y: 1700, fontSize: 36, color: '#FFFFFF' },
            phone: { x: 100, y: 1800, fontSize: 24, color: '#5EFCE8' },
        },
        downloads: 234,
        popularity: 80,
        tags: ['bijak', 'antibiotik', 'tips'],
        createdAt: Timestamp.now(),
    },
];

export const TEMPLATE_CATEGORIES = [
    { value: 'all', label: 'Semua Template', count: MOCK_TEMPLATES.length },
    { value: 'anti-self-med', label: 'Anti Self-Medication', icon: '🚫', count: 2 },
    { value: 'complete-course', label: 'Habiskan Antibiotik', icon: '💊', count: 2 },
    { value: 'not-for-flu', label: 'Bukan untuk Flu', icon: '🤧', count: 2 },
    { value: 'amr-awareness', label: 'Edukasi AMR', icon: '🦠', count: 2 },
];
