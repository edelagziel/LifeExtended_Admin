export async function closePoll(pollId: string) {
  // השינוי הוא כאן: מחקנו את הדומיין והשארנו רק את הנתיב
  const res = await fetch(
    "/admin/close-poll", 
    {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-api-key": "da2-p4q37etihjbuhifsro67t3epfm"
      },
      body: JSON.stringify({ pollId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to close poll");
  }

  return res.json();
}