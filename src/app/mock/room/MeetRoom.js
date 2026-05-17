"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  Code2,
  Copy,
  MessageSquare,
  Mic,
  MicOff,
  PenLine,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import CodeEditorPanel from "./CodeEditorPanel";
import WhiteboardCanvas from "./WhiteboardCanvas";

function VideoTile({ stream, label, muted = false, noVideo = false, badge, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.srcObject = stream ?? null;
  }, [stream]);

  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden bg-[#0d1225] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1200px circle at 20% 0%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(800px circle at 90% 20%, rgba(34,211,238,0.18), transparent 55%)",
        }}
      />

      {stream && !noVideo ? (
        <video ref={ref} autoPlay playsInline muted={muted} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-extrabold text-slate-200">
              {(label?.[0] ?? "?").toUpperCase()}
            </div>
            <div className="text-xs text-slate-500">Camera off</div>
          </div>
        </div>
      )}

      <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur text-xs font-semibold text-slate-100 truncate">
            {label}
          </div>
          {badge && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-[11px] font-semibold">
              {badge.icon}
              {badge.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ControlBtn({ onClick, icon: Icon, active, danger, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 w-12 rounded-full flex items-center justify-center border transition ${
        danger
          ? "bg-red-500/15 border-red-500/25 text-red-100 hover:bg-red-500/20"
          : active
            ? "bg-indigo-500/15 border-indigo-500/25 text-indigo-100 hover:bg-indigo-500/20"
            : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
      }`}
      aria-label={label}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

function DockPanel({ mode, onClose, onSwitch, className = "" }) {
  const isWhiteboard = mode === "whiteboard";
  return (
    <div
      className={`h-full min-h-0 rounded-3xl overflow-hidden bg-[#0d1225] border border-white/10 shadow-2xl flex flex-col ${className}`}
    >
      <div className="shrink-0 h-12 px-3 flex items-center justify-between gap-2 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => onSwitch("whiteboard")}
              className={`h-9 px-3 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                isWhiteboard ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
              title="Whiteboard"
            >
              <PenLine className="w-4 h-4" />
              Whiteboard
            </button>
            <button
              type="button"
              onClick={() => onSwitch("code")}
              className={`h-9 px-3 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                !isWhiteboard ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
              title="Code editor"
            >
              <Code2 className="w-4 h-4" />
              Code
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-300 transition flex items-center justify-center"
          aria-label="Close panel"
          title="Close"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {isWhiteboard ? <WhiteboardCanvas /> : <CodeEditorPanel />}
      </div>
    </div>
  );
}

function StageShell({ title, subtitle, icon, onClose, children }) {
  return (
    <div className="h-full min-h-0 rounded-3xl overflow-hidden bg-[#0d1225] border border-white/10 shadow-2xl flex flex-col">
      <div className="shrink-0 h-12 px-3 flex items-center justify-between gap-2 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
        <div className="min-w-0 flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-100 truncate">{title}</div>
            {subtitle ? <div className="text-[11px] text-slate-500 truncate">{subtitle}</div> : null}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-300 transition flex items-center justify-center"
          aria-label="Close stage"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export default function MeetRoom() {
  const params = useSearchParams();
  const router = useRouter();
  const roomCode = params.get("code") ?? "unknown";

  const peersRef = useRef(new Map());

  const [clientId] = useState(() => {
    if (typeof window === "undefined") return null;
    const existing = window.sessionStorage.getItem("codemeet-client-id");
    const id = existing || (crypto?.randomUUID?.() ?? `c_${Math.random().toString(36).slice(2, 10)}`);
    if (!existing) window.sessionStorage.setItem("codemeet-client-id", id);
    return id;
  });
  const [remotePeers, setRemotePeers] = useState([]); // { id, stream }
  const [chatOpen, setChatOpen] = useState(false);
  const [chatUnread, setChatUnread] = useState(0);
  const [chatDraft, setChatDraft] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // { id, from, text, ts }
  const chatOpenRef = useRef(false);

  const [localStream, setLocalStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenStream, setScreenStream] = useState(null);
  const [stage, setStage] = useState(null); // screen | whiteboard | code | null
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let stream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((s) => {
        stream = s;
        setLocalStream(s);
      })
      .catch(() => setLocalStream(null));

    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => {
    chatOpenRef.current = chatOpen;
  }, [chatOpen]);

  const postToRoom = useCallback(
    async ({ to = "", type, data }) => {
      if (!clientId || !roomCode) return;
      try {
        await fetch(`/api/rooms/${encodeURIComponent(roomCode)}/signal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: clientId, to, type, data }),
        });
      } catch {
        // ignore
      }
    },
    [clientId, roomCode]
  );

  const closePeer = useCallback((peerId) => {
    const peer = peersRef.current.get(peerId);
    if (!peer) return;
    try {
      peer.pc.onicecandidate = null;
      peer.pc.ontrack = null;
      peer.pc.onnegotiationneeded = null;
      peer.pc.close();
    } catch {
      // ignore
    }
    peersRef.current.delete(peerId);
    setRemotePeers((cur) => cur.filter((p) => p.id !== peerId));
  }, []);

  const ensurePeer = useCallback(
    (peerId) => {
      if (!peerId || peerId === clientId) return null;
      if (peersRef.current.has(peerId)) return peersRef.current.get(peerId);

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      const polite = String(clientId ?? "").localeCompare(String(peerId)) < 0;
      const peer = {
        pc,
        peerId,
        polite,
        makingOffer: false,
        ignoreOffer: false,
        stream: null,
      };

      pc.onicecandidate = ({ candidate }) => {
        if (candidate) postToRoom({ to: peerId, type: "webrtc", data: { candidate } });
      };

      pc.ontrack = (event) => {
        const stream = event.streams?.[0];
        if (stream) {
          peer.stream = stream;
          setRemotePeers((cur) => {
            const next = cur.filter((p) => p.id !== peerId);
            next.push({ id: peerId, stream });
            return next;
          });
          return;
        }

        const fallback = peer.stream ?? new MediaStream();
        fallback.addTrack(event.track);
        peer.stream = fallback;
        setRemotePeers((cur) => {
          const next = cur.filter((p) => p.id !== peerId);
          next.push({ id: peerId, stream: fallback });
          return next;
        });
      };

      pc.onnegotiationneeded = async () => {
        try {
          peer.makingOffer = true;
          await pc.setLocalDescription(await pc.createOffer());
          postToRoom({ to: peerId, type: "webrtc", data: { description: pc.localDescription } });
        } catch {
          // ignore
        } finally {
          peer.makingOffer = false;
        }
      };

      if (localStream) {
        localStream.getAudioTracks().forEach((track) => pc.addTrack(track, localStream));
      }

      const activeVideoTrack = screenStream?.getVideoTracks?.()[0] ?? localStream?.getVideoTracks?.()[0] ?? null;
      const activeVideoStream = screenStream ?? localStream;
      if (activeVideoTrack && activeVideoStream) {
        pc.addTrack(activeVideoTrack, activeVideoStream);
      }

      peersRef.current.set(peerId, peer);
      return peer;
    },
    [clientId, localStream, postToRoom, screenStream]
  );

  useEffect(() => {
    if (!localStream && !screenStream) return;
    const activeVideoTrack = screenStream?.getVideoTracks?.()[0] ?? localStream?.getVideoTracks?.()[0] ?? null;
    const activeVideoStream = screenStream ?? localStream ?? null;
    for (const peer of peersRef.current.values()) {
      const senders = peer.pc.getSenders();

      if (localStream) {
        for (const track of localStream.getAudioTracks()) {
          const existing = senders.find((s) => s.track?.kind === track.kind);
          if (!existing) peer.pc.addTrack(track, localStream);
        }
      }

      if (activeVideoTrack && activeVideoStream) {
        const sender = senders.find((s) => s.track?.kind === "video");
        if (!sender) peer.pc.addTrack(activeVideoTrack, activeVideoStream);
        else if (sender.track !== activeVideoTrack) sender.replaceTrack(activeVideoTrack);
      }
    }
  }, [localStream, screenStream]);

  useEffect(() => {
    if (!clientId || !roomCode) return;

    const url = `/api/rooms/${encodeURIComponent(roomCode)}/events?clientId=${encodeURIComponent(clientId)}`;
    const es = new EventSource(url);

    es.onmessage = async (event) => {
      let msg;
      try {
        msg = JSON.parse(event.data);
      } catch {
        return;
      }

      if (msg.type === "hello") {
        const peers = Array.isArray(msg.peers) ? msg.peers : [];
        peers.forEach((pid) => ensurePeer(String(pid)));
        return;
      }

      if (msg.type === "peer-join") {
        ensurePeer(String(msg.peerId ?? ""));
        return;
      }

      if (msg.type === "peer-leave") {
        closePeer(String(msg.peerId ?? ""));
        return;
      }

      if (msg.type === "webrtc") {
        const from = String(msg.from ?? "");
        const peer = ensurePeer(from);
        if (!peer) return;

        const description = msg.data?.description ?? null;
        const candidate = msg.data?.candidate ?? null;

        try {
          if (description) {
            const offerCollision =
              description.type === "offer" && (peer.makingOffer || peer.pc.signalingState !== "stable");
            peer.ignoreOffer = !peer.polite && offerCollision;
            if (peer.ignoreOffer) return;

            await peer.pc.setRemoteDescription(description);
            if (description.type === "offer") {
              await peer.pc.setLocalDescription(await peer.pc.createAnswer());
              postToRoom({ to: from, type: "webrtc", data: { description: peer.pc.localDescription } });
            }
            return;
          }

          if (candidate) {
            try {
              await peer.pc.addIceCandidate(candidate);
            } catch {
              if (!peer.ignoreOffer) throw new Error("addIceCandidate failed");
            }
          }
        } catch {
          // ignore
        }
        return;
      }

      if (msg.type === "chat") {
        const text = String(msg.data?.text ?? "").trim();
        if (!text) return;
        const ts = Number(msg.data?.ts ?? Date.now());
        setChatMessages((cur) => [...cur, { id: `${ts}_${Math.random().toString(36).slice(2, 8)}`, from: msg.from, text, ts }]);
        if (!chatOpenRef.current) setChatUnread((n) => n + 1);
      }
    };

    es.onerror = () => {
      // connection will auto-retry
    };

    return () => {
      es.close();
    };
  }, [clientId, closePeer, ensurePeer, postToRoom, roomCode]);

  useEffect(() => {
    const peersAtMount = peersRef.current;
    return () => {
      for (const peerId of peersAtMount.keys()) closePeer(peerId);
    };
  }, [closePeer]);

  const toggleMic = useCallback(() => {
    localStream?.getAudioTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setMicOn((v) => !v);
  }, [localStream]);

  const toggleCam = useCallback(() => {
    localStream?.getVideoTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setCamOn((v) => !v);
  }, [localStream]);

  const toggleScreen = useCallback(async () => {
    if (screenStream) {
      screenStream.getTracks().forEach((t) => t.stop());
      setScreenStream(null);
      setStage((cur) => (cur === "screen" ? null : cur));
      return;
    }

    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const track = s.getVideoTracks?.()[0];
      track?.addEventListener?.("ended", () => {
        s.getTracks().forEach((t) => t.stop());
        setScreenStream(null);
        setStage((cur) => (cur === "screen" ? null : cur));
      });
      setScreenStream(s);
      setStage("screen");
    } catch {
      // user canceled
    }
  }, [screenStream]);

  function toggleStage(next) {
    setStage((cur) => (cur === next ? null : next));
  }

  function endCall() {
    for (const peerId of Array.from(peersRef.current.keys())) closePeer(peerId);
    localStream?.getTracks().forEach((t) => t.stop());
    screenStream?.getTracks().forEach((t) => t.stop());
    setScreenStream(null);
    setStage(null);
    router.push("/mock");
  }

  async function copyLink() {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  const stageMode = stage;
  const isStageView = stageMode !== null;

  const sharingTile = useMemo(() => {
    if (!screenStream) return null;
    return {
      id: "screen-share",
      label: "You (screen)",
      stream: screenStream,
      muted: true,
      noVideo: false,
      badge: { icon: <ScreenShare className="w-3.5 h-3.5" />, text: "Sharing" },
    };
  }, [screenStream]);

  const participants = useMemo(() => {
    const list = [
      {
        id: "you",
        label: "You",
        stream: localStream,
        muted: true,
        noVideo: !camOn,
        badge: micOn ? null : { icon: <MicOff className="w-3.5 h-3.5" />, text: "Muted" },
      },
      ...remotePeers.map((p) => ({
        id: p.id,
        label: `Guest ${String(p.id).slice(0, 4).toUpperCase()}`,
        stream: p.stream,
        muted: false,
        noVideo: false,
        badge: null,
      })),
    ];
    return list;
  }, [camOn, localStream, micOn, remotePeers]);

  const gridTiles = useMemo(() => {
    if (!sharingTile || stageMode !== null) return participants;
    return [sharingTile, ...participants];
  }, [participants, sharingTile, stageMode]);

  const filmstripTiles = useMemo(() => {
    if (!sharingTile) return participants;
    if (stageMode === "screen") return participants;
    return [sharingTile, ...participants];
  }, [participants, sharingTile, stageMode]);

  const sendChat = useCallback(async () => {
    const text = chatDraft.trim();
    if (!text) return;
    const ts = Date.now();
    setChatMessages((cur) => [...cur, { id: `${ts}_${Math.random().toString(36).slice(2, 8)}`, from: clientId, text, ts }]);
    setChatDraft("");
    await postToRoom({ type: "chat", data: { text, ts } });
  }, [chatDraft, clientId, postToRoom]);

  return (
    <div className="h-dvh bg-[#080c18] text-slate-100 flex flex-col overflow-hidden font-sans">
      <div className="flex-1 min-h-0 flex flex-col p-3 sm:p-4 gap-3">
        <div className="shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-slate-200">Interview</span>
            <span className="text-xs text-slate-700">•</span>
            <span className="text-xs font-mono text-slate-400 truncate">{roomCode}</span>
          </div>

          <button
            type="button"
            onClick={copyLink}
              className="h-9 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition text-slate-200 text-xs font-semibold flex items-center gap-2"
              title="Copy invite link"
            >
              {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Invite"}</span>
            </button>
          </div>

        <div className="flex-1 min-h-0">
          {isStageView ? (
            <div className="h-full min-h-0 flex flex-col md:flex-row gap-3">
              <div className="flex-1 min-h-0">
                {stageMode === "whiteboard" || stageMode === "code" ? (
                  <DockPanel
                    mode={stageMode}
                    onClose={() => setStage(null)}
                    onSwitch={setStage}
                  />
                ) : (
                  <StageShell
                    title={screenStream ? "Presenting your screen" : "Stage"}
                    subtitle={screenStream ? "Your screen is shared with everyone" : "No screen share active"}
                    icon={<ScreenShare className="w-4 h-4 text-indigo-200" />}
                    onClose={screenStream ? toggleScreen : () => setStage(null)}
                  >
                    <div className="h-full min-h-0 p-3">
                      <VideoTile
                        stream={screenStream}
                        label={screenStream ? "You (presenting)" : "Screen share"}
                        muted
                        noVideo={!screenStream}
                        badge={screenStream ? { icon: <ScreenShare className="w-3.5 h-3.5" />, text: "Sharing" } : null}
                        className="h-full aspect-auto"
                      />
                    </div>
                  </StageShell>
                )}
              </div>

              <aside className="md:w-[320px] md:max-w-[38vw] shrink-0 min-h-0">
                <div className="h-full min-h-0 rounded-3xl overflow-hidden bg-[#0d1225] border border-white/10 shadow-2xl flex flex-col">
                  <div className="shrink-0 h-12 px-3 flex items-center justify-between gap-2 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
                    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
                      <button
                        type="button"
                        onClick={() => setChatOpen(false)}
                        className={`h-9 px-3 rounded-xl text-xs font-semibold transition ${
                          !chatOpen ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
                        }`}
                        title="Participants"
                      >
                        People
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChatUnread(0);
                          setChatOpen(true);
                        }}
                        className={`h-9 px-3 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                          chatOpen ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-white/5"
                        }`}
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                        {chatUnread > 0 ? (
                          <span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-red-500/20 text-red-200 text-[11px] font-bold tabular-nums">
                            {chatUnread}
                          </span>
                        ) : null}
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 tabular-nums">{filmstripTiles.length}</div>
                  </div>

                  <div className="flex-1 min-h-0 p-3">
                    {chatOpen ? (
                      <div className="h-full min-h-0 flex flex-col">
                        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-2 pr-1">
                          {chatMessages.length === 0 ? (
                            <div className="h-full min-h-0 flex items-center justify-center text-xs text-slate-500">
                              No messages yet
                            </div>
                          ) : (
                            chatMessages.map((m) => {
                              const mine = m.from === clientId;
                              return (
                                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed border ${
                                    mine
                                      ? "bg-indigo-600/15 border-indigo-500/25 text-indigo-50"
                                      : "bg-white/5 border-white/10 text-slate-200"
                                  }`}>
                                    {m.text}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                        <form
                          className="shrink-0 pt-3"
                          onSubmit={(e) => {
                            e.preventDefault();
                            sendChat();
                          }}
                        >
                          <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
                            <input
                              value={chatDraft}
                              onChange={(e) => setChatDraft(e.target.value)}
                              placeholder="Send a message"
                              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                              aria-label="Chat message"
                            />
                            <button
                              type="submit"
                              disabled={!chatDraft.trim()}
                              className={`h-9 px-3 rounded-xl text-xs font-semibold transition ${
                                chatDraft.trim()
                                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                                  : "bg-white/5 text-slate-500 cursor-not-allowed"
                              }`}
                              title="Send"
                            >
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="h-full min-h-0 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide">
                        {filmstripTiles.map((p) => (
                          <div key={p.id} className="flex-none w-[280px] md:w-full">
                            <VideoTile
                              stream={p.stream}
                              label={p.label}
                              muted={p.muted}
                              noVideo={p.noVideo}
                              badge={p.badge}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="h-full min-h-0 flex flex-col md:flex-row gap-3">
              <div className="flex-1 min-h-0">
                <div
                  className="h-full min-h-0 grid gap-3 place-content-start"
                  style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
                >
                  {gridTiles.map((p) => (
                    <VideoTile
                      key={p.id}
                      stream={p.stream}
                      label={p.label}
                      muted={p.muted}
                      noVideo={p.noVideo}
                      badge={p.badge}
                    />
                  ))}
                </div>
              </div>

              {chatOpen ? (
                <aside className="md:w-[320px] md:max-w-[38vw] shrink-0 min-h-0">
                  <div className="h-full min-h-0 rounded-3xl overflow-hidden bg-[#0d1225] border border-white/10 shadow-2xl flex flex-col">
                    <div className="shrink-0 h-12 px-3 flex items-center justify-between gap-2 border-b border-white/5 bg-[#0d1225]/80 backdrop-blur">
                      <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-slate-300" />
                        Chat
                      </div>
                      <button
                        type="button"
                        onClick={() => setChatOpen(false)}
                        className="h-9 w-9 rounded-xl hover:bg-white/5 text-slate-300 transition flex items-center justify-center"
                        aria-label="Close chat"
                        title="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 p-3 flex flex-col">
                      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-2 pr-1">
                        {chatMessages.length === 0 ? (
                          <div className="h-full min-h-0 flex items-center justify-center text-xs text-slate-500">
                            No messages yet
                          </div>
                        ) : (
                          chatMessages.map((m) => {
                            const mine = m.from === clientId;
                            return (
                              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed border ${
                                  mine
                                    ? "bg-indigo-600/15 border-indigo-500/25 text-indigo-50"
                                    : "bg-white/5 border-white/10 text-slate-200"
                                }`}>
                                  {m.text}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <form
                        className="shrink-0 pt-3"
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendChat();
                        }}
                      >
                        <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
                          <input
                            value={chatDraft}
                            onChange={(e) => setChatDraft(e.target.value)}
                            placeholder="Send a message"
                            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                            aria-label="Chat message"
                          />
                          <button
                            type="submit"
                            disabled={!chatDraft.trim()}
                            className={`h-9 px-3 rounded-xl text-xs font-semibold transition ${
                              chatDraft.trim()
                                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                                : "bg-white/5 text-slate-500 cursor-not-allowed"
                            }`}
                            title="Send"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </aside>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <footer className="shrink-0 px-3 sm:px-4 pb-3">
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#0d1225]/80 backdrop-blur border border-white/10 px-4 py-3 flex items-center justify-center gap-2">
          <ControlBtn
            onClick={toggleMic}
            icon={micOn ? Mic : MicOff}
            active={micOn}
            danger={!micOn}
            label={micOn ? "Mute microphone" : "Unmute microphone"}
          />
          <ControlBtn
            onClick={toggleCam}
            icon={camOn ? Video : VideoOff}
            active={camOn}
            danger={!camOn}
            label={camOn ? "Turn off camera" : "Turn on camera"}
          />
          <ControlBtn
            onClick={toggleScreen}
            icon={screenStream ? ScreenShareOff : ScreenShare}
            active={!!screenStream}
            danger={false}
            label={screenStream ? "Stop sharing screen" : "Share screen"}
          />
          <ControlBtn
            onClick={() => toggleStage("whiteboard")}
            icon={PenLine}
            active={stageMode === "whiteboard"}
            danger={false}
            label="Open whiteboard"
          />
          <ControlBtn
            onClick={() => toggleStage("code")}
            icon={Code2}
            active={stageMode === "code"}
            danger={false}
            label="Open code editor"
          />
          <ControlBtn
            onClick={() =>
              setChatOpen((v) => {
                const next = !v;
                if (next) setChatUnread(0);
                return next;
              })
            }
            icon={MessageSquare}
            active={chatOpen}
            danger={false}
            label="Open chat"
          />

          <button
            type="button"
            onClick={endCall}
            className="ml-2 h-12 px-5 rounded-full bg-red-600 hover:bg-red-500 transition text-white font-semibold flex items-center gap-2 shadow-[0_0_16px_rgba(239,68,68,0.35)]"
            title="End call"
            aria-label="End call"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="hidden sm:inline">End</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
