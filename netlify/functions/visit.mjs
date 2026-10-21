// Total kunjungan Z10 · Netlify Functions + Netlify Blobs
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("z10-tabung");
  let total = parseInt((await store.get("visits")) || "0", 10) || 0;
  if (req.method === "POST") {
    total += 1;
    await store.set("visits", String(total));
  }
  return new Response(JSON.stringify({ total }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
};

export const config = { path: "/api/visit" };
