export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { addSseClient, broadcastRoom, listPeers, removeSseClient } from "../../_store";

function encode(encoder, payload) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export async function GET(request, { params }) {
  const { code } = await params;
  const roomCode = String(code ?? "");
  const clientId = request.nextUrl.searchParams.get("clientId") ?? "";

  if (!roomCode) return new Response("Missing room code", { status: 400 });
  if (!clientId) return new Response("Missing clientId", { status: 400 });

  const encoder = new TextEncoder();
  let closed = false;
  let pingTimer = null;

  const stream = new ReadableStream({
    start(controller) {
      addSseClient(roomCode, clientId, controller, encoder);

      controller.enqueue(encoder.encode(": connected\n\n"));
      controller.enqueue(encode(encoder, { type: "hello", clientId, peers: listPeers(roomCode, clientId) }));
      broadcastRoom(roomCode, { type: "peer-join", peerId: clientId }, clientId);

      pingTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping ${Date.now()}\n\n`));
        } catch {
          // ignore
        }
      }, 15000);

      request.signal.addEventListener("abort", () => {
        if (closed) return;
        closed = true;
        if (pingTimer) clearInterval(pingTimer);
        removeSseClient(roomCode, clientId);
        broadcastRoom(roomCode, { type: "peer-leave", peerId: clientId }, clientId);
        try {
          controller.close();
        } catch {
          // ignore
        }
      });
    },
    cancel() {
      if (closed) return;
      closed = true;
      if (pingTimer) clearInterval(pingTimer);
      removeSseClient(roomCode, clientId);
      broadcastRoom(roomCode, { type: "peer-leave", peerId: clientId }, clientId);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

