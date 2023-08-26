const currentUserId = "currentUserId";
const currentAccessToken = "access_token";

export function setAccessTokenLocalStorage(accessToken: string): void {
  localStorage.setItem(currentAccessToken, accessToken);
}

export function setUserIdInLocalStorage(userId: string): void {
  localStorage.setItem(currentUserId, userId);
}

export function getAccessTokenFromLocalStorage(): string | null {
  return localStorage.getItem(currentAccessToken);
}

export function getUserIdFromLocalStorage(): string | null {
  return localStorage.getItem(currentUserId);
}

export function removeUserIdFromLocalStorage(): void {
  localStorage.removeItem(currentUserId);
}
