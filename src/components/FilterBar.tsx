"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import type { Category } from "@/types/category";
import type { Patient } from "@/types/patient";
import type { Filters } from "@/types/filters";

type Props = {
  onFilterChange: (filters: Partial<Filters>) => void;
};

export default function FilterBar({ onFilterChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [filters, setFilters] = useState<Filters>({
    category: "all",
    patient: "all",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((response) => {
        if (Array.isArray(response)) {
          setCategories(response);
        } else if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Unexpected categories response:", response);
          setCategories([]);
        }
      });

    fetch("/api/patients")
      .then((res) => res.json())
      .then((response) => {
        if (Array.isArray(response)) {
          setPatients(response);
        } else if (response.data && Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          console.error("Unexpected patients response:", response);
          setPatients([]);
        }
      });
  }, []);

  useEffect(() => {
    const cleanFilters: Partial<Filters> = {};
    if (filters.category && filters.category !== "all") {
      cleanFilters.category = filters.category;
    }
    if (filters.patient && filters.patient !== "all") {
      cleanFilters.patient = filters.patient;
    }
    if (filters.startDate) cleanFilters.startDate = filters.startDate;
    if (filters.endDate) cleanFilters.endDate = filters.endDate;

    onFilterChange(cleanFilters);
  }, [filters, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-4 p-4 border-b items-center">
      <Select
        onValueChange={(val) => setFilters((f) => ({ ...f, category: val }))}
        value={filters.category}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Alle Kategorien" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Kategorien</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(val) => setFilters((f) => ({ ...f, patient: val }))}
        value={filters.patient}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Alle Patienten" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Patienten</SelectItem>
          {patients.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.firstname} {p.lastname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left"
          >
            {filters.startDate
              ? format(new Date(filters.startDate), "dd.MM.yyyy")
              : "Startdatum"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={
              filters.startDate ? new Date(filters.startDate) : undefined
            }
            onSelect={(date) =>
              setFilters((f) => ({
                ...f,
                startDate: date ? date.toISOString().split("T")[0] : "",
              }))
            }
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left"
          >
            {filters.endDate
              ? format(new Date(filters.endDate), "dd.MM.yyyy")
              : "Enddatum"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={filters.endDate ? new Date(filters.endDate) : undefined}
            onSelect={(date) =>
              setFilters((f) => ({
                ...f,
                endDate: date ? date.toISOString().split("T")[0] : "",
              }))
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
