import { useActivePoll, useClosePoll, useDeletePoll } from "../../customHooks/usePolls";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { poll, loading: pollLoading, refetch } = useActivePoll();
  const { closePoll, loading: closeLoading } = useClosePoll();
  const { deletePoll, loading: deleteLoading } = useDeletePoll();

  // Case-insensitive check - works with both "ACTIVE" and "active"
  const isActive = poll?.status?.toUpperCase() === 'ACTIVE';

  const onClose = async () => {
    if (!poll) return;

    try {
      await closePoll(poll.id);
      alert("Poll closed successfully");
      refetch(); // Refresh poll data
    } catch {
      alert("Error closing poll");
    }
  };

  const onDelete = async () => {
    if (!poll) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${poll.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deletePoll(poll.id);
      alert("Poll deleted successfully");
      refetch(); // Refresh poll data
    } catch {
      alert("Error deleting poll");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage your polls and view analytics</p>
      </div>

      <div className="dashboard-grid">
        {/* Quick Stats */}
        <div className="dashboard-card stats-card">
          <h2 className="card-title">Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{poll ? 1 : 0}</div>
              <div className="stat-label">Active Polls</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{poll?.totalVotes || 0}</div>
              <div className="stat-label">Total Votes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{poll?.totalVotes || 0}</div>
              <div className="stat-label">Participants</div>
            </div>
          </div>
        </div>

        {/* Current Poll Management */}
        <div className="dashboard-card action-card">
          <h2 className="card-title">Current Poll</h2>
          {pollLoading ? (
            <p className="card-description">Loading poll...</p>
          ) : poll ? (
            <>
              <p className="card-description">
                <strong>{poll.title}</strong>
                <br />
                {poll.description}
              </p>
              <p className="card-description">
                Status: <span className={`status-${poll.status?.toLowerCase()}`}>
                  {poll.status?.toUpperCase()}
                </span>
              </p>
              <div className="button-group">
                <button 
                  className="btn-primary" 
                  disabled={closeLoading || deleteLoading || !isActive} 
                  onClick={onClose}
                >
                  {closeLoading ? "Closing…" : "Close Poll"}
                </button>
                <button 
                  className="btn-danger" 
                  disabled={closeLoading || deleteLoading} 
                  onClick={onDelete}
                >
                  {deleteLoading ? "Deleting…" : "Delete Poll"}
                </button>
              </div>
            </>
          ) : (
            <p className="card-description">No active poll found</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <h2 className="card-title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"></div>
              <div className="activity-content">
                <div className="activity-title">No recent activity</div>
                <div className="activity-time">Start by creating a poll</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
