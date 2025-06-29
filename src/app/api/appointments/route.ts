import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const patient = url.searchParams.get("patient");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    let query = supabase.from("appointments").select("*");

    if (category) query = query.eq("category", category);
    if (patient) query = query.eq("patient", patient);
    if (startDate) query = query.gte("start", startDate);
    if (endDate) query = query.lte("end", endDate);

    const { data, error } = await query.limit(50);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: unknown) {
    let message = "Unbekannter Fehler";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
