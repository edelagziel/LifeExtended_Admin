import { useState } from "react";
import "./CreatePollPage.css";

export default function CreatePollPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateOption(index: number, value: string) {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  async function submitPoll() {
    setLoading(true);
    setMessage(null);

    try {
      // כרגע רק סימולציה — בהמשך API אמיתי
      console.log({
        title,
        description,
        options: options.filter(Boolean),
      });

      setMessage("✅ Poll created successfully");
      setTitle("");
      setDescription("");
      setOptions(["", ""]);
    } catch (err) {
      setMessage("❌ Failed to create poll");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-poll">
      <h1>Create New Poll</h1>

      <label>
        Poll Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter poll title"
        />
      </label>

      <label>
        Poll Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter poll description (optional)"
          rows={4}
        />
      </label>

      <div className="options">
        <h3>Options</h3>

        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) => updateOption(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
          />
        ))}

        <button onClick={addOption}>+ Add option</button>
      </div>

      <button onClick={submitPoll} disabled={loading || !title}>
        {loading ? "Creating..." : "Create Poll"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
