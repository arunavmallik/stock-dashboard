"use client";
import { useState, useRef } from "react";

const S = {
  page: { minHeight: "100vh", background: "#f8f7f4", padding: 0 },
  topbar: { background: "#fff", borderBottom: "0.5px solid rgba(0,0,0,0.1)", padding: "0 2rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 },
  logo: { fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#111" },
  logoSub: { fontSize: "12px", color: "#888", marginLeft: "8px", fontWeight: 400 },
  main: { maxWidth: "1000px", margin: "0 auto", padding: "2rem 1.5rem" },
  addBar: { display: "flex", gap: "8px", marginBottom: "1rem" },
  input: { flex: 1, padding: "9px 14px", fontSize: "14px", border: "0.5px solid rgba(0,0,0,0.18)", borderRadius: "8px", background: "#fff", outline: "none", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "inherit" },
  btnPrimary: { padding: "9px 18px", fontSize: "13px", fontWeight: 500, background: "#185FA5", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", whiteSpace: "nowrap" },
  btnDisabled: { padding: "9px 18px", fontSize: "13px", fontWeight: 500, background: "#e5e5e5", color: "#999", border: "none", borderRadius: "8px", cursor: "not-allowed", whiteSpace: "nowrap" },
  chip: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 10px 5px 12px", fontSize: "13px", fontWeight: 600, background: "#E6F1FB", border: "0.5px solid #85B7EB", color: "#0C447C", borderRadius: "100px" },
  chipX: { background: "none", border: "none", cursor: "pointer", fontSize: "15px", color: "#378ADD", lineHeight: 1, padding: 0 },
  card: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: "12px", overflow: "hidden", marginBottom: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" },
  cardHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "0.5px solid rgba(0,0,0,0.08)", gap: "12px" },
  tickerBadge: { background: "#E6F1FB", color: "#0C447C", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "6px", whiteSpace: "nowrap", marginTop: "2px" },
  companyName: { fontSize: "16px", fontWeight: 600, color: "#111" },
  companySub: { fontSize: "12px", color: "#888", marginTop: "2px" },
  verdictUnder: { fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "#EAF3DE", color: "#3B6D11", whiteSpace: "nowrap" },
  verdictOver: { fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "#FCEBEB", color: "#A32D2D", whiteSpace: "nowrap" },
  verdictFair: { fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", background: "#FAEEDA", color: "#854F0B", whiteSpace: "nowrap" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1px", background: "rgba(0,0,0,0.07)" },
  metricCell: { background: "#fff", padding: "12px 1rem" },
  metricLabel: { fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" },
  metricValue: { fontSize: "17px", fontWeight: 600, color: "#111" },
  metricSub: { fontSize: "11px", color: "#888", marginTop: "2px" },
  cardBody: { padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.5rem" },
  sectionLabel: { fontSize: "10px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" },
  rationale: { fontSize: "13px", lineHeight: 1.7, color: "#333" },
  scenariosGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
  scenarioBull: { background: "#f7fbf1", borderRadius: "8px", padding: "10px 12px", borderTop: "2px solid #639922" },
  scenarioBase: { background: "#f0f7fd", borderRadius: "8px", padding: "10px 12px", borderTop: "2px solid #378ADD" },
  scenarioBear: { background: "#fef4f4", borderRadius: "8px", padding: "10px 12px", borderTop: "2px solid #E24B4A" },
  scenarioName: { fontSize: "10px", fontWeight: 600, color: "#888", marginBottom: "4px", textTransform: "uppercase" },
  scenarioDesc: { fontSize: "11px", color: "#666", marginTop: "3px", lineHeight: 1.4 },
  frameworkPill: { display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", padding: "3px 10px", background: "#f5f5f3", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: "100px", color: "#555" },
  loadingCard: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "2.5rem 1.25rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "1.5rem" },
  errorCard: { background: "#FCEBEB", border: "0.5px solid #F09595", borderRadius: "12px", padding: "1rem 1.25rem", fontSize: "13px", color: "#A32D2D", marginBottom: "1.5rem" },
  disclaimer: { fontSize: "11px", color: "#999", borderTop: "0.5px solid rgba(0,0,0,0.08)", paddingTop: "12px", marginTop: "8px", lineHeight: 1.6 },
  tabRow: { display: "flex", gap: "4px", borderBottom: "0.5px solid rgba(0,0,0,0.08)", padding: "0 1.25rem" },
  tab: { fontSize: "12px", fontWeight: 500, padding: "10px 14px", cursor: "pointer", border: "none", background: "none", color: "#888", borderBottom: "2px solid transparent", marginBottom: "-1px" },
  tabActive: { fontSize: "12px", fontWeight: 600, padding: "10px 14px", cursor: "pointer", border: "none", background: "none", color: "#185FA5", borderBottom: "2px solid #185FA5", marginBottom: "-1px" },
  tabContent: { padding: "1.25rem" },
  newsItem: { padding: "10px 0", borderBottom: "0.5px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: "4px" },
  newsTitle: { fontSize: "13px", fontWeight: 500, color: "#111", lineHeight: 1.4 },
  newsMeta: { fontSize: "11px", color: "#888" },
  sentimentBull: { fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "#EAF3DE", color: "#3B6D11" },
  sentimentBear: { fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "#FCEBEB", color: "#A32D2D" },
  sentimentNeutral: { fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "#FAEEDA", color: "#854F0B" },
};

function fmtPrice(n) {
  if (n == null || isNaN(n)) return "N/A";
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtNum(n) {
  if (n == null || isNaN(n)) return "N/A";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return Number(n).toLocaleString();
}

async function fetchYahooData(ticker) {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=3mo`);
  const d = await r.json();
  const result = d?.chart?.result?.[0];
  const meta = result?.meta;
  if (!meta) return null;
  const timestamps = result?.timestamp || [];
  const closes = result?.indicators?.quote?.[0]?.close || [];
  const volumes = result?.indicators?.quote?.[0]?.volume || [];
  const history = timestamps.map((t, i) => ({ date: new Date(t * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }), close: closes[i], volume: volumes[i] })).filter(d => d.close != null);
  return {
    price: meta.regularMarketPrice, prev: meta.chartPreviousClose,
    high52: meta.fiftyTwoWeekHigh, low52: meta.fiftyTwoWeekLow,
    currency: meta.currency || "USD", name: meta.longName || meta.shortName || ticker,
    volume: meta.regularMarketVolume, avgVolume: meta.averageDailyVolume3Month,
    history: history.slice(-60),
  };
}

async function fetchFundamentals(ticker) {
  const r = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=summaryDetail,defaultKeyStatistics,financialData,assetProfile`);
  const d = await r.json();
  const s = d?.quoteSummary?.result?.[0];
  if (!s) return null;
  const sd = s.summaryDetail || {}, ks = s.defaultKeyStatistics || {}, fd = s.financialData || {}, ap = s.assetProfile || {};
  return {
    pe: sd.trailingPE?.raw, forwardPE: sd.forwardPE?.raw, pb: sd.priceToBook?.raw || ks.priceToBook?.raw,
    ps: ks.priceToSalesTrailingTwelveMonths?.raw, eps: ks.trailingEps?.raw, marketCap: sd.marketCap?.raw,
    dividendYield: sd.dividendYield?.raw, beta: sd.beta?.raw, revenueGrowth: fd.revenueGrowth?.raw,
    earningsGrowth: fd.earningsGrowth?.raw, profitMargin: fd.profitMargins?.raw, roe: fd.returnOnEquity?.raw,
    debtToEquity: fd.debtToEquity?.raw, freeCashflow: fd.freeCashflow?.raw, sector: ap.sector || "",
    industry: ap.industry || "", pegRatio: ks.pegRatio?.raw,
  };
}

async function fetchOptions(ticker) {
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v7/finance/options/${ticker}`);
    const d = await r.json();
    const result = d?.optionChain?.result?.[0];
    if (!result) return null;
    const expirations = result.expirationDates || [];
    const now = Date.now() / 1000;
    const target = now + 30 * 24 * 3600;
    const expiry = expirations.reduce((best, e) => Math.abs(e - target) < Math.abs(best - target) ? e : best, expirations[0]);
    const r2 = await fetch(`https://query1.finance.yahoo.com/v7/finance/options/${ticker}?date=${expiry}`);
    const d2 = await r2.json();
    const chain = d2?.optionChain?.result?.[0];
    if (!chain) return null;
    const calls = chain.options?.[0]?.calls || [];
    const puts = chain.options?.[0]?.puts || [];
    const currentPrice = chain.quote?.regularMarketPrice || 0;
    const expiryDate = new Date(expiry * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const callVolume = calls.reduce((s, c) => s + (c.volume || 0), 0);
    const putVolume = puts.reduce((s, c) => s + (c.volume || 0), 0);
    const callOI = calls.reduce((s, c) => s + (c.openInterest || 0), 0);
    const putOI = puts.reduce((s, c) => s + (c.openInterest || 0), 0);
    const pcRatioVol = putVolume / (callVolume || 1);
    const pcRatioOI = putOI / (callOI || 1);
    const nearStrikes = [...calls, ...puts]
      .map(o => o.strike)
      .filter(s => s >= currentPrice * 0.85 && s <= currentPrice * 1.15);
    const uniqueStrikes = [...new Set(nearStrikes)].sort((a, b) => a - b);
    const strikeData = uniqueStrikes.map(strike => {
      const call = calls.find(c => c.strike === strike);
      const put = puts.find(p => p.strike === strike);
      return {
        strike,
        callOI: call?.openInterest || 0,
        putOI: put?.openInterest || 0,
        callVol: call?.volume || 0,
        putVol: put?.volume || 0,
        callIV: call?.impliedVolatility ? (call.impliedVolatility * 100).toFixed(1) : null,
        putIV: put?.impliedVolatility ? (put.impliedVolatility * 100).toFixed(1) : null,
      };
    });
    const topCallStrike = calls.filter(c => c.openInterest > 0).sort((a, b) => (b.openInterest || 0) - (a.openInterest || 0))[0];
    const topPutStrike = puts.filter(p => p.openInterest > 0).sort((a, b) => (b.openInterest || 0) - (a.openInterest || 0))[0];
    return { expiryDate, callVolume, putVolume, callOI, putOI, pcRatioVol, pcRatioOI, strikeData, currentPrice, topCallStrike: topCallStrike?.strike, topPutStrike: topPutStrike?.strike };
  } catch { return null; }
}

async function fetchNews(ticker) {
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${ticker}&newsCount=8&quotesCount=0`);
    const d = await r.json();
    const items = d?.news || [];
    return items.slice(0, 8).map(n => ({
      title: n.title,
      publisher: n.publisher,
      time: n.providerPublishTime ? new Date(n.providerPublishTime * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "",
      url: n.link,
    }));
  } catch { return []; }
}

function buildContext(ticker, priceData, f, options, news) {
  const newsText = news.length ? news.map(n => `- ${n.title} (${n.publisher}, ${n.time})`).join("\n") : "No recent news available.";
  const optionsText = options ? `Put/Call ratio (volume): ${options.pcRatioVol.toFixed(2)} | Put/Call ratio (OI): ${options.pcRatioOI.toFixed(2)}
Total call volume: ${fmtNum(options.callVolume)} | Total put volume: ${fmtNum(options.putVolume)}
Total call OI: ${fmtNum(options.callOI)} | Total put OI: ${fmtNum(options.putOI)}
Highest OI call strike: $${options.topCallStrike} | Highest OI put strike: $${options.topPutStrike}
Expiry: ${options.expiryDate}` : "Options data unavailable.";
  return `Ticker: ${ticker}
Company: ${priceData.name}
Sector: ${f?.sector || "Unknown"} | Industry: ${f?.industry || "Unknown"}
Current price: $${priceData.price} (prev close: $${priceData.prev})
52-week range: $${priceData.low52} – $${priceData.high52}
Today volume: ${fmtNum(priceData.volume)} | Avg volume (3mo): ${fmtNum(priceData.avgVolume)}
Trailing P/E: ${f?.pe ?? "N/A"} | Forward P/E: ${f?.forwardPE ?? "N/A"} | PEG: ${f?.pegRatio ?? "N/A"}
Price/Book: ${f?.pb ?? "N/A"} | Price/Sales: ${f?.ps ?? "N/A"} | EPS (TTM): ${f?.eps ?? "N/A"}
Market cap: ${f?.marketCap ? "$" + (f.marketCap / 1e9).toFixed(1) + "B" : "N/A"}
Revenue growth (YoY): ${f?.revenueGrowth != null ? (f.revenueGrowth * 100).toFixed(1) + "%" : "N/A"}
Earnings growth (YoY): ${f?.earningsGrowth != null ? (f.earningsGrowth * 100).toFixed(1) + "%" : "N/A"}
Profit margin: ${f?.profitMargin != null ? (f.profitMargin * 100).toFixed(1) + "%" : "N/A"}
ROE: ${f?.roe != null ? (f.roe * 100).toFixed(1) + "%" : "N/A"}
D/E ratio: ${f?.debtToEquity ?? "N/A"} | Free cash flow: ${f?.freeCashflow ? "$" + (f.freeCashflow / 1e9).toFixed(2) + "B" : "N/A"}
Beta: ${f?.beta ?? "N/A"} | Dividend yield: ${f?.dividendYield != null ? (f.dividendYield * 100).toFixed(2) + "%" : "N/A"}

OPTIONS DATA (~1 month expiry):
${optionsText}

RECENT NEWS:
${newsText}`;
}

function BarChart({ data, currentPrice }) {
  if (!data || data.length === 0) return <div style={{ fontSize: "12px", color: "#888", padding: "1rem 0" }}>No options data available near current price.</div>;
  const maxVal = Math.max(...data.map(d => Math.max(d.callOI, d.putOI)));
  if (maxVal === 0) return <div style={{ fontSize: "12px", color: "#888", padding: "1rem 0" }}>Open interest data not available.</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "8px", fontSize: "11px", color: "#888" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#378ADD", display: "inline-block" }}></span>Call OI</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#E24B4A", display: "inline-block" }}></span>Put OI</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: "10px", height: "2px", background: "#111", display: "inline-block", borderTop: "2px dashed #111" }}></span>Current price</span>
      </div>
      {data.map((d, i) => {
        const isATM = Math.abs(d.strike - currentPrice) / currentPrice < 0.02;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "52px", fontSize: "10px", color: isATM ? "#185FA5" : "#666", fontWeight: isATM ? 600 : 400, textAlign: "right", flexShrink: 0 }}>
              {isATM ? "▶ " : ""}{fmtPrice(d.strike)}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ height: "6px", background: "#f0f0ee", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: maxVal > 0 ? (d.callOI / maxVal * 100).toFixed(1) + "%" : "0%", background: "#378ADD", borderRadius: "3px" }} />
              </div>
              <div style={{ height: "6px", background: "#f0f0ee", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: maxVal > 0 ? (d.putOI / maxVal * 100).toFixed(1) + "%" : "0%", background: "#E24B4A", borderRadius: "3px" }} />
              </div>
            </div>
            <div style={{ width: "44px", fontSize: "10px", color: "#aaa", textAlign: "right", flexShrink: 0 }}>
              {fmtNum(Math.max(d.callOI, d.putOI))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VolumeChart({ history }) {
  if (!history || history.length === 0) return null;
  const recent = history.slice(-30);
  const maxVol = Math.max(...recent.map(d => d.volume || 0));
  const avgVol = recent.reduce((s, d) => s + (d.volume || 0), 0) / recent.length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "60px" }}>
        {recent.map((d, i) => {
          const h = maxVol > 0 ? ((d.volume || 0) / maxVol * 60) : 0;
          const isHigh = (d.volume || 0) > avgVol * 1.5;
          return (
            <div key={i} title={`${d.date}: ${fmtNum(d.volume)}`} style={{ flex: 1, height: h.toFixed(0) + "px", background: isHigh ? "#185FA5" : "#B5D4F4", borderRadius: "1px 1px 0 0", minWidth: "2px" }} />
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#aaa", marginTop: "4px" }}>
        <span>{recent[0]?.date}</span>
        <span style={{ color: "#888" }}>Dark bars = above avg volume</span>
        <span>{recent[recent.length - 1]?.date}</span>
      </div>
    </div>
  );
}

function PriceChart({ history }) {
  if (!history || history.length === 0) return null;
  const recent = history.slice(-60);
  const prices = recent.map(d => d.close).filter(Boolean);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const w = 600, h = 100, pad = 4;
  const pts = prices.map((p, i) => {
    const x = pad + (i / (prices.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p - min) / range) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const first = prices[0], last = prices[prices.length - 1];
  const color = last >= first ? "#3B6D11" : "#A32D2D";
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "80px" }}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#aaa", marginTop: "2px" }}>
        <span>{recent[0]?.date}</span>
        <span style={{ color }}>{last >= first ? "▲" : "▼"} {(((last - first) / first) * 100).toFixed(1)}% (3mo)</span>
        <span>{recent[recent.length - 1]?.date}</span>
      </div>
    </div>
  );
}

function ValuationBar({ price, fairValue, rangeMin, rangeMax }) {
  const span = rangeMax - rangeMin || 1;
  const cp = Math.max(0, Math.min(100, ((price - rangeMin) / span) * 100));
  const fp = Math.max(0, Math.min(100, ((fairValue - rangeMin) / span) * 100));
  const left = Math.min(cp, fp);
  const width = Math.abs(cp - fp);
  return (
    <div>
      <div style={{ position: "relative", height: "8px", background: "#f0efec", borderRadius: "100px", border: "0.5px solid rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", top: 0, height: "100%", left: left.toFixed(1) + "%", width: width.toFixed(1) + "%", background: "#B5D4F4", borderRadius: "100px" }} />
        <div style={{ position: "absolute", top: "-4px", left: cp.toFixed(1) + "%", width: "16px", height: "16px", background: "#185FA5", border: "2px solid #fff", borderRadius: "50%", transform: "translateX(-50%)" }} title={`Current: ${fmtPrice(price)}`} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#888", marginTop: "6px" }}>
        <span>{fmtPrice(rangeMin)}</span>
        <span style={{ color: "#111", fontWeight: 600 }}>Fair value: {fmtPrice(fairValue)}</span>
        <span>{fmtPrice(rangeMax)}</span>
      </div>
    </div>
  );
}

function StockCard({ ticker, priceData, fundamentals, options, news, analysis }) {
  const [tab, setTab] = useState("overview");
  const price = priceData.price;
  const change = price - priceData.prev;
  const changePct = ((change / priceData.prev) * 100).toFixed(2);
  const changeStr = (change >= 0 ? "+" : "") + change.toFixed(2) + " (" + (change >= 0 ? "+" : "") + changePct + "%)";
  const changeColor = change >= 0 ? "#3B6D11" : "#A32D2D";
  const verdictStyle = analysis.verdict === "undervalued" ? S.verdictUnder : analysis.verdict === "overvalued" ? S.verdictOver : S.verdictFair;
  const metrics = (analysis.keyMetrics || []).slice(0, 4);
  const sentStyle = analysis.newsSentiment === "bullish" ? S.sentimentBull : analysis.newsSentiment === "bearish" ? S.sentimentBear : S.sentimentNeutral;
  const tabs = ["overview", "options", "volume", "news"];

  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={S.tickerBadge}>{ticker}</div>
          <div>
            <div style={S.companyName}>{analysis.companyName || priceData.name}</div>
            <div style={S.companySub}>{analysis.sector || fundamentals?.sector || ""} · {options?.expiryDate ? `Options expiry: ${options.expiryDate}` : ""}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={sentStyle}>{analysis.newsSentimentLabel || "Neutral"}</span>
          <span style={verdictStyle}>{analysis.verdictLabel}</span>
        </div>
      </div>

      <div style={S.metricsGrid}>
        <div style={S.metricCell}>
          <div style={S.metricLabel}>Current price</div>
          <div style={S.metricValue}>{fmtPrice(price)}</div>
          <div style={{ ...S.metricSub, color: changeColor }}>{changeStr}</div>
        </div>
        <div style={S.metricCell}>
          <div style={S.metricLabel}>Fair value</div>
          <div style={S.metricValue}>{fmtPrice(analysis.fairValue)}</div>
          <div style={S.metricSub}>{analysis.upsideDownside} potential</div>
        </div>
        {options && (
          <div style={S.metricCell}>
            <div style={S.metricLabel}>P/C ratio (vol)</div>
            <div style={{ ...S.metricValue, color: options.pcRatioVol > 1 ? "#A32D2D" : "#3B6D11" }}>{options.pcRatioVol.toFixed(2)}</div>
            <div style={S.metricSub}>{options.pcRatioVol > 1 ? "bearish lean" : "bullish lean"}</div>
          </div>
        )}
        {options && (
          <div style={S.metricCell}>
            <div style={S.metricLabel}>Volume today</div>
            <div style={S.metricValue}>{fmtNum(priceData.volume)}</div>
            <div style={{ ...S.metricSub, color: priceData.volume > priceData.avgVolume * 1.3 ? "#A32D2D" : "#888" }}>
              {priceData.avgVolume ? (priceData.volume > priceData.avgVolume * 1.3 ? "↑ above avg" : "normal") : ""}
            </div>
          </div>
        )}
        {metrics.map((m, i) => (
          <div key={i} style={S.metricCell}>
            <div style={S.metricLabel}>{m.label}</div>
            <div style={{ ...S.metricValue, fontSize: "15px" }}>{m.value}</div>
            <div style={S.metricSub}>{m.note}</div>
          </div>
        ))}
      </div>

      <div style={S.tabRow}>
        {tabs.map(t => (
          <button key={t} style={tab === t ? S.tabActive : S.tab} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === "news" && news.length > 0 && <span style={{ marginLeft: "4px", fontSize: "10px", background: "#E6F1FB", color: "#0C447C", padding: "1px 5px", borderRadius: "100px" }}>{news.length}</span>}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={S.tabContent}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <div style={S.sectionLabel}>Price (3 months)</div>
              <PriceChart history={priceData.history} />
            </div>
            <div>
              <div style={S.sectionLabel}>Valuation range</div>
              <ValuationBar price={price} fairValue={analysis.fairValue} rangeMin={analysis.rangeMin} rangeMax={analysis.rangeMax} />
              <div style={{ fontSize: "10px", color: "#aaa", marginTop: "4px" }}>Blue dot = current price · shaded band = gap to fair value</div>
            </div>
            <div>
              <div style={S.sectionLabel}>Valuation framework</div>
              <span style={S.frameworkPill}>⚖ {analysis.framework}</span>
            </div>
            <div>
              <div style={S.sectionLabel}>Rationale</div>
              <p style={S.rationale}>{analysis.rationale}</p>
            </div>
            <div>
              <div style={S.sectionLabel}>12-month price scenarios</div>
              <div style={S.scenariosGrid}>
                {[{ key: "bull", data: analysis.bullCase, style: S.scenarioBull, color: "#3B6D11" },
                  { key: "base", data: analysis.baseCase, style: S.scenarioBase, color: "#185FA5" },
                  { key: "bear", data: analysis.bearCase, style: S.scenarioBear, color: "#A32D2D" }].map(({ key, data, style, color }) => (
                  <div key={key} style={style}>
                    <div style={S.scenarioName}>{data?.label || key} case</div>
                    <div style={{ fontSize: "17px", fontWeight: 600, color }}>{fmtPrice(data?.price)}</div>
                    <div style={S.scenarioDesc}>{data?.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "options" && (
        <div style={S.tabContent}>
          {options ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                {[
                  { label: "Call volume", value: fmtNum(options.callVolume), color: "#185FA5" },
                  { label: "Put volume", value: fmtNum(options.putVolume), color: "#A32D2D" },
                  { label: "Call open interest", value: fmtNum(options.callOI), color: "#185FA5" },
                  { label: "Put open interest", value: fmtNum(options.putOI), color: "#A32D2D" },
                  { label: "P/C vol ratio", value: options.pcRatioVol.toFixed(2), color: options.pcRatioVol > 1 ? "#A32D2D" : "#3B6D11" },
                  { label: "P/C OI ratio", value: options.pcRatioOI.toFixed(2), color: options.pcRatioOI > 1 ? "#A32D2D" : "#3B6D11" },
                ].map((m, i) => (
                  <div key={i} style={{ background: "#f8f7f4", borderRadius: "8px", padding: "10px 12px" }}>
                    <div style={S.metricLabel}>{m.label}</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={S.sectionLabel}>Open interest by strike — near current price (±15%)</div>
                <BarChart data={options.strikeData} currentPrice={options.currentPrice} />
              </div>
              <div>
                <div style={S.sectionLabel}>Options sentiment interpretation</div>
                <p style={S.rationale}>{analysis.optionsSentiment}</p>
              </div>
              <div style={{ fontSize: "11px", color: "#aaa" }}>Expiry: {options.expiryDate} · Data from Yahoo Finance (15-min delay during market hours)</div>
            </div>
          ) : (
            <div style={{ fontSize: "13px", color: "#888", padding: "1rem 0" }}>Options data unavailable for this ticker.</div>
          )}
        </div>
      )}

      {tab === "volume" && (
        <div style={S.tabContent}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
              {[
                { label: "Today's volume", value: fmtNum(priceData.volume), note: "" },
                { label: "Avg volume (3mo)", value: fmtNum(priceData.avgVolume), note: "" },
                { label: "Vol vs avg", value: priceData.avgVolume ? ((priceData.volume / priceData.avgVolume) * 100).toFixed(0) + "%" : "N/A", color: priceData.volume > priceData.avgVolume * 1.3 ? "#A32D2D" : "#3B6D11" },
              ].map((m, i) => (
                <div key={i} style={{ background: "#f8f7f4", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={S.metricLabel}>{m.label}</div>
                  <div style={{ fontSize: "16px", fontWeight: 600, color: m.color || "#111" }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={S.sectionLabel}>Daily volume — last 30 days</div>
              <VolumeChart history={priceData.history} />
            </div>
            <div>
              <div style={S.sectionLabel}>Volume context</div>
              <p style={S.rationale}>
                {priceData.volume > priceData.avgVolume * 1.5
                  ? `Today's volume of ${fmtNum(priceData.volume)} is significantly above the 3-month average of ${fmtNum(priceData.avgVolume)}, suggesting unusual institutional or retail activity. High volume on a price move typically confirms the direction.`
                  : priceData.volume < priceData.avgVolume * 0.7
                  ? `Today's volume of ${fmtNum(priceData.volume)} is below average (${fmtNum(priceData.avgVolume)}), indicating low conviction. Price moves on low volume are less reliable signals.`
                  : `Today's volume of ${fmtNum(priceData.volume)} is in line with the 3-month average of ${fmtNum(priceData.avgVolume)}, suggesting normal trading activity with no unusual pressure from either buyers or sellers.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "news" && (
        <div style={S.tabContent}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={sentStyle}>{analysis.newsSentimentLabel} news sentiment</span>
            </div>
            <p style={S.rationale}>{analysis.newsSummary}</p>
            <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.07)", paddingTop: "12px" }}>
              <div style={S.sectionLabel}>Recent headlines</div>
              {news.length > 0 ? news.map((n, i) => (
                <div key={i} style={S.newsItem}>
                  <a href={n.url} target="_blank" rel="noopener noreferrer" style={{ ...S.newsTitle, color: "#111", textDecoration: "none" }}>{n.title}</a>
                  <div style={S.newsMeta}>{n.publisher} · {n.time}</div>
                </div>
              )) : (
                <div style={{ fontSize: "13px", color: "#888" }}>No recent news found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [tickers, setTickers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function addTicker() {
    const val = inputVal.trim().toUpperCase().replace(/[^A-Z.]/g, "");
    if (!val || tickers.includes(val)) { setInputVal(""); return; }
    setTickers(prev => [...prev, val]);
    setInputVal("");
  }

  function removeTicker(t) { setTickers(prev => prev.filter(x => x !== t)); }

  async function runAnalysis() {
    if (!tickers.length) return;
    setLoading(true);
    setResults(tickers.map(t => ({ ticker: t, status: "loading" })));

    await Promise.all(tickers.map(async (ticker) => {
      try {
        const [priceData, fundamentals, options, news] = await Promise.all([
          fetchYahooData(ticker),
          fetchFundamentals(ticker),
          fetchOptions(ticker),
          fetchNews(ticker),
        ]);
        if (!priceData) throw new Error("Could not fetch price data. Check the ticker symbol.");
        const dataContext = buildContext(ticker, priceData, fundamentals, options, news);
        const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ticker, dataContext }) });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setResults(prev => prev.map(r => r.ticker === ticker ? { ticker, priceData, fundamentals, options, news, analysis: json.analysis, status: "done" } : r));
      } catch (e) {
        setResults(prev => prev.map(r => r.ticker === ticker ? { ticker, error: e.message, status: "error" } : r));
      }
    }));
    setLoading(false);
  }

  const hasResults = results.some(r => r.status === "done" || r.status === "error");

  return (
    <div style={S.page}>
      <div style={S.topbar}>
        <div>
          <span style={S.logo}>Stock dashboard</span>
          <span style={S.logoSub}>AI-powered valuation</span>
        </div>
        <div style={{ fontSize: "11px", color: "#bbb" }}>Live data · Yahoo Finance + Claude</div>
      </div>
      <div style={S.main}>
        <div style={S.addBar}>
          <input style={S.input} value={inputVal} onChange={e => setInputVal(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && addTicker()} placeholder="Enter ticker (AAPL, NVDA, MSFT…)" maxLength={10} />
          <button style={S.btnPrimary} onClick={addTicker}>+ Add</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.25rem", minHeight: "36px", alignItems: "center" }}>
          {tickers.length === 0 && <span style={{ fontSize: "13px", color: "#aaa", fontStyle: "italic" }}>No tickers added yet</span>}
          {tickers.map(t => (
            <span key={t} style={S.chip}>{t}<button style={S.chipX} onClick={() => removeTicker(t)}>×</button></span>
          ))}
        </div>
        <div style={{ marginBottom: "1.75rem" }}>
          <button style={tickers.length === 0 || loading ? S.btnDisabled : S.btnPrimary} onClick={runAnalysis} disabled={tickers.length === 0 || loading}>
            {loading ? "Analyzing…" : "Analyze all tickers"}
          </button>
        </div>
        <div>
          {results.map(r => {
            if (r.status === "loading") return (
              <div key={r.ticker} style={S.loadingCard}>
                <div style={{ width: "28px", height: "28px", border: "2px solid #ddd", borderTopColor: "#185FA5", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <div style={{ fontSize: "15px", fontWeight: 600 }}>{r.ticker}</div>
                <div style={{ fontSize: "13px", color: "#888" }}>Fetching price, options, news & running analysis…</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            );
            if (r.status === "error") return <div key={r.ticker} style={S.errorCard}><strong>{r.ticker}</strong> — {r.error}</div>;
            if (r.status === "done") return <StockCard key={r.ticker} ticker={r.ticker} priceData={r.priceData} fundamentals={r.fundamentals} options={r.options} news={r.news} analysis={r.analysis} />;
            return null;
          })}
        </div>
        {hasResults && <p style={S.disclaimer}>⚠ For informational purposes only. Not financial advice. Fair value estimates are model-generated. Always do your own research before investing.</p>}
      </div>
    </div>
  );
}
