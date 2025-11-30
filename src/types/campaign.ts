// src/types/campaign.ts

import { Timestamp } from 'firebase/firestore';

export type TemplateCategory =
    | 'anti-self-med'
    | 'complete-course'
    | 'not-for-flu'
    | 'amr-awareness';

export type TemplateFormat =
    | 'instagram-post'    // 1080x1080
    | 'instagram-story'   // 1080x1920
    | 'a4-poster'         // 2480x3508
    | 'facebook-post';    // 1200x630

export interface EditableZone {
    x: number;
    y: number;
    width?: number;
    height?: number;
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    maxLength?: number;
}

export interface CampaignTemplate {
    templateId: string;
    category: TemplateCategory;
    title: string;
    description: string;

    // Assets
    thumbnailUrl: string;     // Preview image URL
    baseImageUrl: string;     // Full resolution base image

    // Dimensions
    width: number;
    height: number;
    format: TemplateFormat;

    // Editable Zones
    editableZones: {
        pharmacyLogo?: EditableZone;
        pharmacyName?: EditableZone;
        address?: EditableZone;
        phone?: EditableZone;
        customText?: EditableZone;
    };

    // Metadata
    downloads: number;
    popularity: number;
    tags: string[];
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}

export interface UserCampaignPreferences {
    userId: string;
    defaultPharmacy: {
        name: string;
        address: string;
        phone: string;
        logoUrl?: string;
    };
    brandColor?: string;  // HEX color
    recentExports: Array<{
        templateId: string;
        exportedAt: Timestamp;
        downloadUrl: string;
    }>;
}

export interface ExportOptions {
    format: 'jpg' | 'png' | 'pdf';
    quality: 'web' | 'print';  // web: 72dpi, print: 300dpi
    filename?: string;
}
