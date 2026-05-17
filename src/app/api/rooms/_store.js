const STORE_KEY = "__codemeet_room_store__";

function getStore() {
  if (!globalThis[STORE_KEY]) {
    globalThis[STORE_KEY] = { rooms: new Map() };
  }
  return globalThis[STORE_KEY];
}

function getOrCreateRoom(code) {
  const store = getStore();
  const key = String(code ?? "");
  if (!store.rooms.has(key)) {
    store.rooms.set(key, { clients: new Map() });
  }
  return store.rooms.get(key);
}

function getRoom(code) {
  const store = getStore();
  return store.rooms.get(String(code ?? "")) ?? null;
}

function deleteRoomIfEmpty(code) {
  const store = getStore();
  const key = String(code ?? "");
  const room = store.rooms.get(key);
  if (!room) return;
  if (room.clients.size === 0) store.rooms.delete(key);
}

function encodeSse(encoder, payload) {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function trySend(client, payload) {
  try {
    client.controller.enqueue(encodeSse(client.encoder, payload));
    return true;
  } catch {
    return false;
  }
}

export function listPeers(code, exceptId) {
  const room = getRoom(code);
  if (!room) return [];
  return [...room.clients.keys()].filter((id) => id !== exceptId);
}

export function addSseClient(code, clientId, controller, encoder) {
  const room = getOrCreateRoom(code);
  room.clients.set(clientId, { controller, encoder });
}

export function removeSseClient(code, clientId) {
  const room = getRoom(code);
  if (!room) return 0;
  room.clients.delete(clientId);
  const remaining = room.clients.size;
  deleteRoomIfEmpty(code);
  return remaining;
}

export function broadcastRoom(code, payload, exceptId) {
  const room = getRoom(code);
  if (!room) return;
  for (const [id, client] of room.clients.entries()) {
    if (id === exceptId) continue;
    const ok = trySend(client, payload);
    if (!ok) room.clients.delete(id);
  }
  deleteRoomIfEmpty(code);
}

export function sendToClient(code, targetId, payload) {
  const room = getRoom(code);
  if (!room) return false;
  const client = room.clients.get(targetId);
  if (!client) return false;
  const ok = trySend(client, payload);
  if (!ok) room.clients.delete(targetId);
  deleteRoomIfEmpty(code);
  return ok;
}

