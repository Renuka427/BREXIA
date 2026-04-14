import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('scans')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("History Fetch Error:", error);
    return new Response(JSON.stringify([]), { 
      status: 200, // Still return 200 with empty list to avoid crashes 
      headers: { "Content-Type": "application/json" }
    });
  }
}
