import { useState, useMemo, useCallback, useEffect } from "react";

const INITIAL_PLAYERS = {
  Gerry: {
    color: "#e63946", emoji: "💀",
    picks: [
      { name: "Brad Arnold", bday: "1978-09-27", tripleX: true, scored: true, earnedPts: 159 },
      { name: "James Van Der Beek", bday: "1977-03-08", tripleX: true, scored: true, earnedPts: 156 },
      { name: "Jason Collins", bday: "1978-12-02", tripleX: true, scored: true, earnedPts: 159 },
      { name: "Christiane Amanpour", bday: "1958-01-12", scored: false },
      { name: "Ric Flair", bday: "1949-02-25", scored: false },
      { name: "Michael Bolton", bday: "1953-02-26", scored: false },
      { name: "Michael Flatley", bday: "1958-07-16", scored: false },
      { name: "Mike Ditka", bday: "1939-10-18", scored: false },
      { name: "Eric Dane", bday: "1972-11-09", scored: true, earnedPts: 47 },
      { name: "Bruce Willis", bday: "1955-03-19", scored: false },
      { name: "Gary Ridgway", bday: "1949-02-18", scored: false },
      { name: "Scott Adams", bday: "1957-06-08", scored: true, earnedPts: 32 },
      { name: "Anok Yai", bday: "1997-12-20", scored: false },
      { name: "Victoria Jackson", bday: "1959-08-02", scored: false },
      { name: "Dave Coulier", bday: "1959-09-21", scored: false },
      { name: "Harvey Weinstein", bday: "1952-03-19", scored: false },
      { name: "Donald Trump", bday: "1946-06-14", scored: false },
      { name: "Donovan", bday: "1946-05-10", scored: false },
      { name: "Barry Manilow", bday: "1943-06-17", scored: false },
      { name: "Zachery Ty Bryan", bday: "1981-10-09", scored: false },
    ],
  },
  Ally: {
    color: "#f4a261", emoji: "⚰️",
    picks: [
      { name: "Ben Sasse", bday: "1972-02-22", tripleX: true, scored: false },
      { name: "Scott Adams", bday: "1957-06-08", tripleX: true, scored: true, earnedPts: 96 },
      { name: "Joe Biden", bday: "1942-11-20", tripleX: true, scored: false },
      { name: "Chris Hoy", bday: "1976-03-23", scored: false },
      { name: "Michael Bolton", bday: "1953-02-26", scored: false },
      { name: "Crown Princess Mette-Marit", bday: "1973-08-19", scored: false },
      { name: "Asma al-Assad", bday: "1975-08-11", scored: false },
      { name: "Harvey Weinstein", bday: "1952-03-19", scored: false },
      { name: "Bruce Willis", bday: "1955-03-19", scored: false },
      { name: "Wendy Williams", bday: "1964-07-18", scored: false },
      { name: "Jack Hanna", bday: "1947-01-02", scored: false },
      { name: "King Charles III", bday: "1948-11-14", scored: false },
      { name: "Eric Dane", bday: "1972-11-09", scored: true, earnedPts: 47 },
      { name: "Dave Coulier", bday: "1959-09-21", scored: false },
      { name: "Barry Manilow", bday: "1943-06-17", scored: false },
      { name: "Billy Joel", bday: "1949-05-09", scored: false },
      { name: "Christina Applegate", bday: "1971-11-25", scored: false },
      { name: "Mitch McConnell", bday: "1942-02-20", scored: false },
      { name: "Joni Mitchell", bday: "1943-11-07", scored: false },
      { name: "James Van Der Beek", bday: "1977-03-08", scored: true, earnedPts: 52 },
    ],
  },
  Jeff: {
    color: "#2a9d8f", emoji: "🪦",
    picks: [
      { name: "Eric Dane", bday: "1972-11-09", tripleX: true, scored: true, earnedPts: 141 },
      { name: "Chris Hoy", bday: "1976-03-23", tripleX: true, scored: false },
      { name: "Carl Yastrzemski", bday: "1939-08-22", tripleX: true, scored: false },
      { name: "Ayatollah Ali Khamenei", bday: "1939-07-17", scored: true, earnedPts: 14 },
      { name: "Violent J", bday: "1972-04-13", scored: false },
      { name: "Paul Hogan", bday: "1939-10-08", scored: false },
      { name: "Ian McKellen", bday: "1939-05-25", scored: false },
      { name: "Britney Spears", bday: "1981-12-02", scored: false },
      { name: "Dave Blunts", bday: null, scored: false },
      { name: "Harvey Weinstein", bday: "1952-03-19", scored: false },
      { name: "Jim Ross", bday: "1952-01-03", scored: false },
      { name: "Phil Collins", bday: "1951-01-30", scored: false },
      { name: "Mitch McConnell", bday: "1942-02-20", scored: false },
      { name: "Lee Corso", bday: "1935-08-07", scored: false },
      { name: "Vladimir Putin", bday: "1952-10-07", scored: false },
      { name: "Dennis Rader (BTK Killer)", bday: "1945-03-09", scored: false },
      { name: "Michael Bolton", bday: "1953-02-26", scored: false },
      { name: "Mike Ditka", bday: "1939-10-18", scored: false },
      { name: "Wayne Newton", bday: "1942-04-03", scored: false },
      { name: "Morgan Freeman", bday: "1937-06-01", scored: false },
    ],
  },
  Jessica: {
    color: "#9b5de5", emoji: "🕯️",
    picks: [
      { name: "Dave Coulier", bday: "1959-09-21", tripleX: true, scored: false },
      { name: "Bob Dylan", bday: "1941-05-24", scored: false },
      { name: "Diddy", bday: "1969-11-04", scored: false },
      { name: "Frankie Valli", bday: "1934-05-03", scored: false },
      { name: "Diana Ross", bday: "1944-03-26", scored: false },
      { name: "Donald Trump", bday: "1946-06-14", scored: false },
      { name: "Chuck Grassley", bday: "1933-09-17", scored: false },
      { name: "Patti LaBelle", bday: "1944-05-24", tripleX: true, scored: false },
      { name: "Joni Mitchell", bday: "1943-11-07", tripleX: true, scored: false },
      { name: "Mitch McConnell", bday: "1942-02-20", scored: false },
      { name: "Amanda Bynes", bday: "1986-04-03", scored: false },
      { name: "Neil Young", bday: "1945-11-12", scored: false },
      { name: "Bruce Willis", bday: "1955-03-19", scored: false },
      { name: "Martin Sheen", bday: "1940-08-03", scored: false },
      { name: "Smokey Robinson", bday: "1940-02-19", scored: false },
      { name: "Susan Lucci", bday: "1946-12-23", scored: false },
      { name: "Chevy Chase", bday: "1943-10-08", scored: false },
      { name: "Phil Collins", bday: "1951-01-30", scored: false },
      { name: "Bill Cosby", bday: "1937-07-12", scored: false },
      { name: "George Clinton", bday: "1941-07-22", scored: false },
    ],
  },
  "Paul & Bethany": {
    color: "#457b9d", emoji: "🏴‍☠️",
    picks: [
      { name: "Ghislaine Maxwell", bday: "1961-12-25", scored: false },
      { name: "Donald Trump", bday: "1946-06-14", tripleX: true, scored: false },
      { name: "Morgan Freeman", bday: "1937-06-01", scored: false },
      { name: "Jackie Chan", bday: "1954-04-07", scored: false },
      { name: "Tom Brady", bday: "1977-08-03", scored: false },
      { name: "Clint Eastwood", bday: "1930-05-31", scored: false },
      { name: "Joe Biden", bday: "1942-11-20", tripleX: true, scored: false },
      { name: "Khloe Kardashian", bday: "1984-06-27", scored: false },
      { name: "Mark McGrath", bday: "1968-03-15", scored: false },
      { name: "Bill Gates", bday: "1955-10-28", scored: false },
      { name: "P Diddy", bday: "1969-11-04", scored: false },
      { name: "Jake Paul", bday: "1997-01-17", scored: false },
      { name: "Dolly Parton", bday: "1946-01-19", tripleX: true, scored: false },
      { name: "Emeril", bday: "1959-01-15", scored: false },
      { name: "Finn Wolfhard", bday: "2002-12-23", scored: false },
      { name: "Jim Carrey", bday: "1962-01-17", scored: false },
      { name: "Sydney Sweeney", bday: "1997-09-12", scored: false },
      { name: "Patrick Stewart", bday: "1940-07-13", scored: false },
      { name: "Bill Nye", bday: "1955-11-27", scored: false },
      { name: "Nicki Minaj", bday: "1982-12-08", scored: false },
    ],
  },
};

function getAge(bday) {
  if (!bday) return null;
  const b = new Date(bday); const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age;
}
function getPoints(bday) { const age = getAge(bday); return age === null ? null : 100 - age; }
function getTotalPoints(player) { return player.picks.reduce((s, p) => s + (p.earnedPts || 0), 0); }
function getPotentialMax(player) {
  return player.picks.reduce((sum, p) => {
    if (p.scored) return sum + p.earnedPts;
    const pts = getPoints(p.bday); if (pts === null) return sum;
    return sum + (p.tripleX ? pts * 3 : pts);
  }, 0);
}
function getSharedPicks(playerName, pd) {
  const myPicks = pd[playerName].picks.map((p) => p.name); const shared = {};
  for (const [name, data] of Object.entries(pd)) {
    if (name === playerName) continue;
    for (const pick of data.picks) { if (myPicks.includes(pick.name)) { if (!shared[pick.name]) shared[pick.name] = []; shared[pick.name].push(name); } }
  }
  return shared;
}

const S = {
  app: { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", background: "#0a0a0c", color: "#e8e4df", minHeight: "100vh", position: "relative", overflow: "hidden" },
  bgNoise: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")` },
  content: { position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "20px 16px 60px" },
  header: { textAlign: "center", padding: "40px 0 30px", borderBottom: "1px solid #2a2a2e", marginBottom: 40 },
  title: { fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0, lineHeight: 1.1 },
  titleLink: { background: "linear-gradient(135deg, #e63946, #f4a261, #e63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" },
  subtitle: { fontFamily: "'Georgia', serif", fontSize: "clamp(13px, 2vw, 16px)", color: "#6b6b70", marginTop: 10, fontStyle: "italic", letterSpacing: "0.15em" },
  nav: { display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 },
  navBtn: (a, c) => ({ padding: "10px 20px", borderRadius: 6, border: a ? `2px solid ${c}` : "2px solid #2a2a2e", background: a ? `${c}18` : "transparent", color: a ? c : "#888", cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontWeight: a ? 700 : 400, transition: "all 0.2s", letterSpacing: "0.03em" }),
  card: { background: "#111114", border: "1px solid #1e1e22", borderRadius: 12, padding: "28px 24px", marginBottom: 20 },
  leaderRow: (c, r) => ({ display: "grid", gridTemplateColumns: "36px 1fr auto", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 10, marginBottom: 8, background: r === 0 ? `${c}12` : "#111114", border: r === 0 ? `1px solid ${c}40` : "1px solid #1a1a1e", cursor: "pointer", transition: "all 0.2s" }),
  rank: (c) => ({ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700, color: c, textAlign: "center" }),
  playerName: { fontSize: 18, fontWeight: 700, letterSpacing: "0.02em" },
  playerSub: { fontSize: 12, color: "#666", marginTop: 2 },
  points: (c) => ({ fontSize: 32, fontWeight: 900, color: c, fontFamily: "'Georgia', serif", textAlign: "right" }),
  pointsLabel: { fontSize: 11, color: "#555", textAlign: "right", textTransform: "uppercase", letterSpacing: "0.1em" },
  sectionTitle: { fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", color: "#555", marginBottom: 16, fontWeight: 600 },
  pickRow: (s, t) => ({ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center", padding: "14px 16px", borderRadius: 8, marginBottom: 4, background: s ? "#1a120e" : t ? "#12121a" : "transparent", borderLeft: s ? "3px solid #e63946" : t ? "3px solid #f4a261" : "3px solid transparent", opacity: s ? 1 : 0.85 }),
  pickName: (s) => ({ fontSize: 15, fontWeight: s ? 700 : 400, color: s ? "#e8e4df" : "#aaa" }),
  badge: (bg, fg) => ({ display: "inline-block", padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color: fg, marginLeft: 8 }),
  pickPts: (s) => ({ fontSize: s ? 20 : 14, fontWeight: s ? 900 : 600, color: s ? "#e63946" : "#555", fontFamily: "'Georgia', serif", textAlign: "right", minWidth: 50 }),
  pickAge: { fontSize: 12, color: "#555", textAlign: "right", minWidth: 60 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 28 },
  statBox: (c) => ({ background: "#111114", border: "1px solid #1e1e22", borderRadius: 10, padding: "16px 14px", textAlign: "center", borderTop: `3px solid ${c}` }),
  statVal: (c) => ({ fontSize: 28, fontWeight: 900, color: c, fontFamily: "'Georgia', serif" }),
  statLabel: { fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 },
  overlapBadge: { display: "inline-block", padding: "2px 6px", borderRadius: 3, fontSize: 9, background: "#1a1a2e", color: "#888", marginLeft: 4, fontWeight: 600 },
  backBtn: { padding: "8px 16px", borderRadius: 6, border: "1px solid #2a2a2e", background: "transparent", color: "#888", cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 13, marginBottom: 20, transition: "all 0.2s" },
  scoreBar: (p, c) => ({ height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${c} ${p}%, #1e1e22 ${p}%)`, marginTop: 6, width: "100%" }),
  deathLog: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, marginBottom: 20, flexWrap: "wrap" },
  deathCard: { background: "#1a0f0f", border: "1px solid #3a1515", borderRadius: 8, padding: "12px 16px", minWidth: 160, flex: "0 0 auto" },
  rip: { fontSize: 10, color: "#e63946", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 },
  deathName: { fontSize: 15, fontWeight: 700, marginTop: 4 },
  deathSub: { fontSize: 11, color: "#777", marginTop: 2 },
  footer: { textAlign: "center", padding: "40px 0 20px", borderTop: "1px solid #1a1a1e", marginTop: 40, fontSize: 12, color: "#333", fontStyle: "italic" },
};

async function checkDeaths(aliveNames) {
  const batches = []; for (let i = 0; i < aliveNames.length; i += 15) batches.push(aliveNames.slice(i, i + 15));
  const allResults = [];
  for (const batch of batches) {
    const nameList = batch.map((n, i) => `${i + 1}. ${n}`).join("\n");
    try {
      const resp = await fetch("/api/reaper-check", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `You are a fact checker. Check if any of these people have died in 2026. Search the web for each person to verify their current alive/dead status.\n\n${nameList}\n\nAfter checking, respond ONLY with a JSON array. For each person confirmed dead in 2026, include: {"name": "exact name from my list", "died": true, "date": "YYYY-MM-DD or best estimate", "age_at_death": number}.\nIf someone is still alive or you cannot confirm a 2026 death, do NOT include them.\nIf nobody died, return [].\nReturn ONLY raw JSON. No markdown fences, no explanation, no other text.` }] }),
      });
      const data = await resp.json();
      if (data.error) { console.error("API error:", data.error); continue; }
      const textParts = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
      const cleaned = textParts.replace(/```json|```/g, "").trim();
      if (cleaned) {
        try { const parsed = JSON.parse(cleaned); if (Array.isArray(parsed)) allResults.push(...parsed); }
        catch (e) { const match = cleaned.match(/\[[\s\S]*\]/); if (match) { try { const p2 = JSON.parse(match[0]); if (Array.isArray(p2)) allResults.push(...p2); } catch (_) {} } }
      }
    } catch (err) { console.error("Reaper batch error:", err); }
  }
  return allResults;
}

function ReaperCheckButton({ playersData, onDeathsFound }) {
  const [checking, setChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState(() => { try { return localStorage.getItem("death-pool-last-check") || null; } catch { return null; } });
  const [results, setResults] = useState(null);
  const msgs = ["Consulting the spirit realm...", "The Reaper sharpens his scythe...", "Scanning the obituaries...", "Checking the other side...", "Summoning intel from beyond...", "Peeking behind the veil...", "Cross-referencing with fate..."];
  const [progress, setProgress] = useState("");
  const runCheck = useCallback(async () => {
    setChecking(true); setResults(null);
    const aliveNames = new Set();
    for (const data of Object.values(playersData)) for (const pick of data.picks) if (!pick.scored && pick.bday) aliveNames.add(pick.name);
    let msgIdx = 0;
    const iv = setInterval(() => { setProgress(msgs[msgIdx % msgs.length]); msgIdx++; }, 2500);
    setProgress(msgs[0]);
    try { const deaths = await checkDeaths([...aliveNames]); setResults(deaths); const ts = new Date().toLocaleString(); setLastCheck(ts); try { localStorage.setItem("death-pool-last-check", ts); } catch {} if (deaths.length > 0) onDeathsFound(deaths); }
    catch (err) { console.error(err); setResults([]); }
    finally { clearInterval(iv); setChecking(false); setProgress(""); }
  }, [playersData, onDeathsFound]);
  return (
    <div style={{ ...S.card, borderTop: "3px solid #e63946", position: "relative", overflow: "hidden" }}>
      {checking && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, #e6394610, transparent)", animation: "reaperSweep 2s ease-in-out infinite" }} />}
      <style>{`@keyframes reaperSweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}} @keyframes skullBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, position: "relative" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900 }}><span style={{ animation: checking ? "skullBounce 0.6s ease infinite" : "none", display: "inline-block" }}>💀</span> Reaper Check</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>AI-powered death scanner with live web search</div>
          {lastCheck && !checking && <div style={{ fontSize: 11, color: "#444", marginTop: 4 }}>Last checked: {lastCheck}</div>}
          {checking && <div style={{ fontSize: 13, color: "#e63946", marginTop: 8, animation: "pulse 1.5s ease infinite" }}>{progress}</div>}
        </div>
        <button onClick={runCheck} disabled={checking} style={{ padding: "14px 28px", borderRadius: 8, border: "none", background: checking ? "#2a2a2e" : "linear-gradient(135deg, #e63946, #c62828)", color: checking ? "#666" : "#fff", cursor: checking ? "not-allowed" : "pointer", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, transition: "all 0.3s", letterSpacing: "0.04em", boxShadow: checking ? "none" : "0 4px 20px #e6394640" }}
          onMouseEnter={(e) => { if (!checking) e.target.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
        >{checking ? "Scanning..." : "⚡ Check for Deaths"}</button>
      </div>
      {results !== null && !checking && (
        <div style={{ marginTop: 20, padding: 16, borderRadius: 8, background: "#0d0d10", border: "1px solid #1a1a1e" }}>
          {results.length === 0 ? (
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 36, marginBottom: 8 }}>😮‍💨</div><div style={{ fontSize: 15, fontWeight: 700 }}>No new deaths detected</div><div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>All picks are still breathing. Check back later.</div></div>
          ) : (
            <div><div style={{ fontSize: 14, fontWeight: 700, color: "#e63946", marginBottom: 12 }}>⚠️ {results.length} NEW DEATH{results.length > 1 ? "S" : ""} DETECTED</div>
              {results.map((d) => (<div key={d.name} style={{ padding: "12px 16px", borderRadius: 8, background: "#1a0f0f", border: "1px solid #3a1515", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontSize: 15, fontWeight: 700 }}>{d.name}</div><div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{d.date ? `Died: ${d.date}` : "Death confirmed"} {d.age_at_death ? `| Age: ${d.age_at_death}` : ""}</div></div><div style={{ ...S.badge("#e63946", "#fff"), fontSize: 12, padding: "4px 10px" }}>CONFIRMED ☠️</div></div>))}
              <div style={{ fontSize: 11, color: "#555", marginTop: 8, fontStyle: "italic" }}>Scores updated automatically. Verify results before making it official with the group!</div></div>
          )}
        </div>
      )}
    </div>
  );
}

function Leaderboard({ playersData, onSelectPlayer, onDeathsFound }) {
  const sorted = useMemo(() => Object.entries(playersData).map(([name, data]) => ({ name, ...data, total: getTotalPoints(data), scored: data.picks.filter((p) => p.scored).length, potential: getPotentialMax(data) })).sort((a, b) => b.total - a.total), [playersData]);
  const allDeaths = useMemo(() => { const deaths = [], seen = new Set(); for (const [, data] of Object.entries(playersData)) for (const pick of data.picks) { if (pick.scored && !seen.has(pick.name)) { seen.add(pick.name); const scoredBy = []; for (const [p2, d2] of Object.entries(playersData)) { const f = d2.picks.find((x) => x.name === pick.name && x.scored); if (f) scoredBy.push({ player: p2, pts: f.earnedPts, tripleX: f.tripleX }); } deaths.push({ name: pick.name, bday: pick.bday, scoredBy }); } } return deaths; }, [playersData]);
  const maxPts = Math.max(...sorted.map((s) => s.total), 1);
  return (
    <div>
      <ReaperCheckButton playersData={playersData} onDeathsFound={onDeathsFound} />
      <div style={{ ...S.sectionTitle, marginTop: 28 }}>☠️ Confirmed Deaths &mdash; 2026</div>
      <div style={S.deathLog}>{allDeaths.map((d) => (<div key={d.name} style={S.deathCard}><div style={S.rip}>R.I.P.</div><div style={S.deathName}>{d.name}</div><div style={S.deathSub}>Base: {getPoints(d.bday)} pts</div><div style={{ marginTop: 6 }}>{d.scoredBy.map((s) => <div key={s.player} style={{ fontSize: 11, color: playersData[s.player].color, fontWeight: 600 }}>{s.player}: +{s.pts} {s.tripleX ? "⚡3x" : ""}</div>)}</div></div>))}</div>
      <div style={S.sectionTitle}>Leaderboard</div>
      {sorted.map((p, i) => (<div key={p.name} style={S.leaderRow(p.color, i)} onClick={() => onSelectPlayer(p.name)} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = p.color; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = i === 0 ? `${p.color}40` : "#1a1a1e"; }}><div style={S.rank(p.color)}>#{i + 1}</div><div><div style={S.playerName}>{p.emoji} {p.name}</div><div style={S.playerSub}>{p.scored} scored &bull; {p.picks.length - p.scored} alive &bull; Potential: {p.potential}</div><div style={S.scoreBar((p.total / maxPts) * 100, p.color)} /></div><div><div style={S.points(p.color)}>{p.total}</div><div style={S.pointsLabel}>points</div></div></div>))}
      <div style={{ ...S.card, marginTop: 32 }}>
        <div style={S.sectionTitle}>📊 Quick Stats</div>
        <div style={S.statsGrid}>
          <div style={S.statBox("#e63946")}><div style={S.statVal("#e63946")}>{allDeaths.length}</div><div style={S.statLabel}>Deaths in 2026</div></div>
          <div style={S.statBox("#f4a261")}><div style={S.statVal("#f4a261")}>{(() => { const s = new Set(); for (const d of Object.values(playersData)) for (const p of d.picks) s.add(p.name); return s.size; })()}</div><div style={S.statLabel}>Unique Picks</div></div>
          <div style={S.statBox("#2a9d8f")}><div style={S.statVal("#2a9d8f")}>{(() => { let y = Infinity; for (const d of Object.values(playersData)) for (const p of d.picks) { const a = getAge(p.bday); if (a !== null && a < y) y = a; } return y; })()}</div><div style={S.statLabel}>Youngest Pick</div></div>
          <div style={S.statBox("#9b5de5")}><div style={S.statVal("#9b5de5")}>{(() => { let o = 0; for (const d of Object.values(playersData)) for (const p of d.picks) { const a = getAge(p.bday); if (a !== null && a > o) o = a; } return o; })()}</div><div style={S.statLabel}>Oldest Pick</div></div>
        </div>
        <div style={S.sectionTitle}>🔄 Most Shared Picks</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{(() => { const c = {}; for (const d of Object.values(playersData)) for (const p of d.picks) c[p.name] = (c[p.name] || 0) + 1; return Object.entries(c).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).map(([name, count]) => <span key={name} style={{ ...S.badge("#1a1a2e", "#aaa"), fontSize: 12, padding: "5px 10px" }}>{name} <span style={{ color: "#e63946" }}>({count})</span></span>); })()}</div>
      </div>
    </div>
  );
}

function PlayerPage({ playerName, playersData, onBack }) {
  const player = playersData[playerName]; const total = getTotalPoints(player); const scored = player.picks.filter((p) => p.scored); const alive = player.picks.filter((p) => !p.scored); const potential = getPotentialMax(player); const shared = getSharedPicks(playerName, playersData); const tripleXPicks = player.picks.filter((p) => p.tripleX); const avgAge = Math.round(player.picks.reduce((s, p) => s + (getAge(p.bday) || 0), 0) / player.picks.filter((p) => p.bday).length);
  return (
    <div>
      <button style={S.backBtn} onClick={onBack} onMouseEnter={(e) => { e.target.style.borderColor = player.color; e.target.style.color = player.color; }} onMouseLeave={(e) => { e.target.style.borderColor = "#2a2a2e"; e.target.style.color = "#888"; }}>← Back to Leaderboard</button>
      <div style={{ ...S.card, borderTop: `3px solid ${player.color}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}><div><h2 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>{player.emoji} {playerName}</h2><div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>{player.picks.length} picks &bull; {tripleXPicks.length} triple multipliers</div></div><div style={{ textAlign: "right" }}><div style={S.points(player.color)}>{total}</div><div style={S.pointsLabel}>Total Points</div></div></div></div>
      <div style={S.statsGrid}><div style={S.statBox(player.color)}><div style={S.statVal(player.color)}>{scored.length}</div><div style={S.statLabel}>Scored</div></div><div style={S.statBox("#555")}><div style={S.statVal("#888")}>{alive.length}</div><div style={S.statLabel}>Still Alive</div></div><div style={S.statBox("#2a9d8f")}><div style={S.statVal("#2a9d8f")}>{potential}</div><div style={S.statLabel}>Max Potential</div></div><div style={S.statBox("#f4a261")}><div style={S.statVal("#f4a261")}>{avgAge}</div><div style={S.statLabel}>Avg Pick Age</div></div></div>
      {scored.length > 0 && <><div style={S.sectionTitle}>☠️ Scored Picks</div>{scored.map((p) => (<div key={p.name} style={S.pickRow(true, p.tripleX)}><div><span style={S.pickName(true)}>{p.name}</span>{p.tripleX && <span style={S.badge("#f4a261", "#000")}>3x</span>}<span style={S.badge("#3a1515", "#e63946")}>deceased</span>{shared[p.name] && shared[p.name].map((s) => <span key={s} style={S.overlapBadge}>{s}</span>)}</div><div style={S.pickAge}>Age {getAge(p.bday)}</div><div style={S.pickPts(true)}>+{p.earnedPts}</div></div>))}</>}
      <div style={{ ...S.sectionTitle, marginTop: 28 }}>⚡ 3x Multiplier Picks</div>
      {tripleXPicks.filter((p) => !p.scored).map((p) => (<div key={p.name} style={S.pickRow(false, true)}><div><span style={S.pickName(false)}>{p.name}</span><span style={S.badge("#f4a261", "#000")}>3x</span><span style={S.badge("#0a2a0a", "#2a9d8f")}>alive</span>{shared[p.name] && shared[p.name].map((s) => <span key={s} style={S.overlapBadge}>{s}</span>)}</div><div style={S.pickAge}>{p.bday ? `Age ${getAge(p.bday)}` : "N/A"}</div><div style={S.pickPts(false)}>{p.bday ? `${getPoints(p.bday) * 3} potential` : "?"}</div></div>))}
      <div style={{ ...S.sectionTitle, marginTop: 28 }}>📋 All Picks (Alive)</div>
      {alive.filter((p) => !p.tripleX).sort((a, b) => (getPoints(b.bday) || 0) - (getPoints(a.bday) || 0)).map((p) => (<div key={p.name} style={S.pickRow(false, false)}><div><span style={S.pickName(false)}>{p.name}</span>{shared[p.name] && shared[p.name].map((s) => <span key={s} style={S.overlapBadge}>{s}</span>)}</div><div style={S.pickAge}>{p.bday ? `Age ${getAge(p.bday)}` : "N/A"}</div><div style={S.pickPts(false)}>{p.bday ? `${getPoints(p.bday)} pts` : "?"}</div></div>))}
    </div>
  );
}

const NEWS_LINKS = [
  { category: "Celebrity Death Trackers", icon: "💀", links: [
    { name: "GerryDidntDie.com", url: "https://www.gerrydidntdie.com", desc: "The official home of not dying (yet)" },
    { name: "Wikipedia: Deaths in 2026", url: "https://en.wikipedia.org/wiki/Deaths_in_2026", desc: "Comprehensive running list of all notable deaths" },
    { name: "Legacy.com Celebrity Deaths", url: "https://www.legacy.com/celebrity-deaths/", desc: "Obituaries and tributes for notable figures" },
    { name: "The Death List", url: "https://deathlist.net/", desc: "The OG celebrity death prediction community" },
    { name: "Dead or Alive Info", url: "https://www.dead-or-alive.info/", desc: "Quick alive/dead status checker" },
  ]},
  { category: "Celebrity & Entertainment News", icon: "📰", links: [
    { name: "Google News - Celebrity", url: "https://news.google.com/search?q=celebrity%20death%202026", desc: "Google News aggregator for celeb deaths" },
    { name: "NY Post", url: "https://nypost.com/entertainment/celebrities/", desc: "Breaking celeb news and gossip" },
    { name: "TMZ", url: "https://www.tmz.com/", desc: "First to break celebrity news, always" },
    { name: "People Magazine", url: "https://people.com/", desc: "Celebrity news and human interest" },
    { name: "E! News", url: "https://www.eonline.com/news", desc: "Entertainment and celebrity coverage" },
    { name: "Page Six", url: "https://pagesix.com/", desc: "NY Post's dedicated celebrity gossip page" },
  ]},
  { category: "Health & Illness Watch", icon: "🏥", links: [
    { name: "Google News - Celebrity Health", url: "https://news.google.com/search?q=celebrity%20health%20diagnosis%20illness", desc: "Celeb health news and diagnoses" },
    { name: "Google News - Celebrity Cancer", url: "https://news.google.com/search?q=celebrity%20cancer%20diagnosis%202026", desc: "Cancer diagnosis announcements" },
  ]},
  { category: "Quick Search Your Picks", icon: "🔍", links: [
    { name: "Google News", url: "https://news.google.com/", desc: "Search any celeb for latest news" },
    { name: "X/Twitter Trending", url: "https://twitter.com/explore/tabs/trending", desc: "Celeb deaths often trend here first" },
    { name: "Reddit r/news", url: "https://www.reddit.com/r/news/", desc: "Breaking news often hits Reddit fast" },
    { name: "Reddit r/entertainment", url: "https://www.reddit.com/r/entertainment/", desc: "Entertainment news discussion" },
  ]},
];

function NewsPage({ playersData }) {
  const allPickNames = useMemo(() => { const s = new Set(); for (const d of Object.values(playersData)) for (const p of d.picks) s.add(p.name); return [...s].sort(); }, [playersData]);
  const [searchName, setSearchName] = useState("");
  return (
    <div>
      <div style={{ ...S.card, borderTop: "3px solid #e63946" }}><h2 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>📡 News & Intel Hub</h2><div style={{ color: "#666", fontSize: 13, marginTop: 6 }}>Stay ahead of the Reaper. Quick links to track celebrity health, deaths, and breaking news.</div></div>
      <div style={{ ...S.card, marginTop: 12 }}>
        <div style={S.sectionTitle}>🔎 Quick Pick Lookup</div>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>Select a name from your pool to search Google News instantly</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <select value={searchName} onChange={(e) => setSearchName(e.target.value)} style={{ flex: 1, minWidth: 200, padding: "10px 14px", borderRadius: 8, border: "1px solid #2a2a2e", background: "#111114", color: "#e8e4df", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, appearance: "auto" }}><option value="">-- Select a pick --</option>{allPickNames.map((n) => <option key={n} value={n}>{n}</option>)}</select>
          <a href={searchName ? `https://news.google.com/search?q=${encodeURIComponent(searchName)}` : "#"} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", borderRadius: 8, background: searchName ? "#e63946" : "#2a2a2e", color: searchName ? "#fff" : "#555", textDecoration: "none", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", pointerEvents: searchName ? "auto" : "none" }}>Search News →</a>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{allPickNames.slice(0, 12).map((n) => (<a key={n} href={`https://news.google.com/search?q=${encodeURIComponent(n + " health OR death OR hospital 2026")}`} target="_blank" rel="noopener noreferrer" style={{ ...S.badge("#1a1a2e", "#aaa"), fontSize: 11, padding: "5px 10px", textDecoration: "none", cursor: "pointer", transition: "all 0.15s" }} onMouseEnter={(e) => { e.target.style.background = "#2a1a1a"; e.target.style.color = "#e63946"; }} onMouseLeave={(e) => { e.target.style.background = "#1a1a2e"; e.target.style.color = "#aaa"; }}>{n}</a>))}{allPickNames.length > 12 && <span style={{ ...S.badge("#111", "#555"), fontSize: 11, padding: "5px 10px" }}>+{allPickNames.length - 12} more in dropdown</span>}</div>
      </div>
      {NEWS_LINKS.map((section) => (<div key={section.category} style={{ ...S.card, marginTop: 12 }}><div style={S.sectionTitle}>{section.icon} {section.category}</div><div style={{ display: "grid", gap: 8 }}>{section.links.map((link) => (<a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 8, background: "#0d0d10", border: "1px solid #1a1a1e", textDecoration: "none", transition: "all 0.2s", gap: 12 }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e63946"; e.currentTarget.style.background = "#1a0f0f"; e.currentTarget.style.transform = "translateX(4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1a1a1e"; e.currentTarget.style.background = "#0d0d10"; e.currentTarget.style.transform = "translateX(0)"; }}><div><div style={{ fontSize: 15, fontWeight: 700, color: "#e8e4df" }}>{link.name}</div><div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{link.desc}</div></div><div style={{ fontSize: 18, color: "#333", flexShrink: 0 }}>→</div></a>))}</div></div>))}
      <div style={{ ...S.card, marginTop: 12, borderLeft: "3px solid #f4a261" }}><div style={{ fontSize: 13, color: "#f4a261", fontWeight: 700, marginBottom: 6 }}>💡 Pro Tip</div><div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>Set up Google Alerts for your highest-value picks. Go to <a href="https://www.google.com/alerts" target="_blank" rel="noopener noreferrer" style={{ color: "#f4a261", textDecoration: "none" }}>google.com/alerts</a> and create alerts like <span style={{ color: "#aaa" }}>"Bruce Willis health"</span> or <span style={{ color: "#aaa" }}>"Harvey Weinstein hospital"</span> to get email notifications the second news breaks.</div></div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("dashboard");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersData, setPlayersData] = useState(INITIAL_PLAYERS);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    try { const saved = localStorage.getItem("death-pool-2026-data"); if (saved) { const parsed = JSON.parse(saved); const merged = JSON.parse(JSON.stringify(INITIAL_PLAYERS)); for (const [pn, sp] of Object.entries(parsed)) { if (merged[pn]) { for (const spk of sp.picks) { const m = merged[pn].picks.find((p) => p.name === spk.name); if (m && spk.scored) { m.scored = true; m.earnedPts = spk.earnedPts; } } } } setPlayersData(merged); } } catch (e) { console.error("Load error:", e); }
    setLoaded(true);
  }, []);

  useEffect(() => { if (!loaded) return; try { localStorage.setItem("death-pool-2026-data", JSON.stringify(playersData)); } catch (e) {} }, [playersData, loaded]);

  const handleDeathsFound = useCallback((deaths) => {
    setPlayersData((prev) => {
      const next = JSON.parse(JSON.stringify(prev)); let nc = 0;
      for (const death of deaths) { for (const [, pData] of Object.entries(next)) { for (const pick of pData.picks) { if (pick.name === death.name && !pick.scored) { const age = death.age_at_death || getAge(pick.bday); const basePts = age !== null ? 100 - age : 0; pick.scored = true; pick.earnedPts = pick.tripleX ? basePts * 3 : basePts; nc++; } } } }
      if (nc > 0) { setSaveStatus("💾 Saved!"); setTimeout(() => setSaveStatus(""), 3000); }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm("Reset all Reaper Check data back to the original spreadsheet values? This cannot be undone.")) return;
    try { localStorage.removeItem("death-pool-2026-data"); localStorage.removeItem("death-pool-last-check"); } catch {}
    setPlayersData(JSON.parse(JSON.stringify(INITIAL_PLAYERS)));
    setSaveStatus("🔄 Reset to original!"); setTimeout(() => setSaveStatus(""), 3000);
  }, []);

  if (!loaded) return (<div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>💀</div><div style={{ fontSize: 16, color: "#666" }}>Loading the Death Pool...</div></div></div>);

  return (
    <div style={S.app}>
      <div style={S.bgNoise} />
      <div style={S.content}>
        <header style={S.header}>
          <h1 style={S.title}><a href="https://www.gerrydidntdie.com" target="_blank" rel="noopener noreferrer" style={S.titleLink}>Celeb Death Pool</a></h1>
          <div style={S.subtitle}>The 2026 Season &mdash; May the Grim Reaper favor your picks</div>
          {saveStatus && <div style={{ marginTop: 8, fontSize: 12, color: "#2a9d8f", fontWeight: 600 }}>{saveStatus}</div>}
        </header>
        <nav style={S.nav}>
          <button style={S.navBtn(view === "dashboard", "#e63946")} onClick={() => { setView("dashboard"); setSelectedPlayer(null); }}>🏆 Dashboard</button>
          {Object.keys(playersData).map((name) => (<button key={name} style={S.navBtn(view === "player" && selectedPlayer === name, playersData[name].color)} onClick={() => { setView("player"); setSelectedPlayer(name); }}>{playersData[name].emoji} {name}</button>))}
          <button style={S.navBtn(view === "news", "#e63946")} onClick={() => { setView("news"); setSelectedPlayer(null); }}>📡 News & Intel</button>
        </nav>
        {view === "dashboard" && <Leaderboard playersData={playersData} onSelectPlayer={(n) => { setView("player"); setSelectedPlayer(n); }} onDeathsFound={handleDeathsFound} />}
        {view === "player" && selectedPlayer && <PlayerPage playerName={selectedPlayer} playersData={playersData} onBack={() => { setView("dashboard"); setSelectedPlayer(null); }} />}
        {view === "news" && <NewsPage playersData={playersData} />}
        <footer style={S.footer}>
          <div>"In this world nothing is certain except death and taxes... and fantasy points." &mdash; Benjamin Franklin, probably</div>
          <button onClick={handleReset} style={{ marginTop: 16, padding: "8px 16px", borderRadius: 6, border: "1px solid #2a2a2e", background: "transparent", color: "#444", cursor: "pointer", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 11, transition: "all 0.2s" }} onMouseEnter={(e) => { e.target.style.borderColor = "#e63946"; e.target.style.color = "#e63946"; }} onMouseLeave={(e) => { e.target.style.borderColor = "#2a2a2e"; e.target.style.color = "#444"; }}>🔄 Reset to Original Spreadsheet Data</button>
        </footer>
      </div>
    </div>
  );
}
