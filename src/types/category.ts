export interface Category {
  id: string;
  label: string;
  description?: string;
  color?: string; // hex value like "#00ff00"
  icon?: string; // e.g., emoji or class name
  created_at?: string;
  updated_at?: string;
}
