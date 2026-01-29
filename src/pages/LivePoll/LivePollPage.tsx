import { useActivePoll } from "../../customHooks/usePolls";
import LiveResults from "../../components/live/LiveResults";
import "./LivePollPage.css";

export default function LivePollPage() {
  const { poll, loading, error } = useActivePoll();

  return (
    <div className="live-poll-page">
      <div className="live-poll-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="live-indicator">🔴</span>
            Live Poll Monitoring
          </h1>
          <p className="page-subtitle">Real-time results and participant activity</p>
        </div>
        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-value">{poll?.totalVotes || 0}</span>
            <span className="stat-label">Active Votes</span>
          </div>
          <div className="stat-chip">
            <span className="stat-value">{poll?.totalVotes || 0}</span>
            <span className="stat-label">Participants</span>
          </div>
        </div>
      </div>

      <div className="live-content">
        {loading && <p>Loading poll data...</p>}
        {error && <p className="error">Error: {error}</p>}
        {poll && <LiveResults poll={poll} />}
        {!loading && !error && !poll && <p>No active poll found</p>}
      </div>
    </div>
  );
}
