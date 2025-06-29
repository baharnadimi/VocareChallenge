"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import type { Termin } from "@/types/termin";

import {
  MdEvent,
  MdAccessTime,
  MdPerson,
  MdFolder,
  MdNote,
} from "react-icons/md";

interface Props {
  termine: Termin[];
  onClickTermin?: (termin: Termin) => void;
}

export default function Terminliste({ termine, onClickTermin }: Props) {
  const sorted = [...termine].sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-500">Keine Termine vorhanden.</p>
      ) : (
        sorted.map((termin) => (
          <HoverCard key={termin.id}>
            <HoverCardTrigger asChild>
              <Card
                onClick={() => onClickTermin?.(termin)}
                className="hover:shadow-md transition cursor-pointer"
              >
                <CardContent className="flex flex-col gap-2 p-4">
                  <div className="font-semibold text-blue-900">
                    {termin.title}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 gap-1">
                    <MdEvent className="inline text-lg" />
                    {new Date(termin.start).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                    <span className="mx-1">–</span>
                    <MdAccessTime className="inline text-lg" />
                    {termin.start.slice(11, 16)}–{termin.end.slice(11, 16)}
                  </div>

                  <div className="flex items-center text-sm text-gray-700 gap-1">
                    <MdPerson className="inline text-lg" />
                    {termin.patientName || "Unbekannt"}
                  </div>

                  <Badge variant="outline">
                    {termin.categoryLabel || "Keine Kategorie"}
                  </Badge>
                </CardContent>
              </Card>
            </HoverCardTrigger>

            <HoverCardContent className="w-72 text-sm space-y-1">
              <div className="font-medium text-blue-900">{termin.title}</div>
              <div className="flex items-center gap-1">
                <MdFolder />
                <strong>Kategorie:</strong>{" "}
                {termin.categoryLabel || "Keine Kategorie"}
              </div>
              <div className="flex items-center gap-1">
                <MdPerson />
                <strong>Patient: </strong> {termin.patientName || "Unbekannt"}
              </div>
              <div className="flex items-center gap-1">
                <MdAccessTime />
                <strong>Zeit:</strong> {termin.start.slice(11, 16)} –{" "}
                {termin.end.slice(11, 16)}
              </div>
              <div className="flex items-center gap-1 text-gray-600 whitespace-pre-line">
                <MdNote />
                {termin.notes || "Keine Notizen vorhanden."}
              </div>
            </HoverCardContent>
          </HoverCard>
        ))
      )}
    </div>
  );
}
