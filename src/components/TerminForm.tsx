"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatISO } from "date-fns";

import type { Termin } from "@/types/termin";

type FormData = Pick<Termin, "title" | "start" | "end" | "notes">;

interface TerminFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}

export default function TerminForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: TerminFormProps) {
  const [form, setForm] = useState<FormData>(
    defaultValues || {
      title: "",
      start: formatISO(new Date()).slice(0, 16),
      end: formatISO(new Date()).slice(0, 16),
      notes: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="termin-form-description"
      >
        <DialogHeader>
          <DialogTitle>Neuen Termin erstellen</DialogTitle>
          <DialogDescription id="termin-form-description" className="sr-only">
            Formular zum Erstellen eines neuen Termins
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start">Beginn</Label>
              <Input
                id="start"
                name="start"
                type="datetime-local"
                value={form.start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end">Ende</Label>
              <Input
                id="end"
                name="end"
                type="datetime-local"
                value={form.end}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit">Speichern</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
