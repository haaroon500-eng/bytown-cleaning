import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
};

export default function Admin() {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    base44.entities.QuoteRequest.list("-created_date", 100).then((data) => {
      setQuotes(data);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    await base44.entities.QuoteRequest.update(id, { status: newStatus });
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
    setUpdating(null);
  };

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <div className="pt-20 min-h-screen px-6 lg:px-10 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1">Admin</p>
            <h1 className="font-heading font-extrabold text-3xl text-foreground tracking-tight">Quote Requests</h1>
          </div>
          {/* Filter */}
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-muted-foreground">Filter:</span>
            {["all", "new", "contacted", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`font-body text-sm px-4 py-1.5 rounded-sm border transition-colors ${
                  filter === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="font-mono text-xs text-muted-foreground mb-6">
          {filtered.length} request{filtered.length !== 1 ? "s" : ""}
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-7 h-7 border-4 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground font-body">No requests found.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border p-5 rounded-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-heading font-bold text-base text-foreground">{q.name}</h2>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[q.status] || "bg-muted text-muted-foreground"}`}>
                        {q.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-body text-muted-foreground mb-3">
                      <span>{q.email}</span>
                      {q.phone && <span>{q.phone}</span>}
                      <span className="font-mono text-xs">{new Date(q.created_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {q.service_type && <Tag>{q.service_type.replace("_", " ")}</Tag>}
                      {q.frequency && <Tag>{q.frequency.replace("_", " ")}</Tag>}
                      {q.size && <Tag>{q.size}</Tag>}
                      {q.specialties?.map((s) => <Tag key={s}>{s.replace("_", " ")}</Tag>)}
                    </div>
                    {q.notes && (
                      <p className="mt-3 text-xs font-body text-muted-foreground border-l-2 border-border pl-3 italic">
                        {q.notes}
                      </p>
                    )}
                  </div>

                  {/* Right: Status Updater */}
                  <div className="shrink-0">
                    <Select
                      value={q.status}
                      onValueChange={(val) => handleStatusChange(q.id, val)}
                      disabled={updating === q.id}
                    >
                      <SelectTrigger className="w-36 h-9 text-sm font-body rounded-sm border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm capitalize">
      {children}
    </span>
  );
}
