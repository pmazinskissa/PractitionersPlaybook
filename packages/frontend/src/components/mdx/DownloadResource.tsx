import { FileText, FileSpreadsheet, FileImage, File, Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface DownloadResourceProps {
  filename: string;
  name: string;
  size?: string;
  type?: 'pdf' | 'xlsx' | 'csv' | 'png' | 'docx' | 'pptx' | 'other';
}

const typeConfig: Record<string, { icon: typeof File; color: string }> = {
  pdf: { icon: FileText, color: 'text-error' },
  xlsx: { icon: FileSpreadsheet, color: 'text-success' },
  csv: { icon: FileSpreadsheet, color: 'text-success' },
  png: { icon: FileImage, color: 'text-accent' },
  docx: { icon: FileText, color: 'text-primary' },
  pptx: { icon: FileText, color: 'text-warning' },
  other: { icon: File, color: 'text-text-secondary' },
};

function getTypeFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  return ext in typeConfig ? ext : 'other';
}

export default function DownloadResource({ filename, name, size, type }: DownloadResourceProps) {
  const { slug } = useParams<{ slug: string }>();
  const fileType = type || getTypeFromFilename(filename);
  const config = typeConfig[fileType] || typeConfig.other;
  const Icon = config.icon;
  const downloadUrl = `/api/courses/${slug}/assets/${filename}`;

  return (
    <ScrollReveal>
      <div className="my-6 flex items-center gap-4 p-4 rounded-card border border-border bg-white shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
        {/* File type icon */}
        <div className={`flex-shrink-0 ${config.color}`}>
          <Icon size={32} />
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{name}</p>
          {size && (
            <p className="text-xs text-text-secondary mt-0.5">{size}</p>
          )}
        </div>

        {/* Download button */}
        <a
          href={downloadUrl}
          download
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-button hover:bg-primary-hover transition-colors flex-shrink-0"
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </ScrollReveal>
  );
}
