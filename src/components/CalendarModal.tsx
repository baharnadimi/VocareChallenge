"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import type { Termin } from "@/types/termin";

interface CalendarModalProps {
  day: number | null;
  termine: Termin[];
  onClose: () => void;
}

export function CalendarModal({ day, termine, onClose }: CalendarModalProps) {
  return (
    <Dialog open={!!day} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-lg"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Details für den {day}</DialogTitle>
          <DialogClose className="absolute right-4 top-4" />
        </DialogHeader>

        <DialogDescription id="dialog-description">
          {termine.length === 0 ? "Keine Termine" : "Termine:"}
        </DialogDescription>

        {termine.length > 0 && (
          <ul className="list-disc pl-5 mt-2">
            {termine.map((t) => (
              <li key={t.id}>
                <strong>{t.title}</strong> ({t.start.slice(11, 16)} -{" "}
                {t.end.slice(11, 16)})
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
