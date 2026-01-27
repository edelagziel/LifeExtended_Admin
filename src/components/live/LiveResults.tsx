import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import "./LiveResults.css";

/* ========= GraphQL client ========= */
const client = generateClient();

/* ========= Subscription ========= */
const ON_STATS_UPDATED = /* GraphQL */ `
  subscription ListenToUpdates {
    onStatsUpdated {
      standings
    }
  }
`;

/* ========= Types ========= */
type LiveStats = {
  statName?: string;
  totalVotes?: number;
  [key: string]: any;
};

export default function LiveResults() {
  const [data, setData] = useState<LiveStats | null>(null);
  const [status, setStatus] = useState("Connecting…");

  /* ========= Subscribe on mount ========= */
  useEffect(() => {
    console.log("🔌 Connecting to AppSync subscription...");

    const sub = (client.graphql({ query: ON_STATS_UPDATED }) as any).subscribe({
      next: ({ data }: any) => {
          try {
            const parsed = JSON.parse(data.onStatsUpdated.standings);
            setData(parsed);
            setStatus("Live ");
          } catch (err) {
            console.error(" JSON parse error", err);
          }
        },
        error: (err: any) => {
          console.error(" Subscription error", err);
          setStatus("Disconnected ");
        },
      });

    return () => sub.unsubscribe();
  }, []);

  /* ========= UI ========= */
  if (!data) {
    return (
      <div className="container">
        <div className="card">
          <h3>Waiting for live data…</h3>
          <p>Status: {status}</p>
        </div>
      </div>
    );
  }

  const { statName, totalVotes, ...choices } = data;

  return (
    <div className="container">
      <div className="header">
        <h1>{statName || "Live Survey Results"}</h1>
        <p>Total Participants: {totalVotes ?? 0}</p>
        <span>Status: {status}</span>
      </div>

      <div className="grid">
        {Object.entries(choices).map(([key, value]) => (
          <div key={key} className="resultCard">
            <h3>{key}</h3>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

