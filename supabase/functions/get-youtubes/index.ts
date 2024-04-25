import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { page } = await req.json();

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  );

  const { data } = await supabaseClient.from("youtube").select().order("id", {
    ascending: false,
  }).range(0 + page * 2, 1 + page * 2);

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
