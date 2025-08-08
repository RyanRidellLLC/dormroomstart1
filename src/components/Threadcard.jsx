import React from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThreadCard({ t }) {
  return (
    <Link to={`/thread/${t.id}`} className="block bg-white border border-slate-200 rounded-2xl p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">{t.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2 mt-1">{t.body}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {t.tags?.map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 px-2 py-1 rounded-full">{tag}</span>
            ))}
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{t.stage}</span>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{t.university}</span>
          </div>
        </div>
        <div className="text-slate-500 text-sm flex items-center gap-1 shrink-0">
          <MessageCircle className="w-4 h-4" />
          {t.comments || 0}
        </div>
      </div>
    </Link>
  );
}
