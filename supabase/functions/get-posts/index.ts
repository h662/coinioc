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

  const { data } = await supabaseClient.from("post").select(
    "*, profile!inner(*)",
  ).order("id", {
    ascending: false,
  }).range(0 + page * 2, 1 + page * 2);

  const commentCounts: Record<number, number> = {};
  for (const post of data) {
    const { count } = await supabaseClient.from("comment").select("", {
      count: "exact",
    }).eq("post_id", post.id);
    commentCounts[post.id] = count;
  }

  const postsWithCommentCounts = data.map((post: { id: number }) => ({
    ...post,
    comment_count: commentCounts[post.id] ?? 0, // Default to 0 if count is undefined
  }));

  return new Response(JSON.stringify(postsWithCommentCounts), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
