import type { Poll, CreatePollDTO, UpdatePollDTO, ApiResponse } from "../types/poll.types";

const API_KEY = "da2-p4q37etihjbuhifsro67t3epfm";
const BASE_URL = "/admin";

// Headers for all requests
const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});

/**
 * Get the currently active poll
 */
export async function getActivePoll(): Promise<Poll> {
  const res = await fetch(`${BASE_URL}/active-poll`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch active poll");
  }

  return res.json();
}

/**
 * Create a new poll
 */
export async function createPoll(data: CreatePollDTO): Promise<ApiResponse<Poll>> {
  const res = await fetch(`${BASE_URL}/create-poll`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create poll");
  }

  return res.json();
}

/**
 * Update an existing poll
 */
export async function updatePoll(
  pollId: string,
  data: UpdatePollDTO
): Promise<ApiResponse<Poll>> {
  const res = await fetch(`${BASE_URL}/update-poll`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ pollId, ...data }),
  });

  if (!res.ok) {
    throw new Error("Failed to update poll");
  }

  return res.json();
}

/**
 * Delete a poll
 */
export async function deletePoll(pollId: string): Promise<ApiResponse<void>> {
  const res = await fetch(`${BASE_URL}/delete-poll`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ pollId }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete poll");
  }

  return res.json();
}

/**
 * Close the active poll
 */
export async function closePoll(pollId: string): Promise<ApiResponse<Poll>> {
  const res = await fetch(`${BASE_URL}/close-poll`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ pollId }),
  });

  if (!res.ok) {
    throw new Error("Failed to close poll");
  }

  return res.json();
}
