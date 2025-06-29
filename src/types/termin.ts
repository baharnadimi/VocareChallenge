export interface Termin {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  location?: string;
  notes?: string;
  category?: string; // category id
  patient?: string; // patient id
  attachments?: string[]; // optional: filenames or URLs
  created_at?: string;
  updated_at?: string;
  patientName?: string;
  categoryLabel?: string;
}
