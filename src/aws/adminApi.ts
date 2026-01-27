export async function closePoll(pollId: string) {
  const res = await fetch(
    "https://dtzmmrctgwvht.cloudfront.net/admin/close-poll",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pollId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to close poll");
  }

  return res.json();
}
