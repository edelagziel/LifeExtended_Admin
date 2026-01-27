import { closePoll } from "../../aws/adminApi";
import { useState } from "react";
import "./DashboardPage.css";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const onClose = async () => {
    setLoading(true);
    try {
      await closePoll("main");
      alert("Poll closed successfully");
    } catch {
      alert("Error closing poll");
    } finally {
      setLoading(false);
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
              <div className="stat-value">0</div>
              <div className="stat-label">Active Polls</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Total Votes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Participants</div>
            </div>
          </div>
        </div>

        {/* Current Poll Management */}
        <div className="dashboard-card action-card">
          <h2 className="card-title">Current Poll</h2>
          <p className="card-description">
            Control the active poll and manage responses
          </p>
          <button 
            className="btn-primary" 
            disabled={loading} 
            onClick={onClose}
          >
            {loading ? "Closing…" : "Close Current Poll"}
          </button>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <h2 className="card-title">Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📊</div>
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
