"use client";

import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import type { Termin } from "@/types/termin";

interface WeekViewProps {
  termine: Termin[];
}

function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

function isSameDay(compareDate: Date, referenceDate: Date) {
  return compareDate.toDateString() === referenceDate.toDateString();
}

export default function WeekView({ termine }: WeekViewProps) {
  const today = new Date();
  const startOfWeek = getStartOfWeek(new Date());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  function getAppointmentsForDay(day: Date) {
    const dateStr = day.toISOString().slice(0, 10);
    return termine.filter((a) => a.start.startsWith(dateStr));
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 min-w-[600px]">
        {days.map((day) => {
          const appts = getAppointmentsForDay(day);
          return (
            <div
              key={day.toISOString()}
              className={`border rounded p-2 min-h-[100px] ${
                isSameDay(day, today) ? "bg-yellow-50" : ""
              }`}
            >
              <div className="font-semibold text-sm mb-1">
                {day.toLocaleDateString("de-DE", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>

              {appts.map((a) => (
                <HoverCard key={a.id}>
                  <HoverCardTrigger asChild>
                    <div className="bg-blue-200 text-blue-800 rounded px-1 text-xs mt-1 truncate cursor-pointer">
                      {a.title}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    <p className="font-bold">{a.title}</p>
                    <p>
                      {a.start.slice(11, 16)} - {a.end.slice(11, 16)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Weitere Informationen
                    </p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
