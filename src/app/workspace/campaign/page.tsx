'use client';

import { useState } from 'react';
import { TemplateGallery } from '@/components/campaign/TemplateGallery';
import { TemplateEditor } from '@/components/campaign/TemplateEditor';
import { CampaignTemplate } from '@/types/campaign';

export default function CampaignPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<CampaignTemplate | null>(null);

  const handleSelectTemplate = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
  };

  const handleEditTemplate = (template: CampaignTemplate) => {
    setEditingTemplate(template);
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Modul D</p>
        <h1 className="font-display text-3xl text-white">Campaign Toolkit</h1>
        <p className="text-white/60">Buat materi kampanye AMR yang profesional untuk apotek Anda</p>
      </div>

      {!selectedTemplate ? (
        <TemplateGallery onSelectTemplate={handleSelectTemplate} />
      ) : (
        <div className="glass-panel p-6 border border-white/10 rounded-2xl">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">{selectedTemplate.title}</h2>
            <p className="text-white/60 text-sm">{selectedTemplate.description}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              ← Kembali ke Gallery
            </button>
            <button
              onClick={() => handleEditTemplate(selectedTemplate)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-aurora-500 to-purple-600 text-white font-medium hover:shadow-aurora-500/40 transition-all"
            >
              Customize Template
            </button>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editingTemplate && (
        <TemplateEditor
          template={editingTemplate}
          userId="demo-user" // TODO: Replace with actual user ID from auth context
          onClose={() => setEditingTemplate(null)}
        />
      )}
    </section>
  );
}
