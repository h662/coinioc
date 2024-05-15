import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";
import * as uuid from "https://deno.land/std@0.224.0/uuid/mod.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization")!;
  const formData = await req.formData();

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user } } = await supabaseClient.auth.getUser();

  const { data: existProfileData } = await supabaseClient.from("profile")
    .select().eq("id", user?.id).single();

  const file = formData.get("file") as File;

  const fileName = file.name;
  const fileExtension = fileName.split(".").pop();
  const newFileName = `${uuid.v1.generate()}.${fileExtension}`;

  const { error } = await supabaseClient.storage.from("avartars").upload(
    newFileName,
    file,
  );

  await supabaseClient.storage.from("avartars").remove([
    existProfileData.avartar,
  ]);

  if (error) {
    return new Response(JSON.stringify(existProfileData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } else {
    const { data: newProfileData } = await supabaseClient.from("profile")
      .update({
        avartar: newFileName,
      }).eq(
        "id",
        user?.id,
      ).select().single();

    return new Response(JSON.stringify(newProfileData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
