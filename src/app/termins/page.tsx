"use client";

import { useEffect, useState } from "react";
import type { Termin } from "@/types/termin";

export default function TerminsPage() {
  const [termine, setTermine] = useState<Termin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTermine() {
      try {
        const res = await fetch("/api/termins");
        if (!res.ok) {
          throw new Error("Fehler beim Abrufen der Termine");
        }
        const data = await res.json();
        setTermine(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unbekannter Fehler");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTermine();
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📅 Alle Termine</h1>
      <ul>
        {termine.map((t) => (
          <li key={t.id} className="border p-4 mb-2 rounded shadow-sm">
            <strong>{t.title}</strong>
            <br />
            Von: {new Date(t.start).toLocaleString("de-DE")}
            <br />
            Bis: {new Date(t.end).toLocaleString("de-DE")}
          </li>
        ))}
      </ul>
    </div>
  );
}
