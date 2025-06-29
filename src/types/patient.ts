export interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  birth_date?: string; // ISO date string
  care_level?: number;
  pronoun?: string;
  email?: string;
  active?: boolean;
  active_since?: string; // ISO date
  created_at?: string;
}
