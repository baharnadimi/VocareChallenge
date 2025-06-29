"use client";

import { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import Terminliste from "@/components/Terminliste";
import Calendar from "@/components/Calendar";
import WeekView from "@/components/WeekView";
import TerminForm from "@/components/TerminForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Termin } from "@/types/termin";
import type { Filters } from "@/types/filters";

import {
  MdEvent,
  MdCalendarMonth,
  MdAccessTime,
  MdFolder,
  MdNoteAdd,
} from "react-icons/md";

export default function AppointmentsPage() {
  const [termine, setTermine] = useState<Termin[]>([]);
  const [filters, setFilters] = useState<Partial<Filters>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, val]) => {
          if (val !== undefined && val !== null) acc[key] = String(val);
          return acc;
        }, {} as Record<string, string>)
      );

      const res = await fetch("/api/appointments?" + params.toString());
      const data = await res.json();
      setTermine(data);
    }
    fetchData();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MdEvent size={28} className="text-blue-600" />
          Terminverwaltung
        </h1>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1"
        >
          <MdNoteAdd size={20} />
          Neuer Termin
        </Button>
      </div>

      <Card className="shadow-sm">
        <FilterBar onFilterChange={setFilters} />
      </Card>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <MdCalendarMonth size={20} className="text-gray-600" />
          Monatsansicht
        </h2>
        <Card className="p-4 shadow-sm">
          <Calendar termine={termine} />
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <MdAccessTime size={20} className="text-gray-600" />
          Wochenansicht
        </h2>
        <Card className="p-4 shadow-sm overflow-x-auto">
          <WeekView termine={termine} />
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <MdFolder size={20} className="text-gray-600" />
          Terminliste
        </h2>
        <Card className="p-4 shadow-sm">
          <Terminliste termine={termine} onClickTermin={() => {}} />
        </Card>
      </section>

      <TerminForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("Gespeichert:", data);
        }}
      />
    </div>
  );
}
