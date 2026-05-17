export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { broadcastRoom, sendToClient } from "../../_store";

export async function POST(request, { params }) {
  const { code } = await params;
  const roomCode = String(code ?? "");
  if (!roomCode) return Response.json({ ok: false, error: "Missing room code" }, { status: 400 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const from = typeof body?.from === "string" ? body.from : "";
  const to = typeof body?.to === "string" ? body.to : "";
  const type = typeof body?.type === "string" ? body.type : "";
  const data = body?.data ?? null;

  if (!from) return Response.json({ ok: false, error: "Missing 'from'" }, { status: 400 });
  if (!type) return Response.json({ ok: false, error: "Missing 'type'" }, { status: 400 });

  const payload = { type, from, data };

  if (to) {
    const delivered = sendToClient(roomCode, to, payload);
    return Response.json({ ok: true, delivered });
  }

  broadcastRoom(roomCode, payload, from);
  return Response.json({ ok: true, delivered: true });
}

