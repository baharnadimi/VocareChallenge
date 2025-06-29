import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase.from("categories").select("*");

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
