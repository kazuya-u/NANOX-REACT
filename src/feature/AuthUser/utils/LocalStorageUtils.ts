const currentUserId = "currentUserId";

export function setUserIdInLocalStorage(userId: string): void {
  localStorage.setItem(currentUserId, userId);
}

export function getUserIdFromLocalStorage(): string | null {
  return localStorage.getItem(currentUserId);
}

export function removeUserIdFromLocalStorage(): void {
  localStorage.removeItem(currentUserId);
}
