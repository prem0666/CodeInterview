"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check, Code2, Copy, MessageSquare, Mic, MicOff, PenLine,
  PhoneOff, ScreenShare, ScreenShareOff, Video, VideoOff,
  Users, Send, X, ChevronLeft,
} from "lucide-react";
import CodeEditorPanel from "./CodeEditorPanel";
import WhiteboardCanvas from "./WhiteboardCanvas";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "turn:openrelay.metered.ca:80",  username: "openrelayproject", credential: "openrelayproject" },
  { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
  { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" },
];

// ── Video Tile ───────────────────────────────────────────────────────────────
function VideoTile({ stream, label, muted, noVideo }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted  = !!muted;   // must set via property, not attribute
    el.srcObject = stream ?? null;
    if (stream) el.play().catch(() => {});
  }, [stream, muted]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1a1d2e] flex items-center justify-center">
      {/* always render video element — hide when no stream/noVideo */}
      <video
        ref={ref}
        autoPlay
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${
          stream && !noVideo ? "" : "hidden"
        }`}
      />
      {(!stream || noVideo) && (
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">
            {(label ?? "?").slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs text-slate-500">Camera off</span>
        </div>
      )}
      <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
        <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur px-2 py-0.5 rounded-full truncate">
          {label}
        </span>
        {muted && (
          <span className="w-6 h-6 bg-black/60 backdrop-blur rounded-full flex items-center justify-center shrink-0">
            <MicOff className="w-3 h-3 text-red-400" />
          </span>
        )}
      </div>
    </div>
  );
}

// ── Grid: fixed height tiles ─────────────────────────────────────────────────
function VideoGrid({ participants, filmstrip = false }) {
  const n = participants.length;

  if (filmstrip) {
    return (
      <div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-hide h-full">
        {participants.map(p => (
          <div key={p.id} className="shrink-0 w-full" style={{ height: 110 }}>
            <VideoTile {...p} />
          </div>
        ))}
      </div>
    );
  }

  // Calculate rows/cols for best fit
  const cols = n <= 1 ? 1 : n <= 2 ? 2 : n <= 4 ? 2 : n <= 6 ? 3 : 3;
  const rows = Math.ceil(n / cols);

  return (
    <div className="h-full p-2 flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex-1 flex gap-2 min-h-0">
          {participants.slice(r * cols, r * cols + cols).map(p => (
            <div key={p.id} className="flex-1 min-w-0">
              <VideoTile {...p} />
            </div>
          ))}
          {/* fill empty cells in last row */}
          {r === rows - 1 && Array.from({ length: cols - (n % cols || cols) }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 min-w-0" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Icon Button ───────────────────────────────────────────────────────────────
function IconBtn({ onClick, icon: Icon, active = true, danger = false, label, badge }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className="flex flex-col items-center gap-1">
      <div className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all
        ${danger ? "bg-red-600 hover:bg-red-500 text-white"
          : active ? "bg-white/15 hover:bg-white/25 text-white"
          : "bg-[#252836] hover:bg-[#2e3249] text-slate-400"}`}>
        <Icon className="w-5 h-5" />
        {badge > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-slate-500 hidden sm:block leading-none">{label}</span>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MeetRoom() {
  const params   = useSearchParams();
  const router   = useRouter();
  const roomCode = params.get("code") ?? "unknown";

  const peersRef = useRef(new Map());

  const [clientId] = useState(() => {
    if (typeof window === "undefined") return "ssr";
    const ex = sessionStorage.getItem("codemeet-cid");
    const id = ex || crypto.randomUUID();
    if (!ex) sessionStorage.setItem("codemeet-cid", id);
    return id;
  });

  const [remotePeers,  setRemotePeers]  = useState([]);
  const [localStream,  setLocalStream]  = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [micOn,  setMicOn]  = useState(true);
  const [camOn,  setCamOn]  = useState(true);
  const [copied, setCopied] = useState(false);

  const [mobileTab,    setMobileTab]    = useState("video");
  const [desktopStage, setDesktopStage] = useState(null);
  const [chatOpen,     setChatOpen]     = useState(false);

  const [chatDraft,    setChatDraft]    = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatUnread,   setChatUnread]   = useState(0);

  // Sync events for whiteboard / code
  const [syncEvent, setSyncEvent] = useState(null);

  const chatOpenRef = useRef(false);
  const chatEndRef  = useRef(null);

  useEffect(() => { chatOpenRef.current = chatOpen; }, [chatOpen]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  // ── Get local media — echo fix: audio only, no video loopback ──
  const [mediaError, setMediaError] = useState(null);

  useEffect(() => {
    let s;
    navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 24 } },
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    }).then(stream => {
      stream.getTracks().forEach(t => { t.enabled = true; });
      s = stream;
      setLocalStream(stream);
      setMicOn(true);
      setCamOn(true);
    }).catch((err) => {
      setMediaError(err.name);
      navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      }).then(stream => {
        stream.getTracks().forEach(t => { t.enabled = true; });
        s = stream;
        setLocalStream(stream);
        setMicOn(true);
      }).catch(() => setLocalStream(null));
    });
    return () => s?.getTracks().forEach(t => t.stop());
  }, []);

  // ── Signaling ──
  const postSignal = useCallback(async (to, type, data) => {
    try {
      await fetch(`/api/rooms/${encodeURIComponent(roomCode)}/signal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: clientId, to: to ?? "", type, data }),
      });
    } catch { /* ignore */ }
  }, [clientId, roomCode]);

  const closePeer = useCallback(peerId => {
    const peer = peersRef.current.get(peerId);
    if (!peer) return;
    try { peer.pc.close(); } catch { /* ignore */ }
    peersRef.current.delete(peerId);
    setRemotePeers(c => c.filter(p => p.id !== peerId));
  }, []);

  const ensurePeer = useCallback(peerId => {
    if (!peerId || peerId === clientId) return null;
    if (peersRef.current.has(peerId)) return peersRef.current.get(peerId);

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const polite = clientId.localeCompare(peerId) < 0;
    const peer = { pc, polite, makingOffer: false, ignoreOffer: false };

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) postSignal(peerId, "webrtc", { candidate });
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === "failed") pc.restartIce?.();
    };

    const remoteStream = new MediaStream();

    pc.ontrack = ({ track }) => {
      remoteStream.addTrack(track);
      setRemotePeers(c => [...c.filter(p => p.id !== peerId), { id: peerId, stream: remoteStream }]);
    };

    pc.onnegotiationneeded = async () => {
      try {
        peer.makingOffer = true;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        postSignal(peerId, "webrtc", { description: pc.localDescription });
      } catch (e) {
        console.warn("negotiation error", e);
      } finally { peer.makingOffer = false; }
    };

    if (localStream) {
      for (const t of localStream.getTracks()) pc.addTrack(t, localStream);
    }

    peersRef.current.set(peerId, peer);
    return peer;
  }, [clientId, localStream, postSignal]);

  // Replace video track on screen toggle
  useEffect(() => {
    if (!localStream) return;
    const vid = screenStream?.getVideoTracks()[0] ?? localStream.getVideoTracks()[0];
    if (!vid) return;
    for (const peer of peersRef.current.values()) {
      const sender = peer.pc.getSenders().find(s => s.track?.kind === "video");
      if (sender) sender.replaceTrack(vid).catch(() => {});
    }
  }, [localStream, screenStream]);

  // SSE with auto-reconnect (Cloudflare/ngrok safe)
  useEffect(() => {
    let es = null;
    let retryTimer = null;
    let dead = false;

    async function processMsg(msg) {
      if (msg.type === "hello") { (msg.peers ?? []).forEach(p => ensurePeer(String(p))); return; }
      if (msg.type === "peer-join")  { ensurePeer(String(msg.peerId ?? "")); return; }
      if (msg.type === "peer-leave") { closePeer(String(msg.peerId ?? ""));  return; }

      if (msg.type === "webrtc") {
        const from = String(msg.from ?? "");
        const peer = ensurePeer(from);
        if (!peer) return;
        const { description, candidate } = msg.data ?? {};
        try {
          if (description) {
            const collision = description.type === "offer" &&
              (peer.makingOffer || peer.pc.signalingState !== "stable");
            peer.ignoreOffer = !peer.polite && collision;
            if (peer.ignoreOffer) return;
            await peer.pc.setRemoteDescription(new RTCSessionDescription(description));
            if (description.type === "offer") {
              const ans = await peer.pc.createAnswer();
              await peer.pc.setLocalDescription(ans);
              postSignal(from, "webrtc", { description: peer.pc.localDescription });
            }
          }
          if (candidate) {
            try { await peer.pc.addIceCandidate(new RTCIceCandidate(candidate)); }
            catch (e) { if (!peer.ignoreOffer) console.warn("ICE candidate err", e); }
          }
        } catch (e) { console.warn("webrtc err", e); }
        return;
      }

      if (msg.type === "chat") {
        const text = String(msg.data?.text ?? "").trim();
        if (!text) return;
        const ts = Number(msg.data?.ts ?? Date.now());
        setChatMessages(c => [...c, { id: `${ts}_${Math.random().toString(36).slice(2,7)}`, from: msg.from, text, ts }]);
        if (!chatOpenRef.current) setChatUnread(n => n + 1);
        return;
      }

      if (msg.type === "wb" || msg.type === "code") {
        // ignore own broadcasts
        if (msg.from === clientId) return;
        setSyncEvent({ type: msg.type, data: msg.data, _t: Date.now() });
      }
    }

    function connect() {
      if (dead) return;
      const url = `/api/rooms/${encodeURIComponent(roomCode)}/events?clientId=${encodeURIComponent(clientId)}`;
      es = new EventSource(url);
      es.onmessage = ({ data: raw }) => {
        let msg; try { msg = JSON.parse(raw); } catch { return; }
        processMsg(msg);
      };
      es.onerror = () => {
        es.close();
        if (!dead) retryTimer = setTimeout(connect, 2000);
      };
    }

    connect();

    return () => {
      dead = true;
      clearTimeout(retryTimer);
      es?.close();
      Array.from(peersRef.current.keys()).forEach(pid => closePeer(pid));
    };
  }, [clientId, closePeer, ensurePeer, postSignal, roomCode]);

  // ── Controls ──
  const toggleMic = useCallback(() => {
    localStream?.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
    setMicOn(v => !v);
  }, [localStream]);

  const toggleCam = useCallback(() => {
    localStream?.getVideoTracks().forEach(t => { t.enabled = !t.enabled; });
    setCamOn(v => !v);
  }, [localStream]);

  const toggleScreen = useCallback(async () => {
    if (screenStream) {
      screenStream.getTracks().forEach(t => t.stop());
      setScreenStream(null);
      return;
    }
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true });
      s.getVideoTracks()[0]?.addEventListener("ended", () => setScreenStream(null));
      setScreenStream(s);
      setDesktopStage("screen");
    } catch { /* cancelled */ }
  }, [screenStream]);

  // Broadcast handler for whiteboard & code
  const handleBroadcast = useCallback(async (payload) => {
    await postSignal("", payload.type, payload.data);
  }, [postSignal]);

  const sendChat = useCallback(async () => {
    const text = chatDraft.trim();
    if (!text) return;
    const ts = Date.now();
    setChatMessages(c => [...c, { id: `${ts}_me`, from: clientId, text, ts }]);
    setChatDraft("");
    await postSignal("", "chat", { text, ts });
  }, [chatDraft, clientId, postSignal]);

  function endCall() {
    Array.from(peersRef.current.keys()).forEach(pid => closePeer(pid));
    localStream?.getTracks().forEach(t => t.stop());
    screenStream?.getTracks().forEach(t => t.stop());
    router.push("/mock");
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); } catch { /* ignore */ }
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }

  const participants = [
    { id: "you", label: "You (me)", stream: localStream, muted: true, noVideo: !camOn },
    ...remotePeers.map(p => ({
      id: p.id, label: `Peer ${p.id.slice(0,4).toUpperCase()}`,
      stream: p.stream, muted: false, noVideo: false,
    })),
  ];
  const total = participants.length;

  // ── Shared panels ──
  const ChatPanel = (
    <div className="flex flex-col h-full bg-[#13161f]">
      <div className="shrink-0 h-11 px-4 flex items-center gap-2 border-b border-white/5">
        <MessageSquare className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-semibold text-slate-200 flex-1">Chat</span>
        <button onClick={() => { setChatOpen(false); setMobileTab("video"); }}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide p-3 space-y-2">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-slate-600">
            <MessageSquare className="w-7 h-7 opacity-20" />
            <p className="text-xs">No messages yet</p>
          </div>
        ) : chatMessages.map(m => {
          const mine = m.from === clientId;
          return (
            <div key={m.id} className={`flex flex-col gap-0.5 ${mine ? "items-end" : "items-start"}`}>
              {!mine && <span className="text-[10px] text-slate-500 px-1">Peer {m.from.slice(0,4).toUpperCase()}</span>}
              <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed break-words
                ${mine ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-white/8 border border-white/8 text-slate-200 rounded-tl-sm"}`}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={e => { e.preventDefault(); sendChat(); }} className="shrink-0 p-3 border-t border-white/5">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-indigo-500/50 transition">
          <input value={chatDraft} onChange={e => setChatDraft(e.target.value)}
            placeholder="Message..." autoComplete="off"
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none" />
          <button type="submit" disabled={!chatDraft.trim()}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition">
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );

  const PeoplePanel = (
    <div className="flex flex-col h-full bg-[#13161f]">
      <div className="shrink-0 h-11 px-4 flex items-center gap-2 border-b border-white/5">
        <Users className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-semibold text-slate-200 flex-1">People ({total})</span>
        <button onClick={() => setMobileTab("video")}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
        {participants.map(p => (
          <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {p.label.slice(0,2).toUpperCase()}
            </div>
            <span className="text-sm text-slate-200 flex-1 truncate">{p.label}</span>
            {p.id === "you" && <span className="text-[10px] text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-full">You</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const stageTabs = [
    { key: "code",   icon: <Code2 className="w-3.5 h-3.5" />,   label: "Code"   },
    { key: "board",  icon: <PenLine className="w-3.5 h-3.5" />, label: "Board"  },
    { key: "screen", icon: <ScreenShare className="w-3.5 h-3.5" />, label: "Screen" },
  ];

  return (
    <div className="h-dvh bg-[#0f1117] text-slate-100 flex flex-col overflow-hidden font-sans">

      {/* Permission error banner */}
      {mediaError && (
        <div className="shrink-0 bg-red-500/15 border-b border-red-500/30 px-4 py-2 flex items-center gap-3">
          <span className="text-xs text-red-300 flex-1">
            {mediaError === "NotAllowedError" || mediaError === "PermissionDeniedError"
              ? "📵 Camera/mic blocked. Click the lock icon in your browser address bar and allow permissions, then refresh."
              : `⚠️ Media error: ${mediaError}. Try refreshing.`}
          </span>
          <button onClick={() => window.location.reload()}
            className="shrink-0 text-xs font-semibold text-red-200 bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition">
            Refresh
          </button>
        </div>
      )}

      {/* Top bar */}
      <header className="shrink-0 h-12 px-4 flex items-center justify-between gap-3 border-b border-white/5 bg-[#0a0c14]">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={() => router.push("/mock")} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 lg:hidden">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs text-slate-400 truncate max-w-[120px] sm:max-w-xs">{roomCode}</span>
          <span className="text-[10px] bg-white/5 border border-white/8 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
            {total} {total === 1 ? "person" : "people"}
          </span>
        </div>
        <button onClick={copyLink}
          className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 text-xs font-semibold transition shrink-0">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Invite"}</span>
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {/* ══ MOBILE ══ */}
        <div className="flex flex-col flex-1 min-h-0 lg:hidden">
          <div className="flex-1 min-h-0 overflow-hidden relative">
            <div className={mobileTab === "video"  ? "h-full" : "hidden"}><VideoGrid participants={participants} /></div>
            <div className={mobileTab === "code"   ? "h-full" : "hidden"}><CodeEditorPanel onBroadcast={handleBroadcast} syncEvent={syncEvent} /></div>
            <div className={mobileTab === "board"  ? "h-full" : "hidden"}><WhiteboardCanvas onBroadcast={handleBroadcast} syncEvent={syncEvent} /></div>
            <div className={mobileTab === "chat"   ? "h-full" : "hidden"}>{ChatPanel}</div>
            <div className={mobileTab === "people" ? "h-full" : "hidden"}>{PeoplePanel}</div>
          </div>

          {/* Mobile bottom bar */}
          <div className="shrink-0 bg-[#0a0c14] border-t border-white/5 px-2 pt-2 pb-safe">
            <div className="flex items-center justify-around mb-2">
              {[
                { key: "video",  icon: Video,          label: "Video"  },
                { key: "code",   icon: Code2,           label: "Code"   },
                { key: "board",  icon: PenLine,         label: "Board"  },
                { key: "chat",   icon: MessageSquare,   label: "Chat",  badge: chatUnread },
                { key: "people", icon: Users,           label: "People" },
              ].map(({ key, icon: Icon, label, badge }) => (
                <button key={key} onClick={() => { setMobileTab(key); if (key === "chat") setChatUnread(0); }}
                  className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition
                    ${mobileTab === key ? "text-indigo-400" : "text-slate-500"}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium">{label}</span>
                  {badge > 0 && (
                    <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center">
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-5 py-2 border-t border-white/5">
              <IconBtn onClick={toggleMic} icon={micOn ? Mic : MicOff} active={micOn} danger={!micOn} label={micOn ? "Mute" : "Unmute"} />
              <IconBtn onClick={toggleCam} icon={camOn ? Video : VideoOff} active={camOn} danger={!camOn} label={camOn ? "Cam off" : "Cam on"} />
              <button onClick={endCall}
                className="flex items-center gap-2 h-11 px-5 rounded-full bg-red-600 hover:bg-red-500 transition text-white font-semibold text-sm">
                <PhoneOff className="w-4 h-4" /> End
              </button>
            </div>
          </div>
        </div>

        {/* ══ DESKTOP ══ */}
        <div className="hidden lg:flex flex-1 min-h-0 overflow-hidden">
          {/* Videos (shrinks to filmstrip when stage open) */}
          <div className={`flex flex-col min-h-0 shrink-0 transition-all duration-300 ${desktopStage ? "w-56" : "flex-1"}`}>
            <VideoGrid participants={participants} filmstrip={!!desktopStage} />
          </div>

          {/* Stage */}
          {desktopStage && (
            <div className="flex-1 min-h-0 border-l border-white/5 flex flex-col overflow-hidden">
              <div className="shrink-0 h-11 px-3 flex items-center gap-2 border-b border-white/5 bg-[#0a0c14]">
                <div className="flex items-center bg-white/5 rounded-lg p-0.5 gap-0.5">
                  {stageTabs.map(({ key, icon, label }) => (
                    <button key={key} onClick={() => setDesktopStage(key)}
                      className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-xs font-semibold transition
                        ${desktopStage === key ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                      {icon}{label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setDesktopStage(null)}
                  className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                {desktopStage === "code"   && <CodeEditorPanel onBroadcast={handleBroadcast} syncEvent={syncEvent} />}
                {desktopStage === "board"  && <WhiteboardCanvas onBroadcast={handleBroadcast} syncEvent={syncEvent} />}
                {desktopStage === "screen" && (
                  <div className="h-full p-3">
                    <VideoTile stream={screenStream} label="Your screen" muted noVideo={!screenStream} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat */}
          {chatOpen && (
            <div className="w-72 shrink-0 border-l border-white/5 flex flex-col min-h-0">
              {ChatPanel}
            </div>
          )}
        </div>
      </div>

      {/* Desktop bottom bar */}
      <footer className="hidden lg:flex shrink-0 bg-[#0a0c14] border-t border-white/5 px-6 py-3">
        <div className="max-w-2xl mx-auto w-full flex items-end justify-between">
          <div className="flex items-end gap-4">
            <IconBtn onClick={toggleMic} icon={micOn ? Mic : MicOff} active={micOn} danger={!micOn} label={micOn ? "Mute" : "Unmute"} />
            <IconBtn onClick={toggleCam} icon={camOn ? Video : VideoOff} active={camOn} danger={!camOn} label={camOn ? "Cam off" : "Cam on"} />
            <IconBtn onClick={toggleScreen} icon={screenStream ? ScreenShareOff : ScreenShare} active={!!screenStream} label="Screen" />
          </div>
          <div className="flex items-end gap-4">
            <IconBtn onClick={() => setDesktopStage(s => s === "code"  ? null : "code")}  icon={Code2}   active={desktopStage === "code"}  label="Code" />
            <IconBtn onClick={() => setDesktopStage(s => s === "board" ? null : "board")} icon={PenLine} active={desktopStage === "board"} label="Board" />
            <IconBtn onClick={() => { setChatOpen(v => { if (!v) setChatUnread(0); return !v; }); }}
              icon={MessageSquare} active={chatOpen} badge={chatUnread} label="Chat" />
          </div>
          <button onClick={endCall}
            className="flex items-center gap-2 h-12 px-6 rounded-full bg-red-600 hover:bg-red-500 transition text-white font-semibold shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <PhoneOff className="w-5 h-5" /><span className="text-sm">End call</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
