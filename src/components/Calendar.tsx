"use client";

import React, { useState } from "react";
import { CalendarModal } from "./CalendarModal";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import type { Termin } from "@/types/termin";

interface CalendarProps {
  termine: Termin[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Calendar({ termine }: CalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(year, month);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function getTermineForDay(day: number) {
    const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
    return termine.filter((t) => t.start.startsWith(dateStr));
  }

  function prevMonth() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }
  function nextMonth() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function handleDayClick(day: number) {
    setSelectedDay(day);
  }

  return (
    <>
      <div className="max-w-md mx-auto p-4 border rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <h2 className="text-lg font-bold">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={nextMonth}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-gray-600 mb-2">
          {DAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 overflow-x-auto">
          {Array.from({ length: new Date(year, month, 1).getDay() }).map(
            (_, i) => (
              <div key={"empty-" + i} />
            )
          )}

          {daysArray.map((day) => {
            const dayTermine = getTermineForDay(day);
            return (
              <div
                key={day}
                className="border rounded p-1 cursor-pointer hover:bg-gray-100 min-h-[50px]"
                onClick={() => handleDayClick(day)}
              >
                <div className="font-semibold">{day}</div>

                {dayTermine.map((t) => (
                  <HoverCard key={t.id}>
                    <HoverCardTrigger asChild>
                      <div className="bg-blue-200 text-blue-800 rounded px-1 text-xs mt-1 truncate cursor-pointer">
                        {t.title}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      <p className="font-bold">{t.title}</p>
                      <p>
                        {t.start.slice(11, 16)} - {t.end.slice(11, 16)}
                      </p>
                      <p>Ort oder Beschreibung</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <CalendarModal
        day={selectedDay}
        termine={selectedDay ? getTermineForDay(selectedDay) : []}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
}
