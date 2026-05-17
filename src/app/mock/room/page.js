import { Suspense } from "react";
import MeetRoom from "./MeetRoom";

export default function RoomPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-[#080c18] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 animate-pulse" />
          <div className="text-sm text-slate-400">Joining meeting...</div>
        </div>
      </div>
    }>
      <MeetRoom />
    </Suspense>
  );
}
