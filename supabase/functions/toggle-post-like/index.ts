import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization")!;
  const { postId } = await req.json();

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user } } = await supabaseClient.auth.getUser();

  const { data: isLikedData } = await supabaseClient.from("like").select()
    .match({
      user_id: user?.id,
      post_id: postId,
    }).single();

  if (isLikedData) {
    const { data } = await supabaseClient.from("like").update({
      is_liked: !isLikedData.is_liked,
    }).match({
      user_id: user?.id,
      post_id: postId,
    }).select().single();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } else {
    const { data } = await supabaseClient.from("like").insert({
      user_id: user?.id,
      post_id: postId,
      is_liked: true,
    }).select().single();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
