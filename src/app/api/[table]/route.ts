import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const { table } = await params;

    const allowedTables = ["categories", "patients", "appointments"];
    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    if (table === "appointments") {
      const url = new URL(req.url);
      const category = url.searchParams.get("category");
      const patient = url.searchParams.get("patient");
      const startDate = url.searchParams.get("startDate");
      const endDate = url.searchParams.get("endDate");

      let query = supabase.from(table).select("*");

      if (category) query = query.eq("category", category);
      if (patient) query = query.eq("patient", patient);
      if (startDate) query = query.gte("start", startDate);
      if (endDate) query = query.lte("end", endDate);

      const { data, error } = await query.limit(50);

      if (error) throw error;

      return NextResponse.json(data ?? []);
    } else {
      const { data, error } = await supabase.from(table).select("*");

      if (error) throw error;

      return NextResponse.json(data ?? []);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
