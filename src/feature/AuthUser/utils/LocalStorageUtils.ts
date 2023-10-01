const currentAccessToken = "access_token";
const currentTogglApiToken = "toggl_api_token";
const currentUserId = "currentUserId";
const currentUserSettinsId = "currentUserSettinsId";

export function setAccessTokenLocalStorage(accessToken: string): void {
  localStorage.setItem(currentAccessToken, accessToken);
}

export function setTogglApiTokenLocalStorage(togglApiToken: string): void {
  localStorage.setItem(currentTogglApiToken, togglApiToken);
}

export function setUserIdInLocalStorage(userId: string): void {
  localStorage.setItem(currentUserId, userId);
}

export function currentUserSettinsIdInLocalStorage(userId: string): void {
  localStorage.setItem(currentUserSettinsId, userId);
}

export function getAccessTokenFromLocalStorage(): string | null {
  return localStorage.getItem(currentAccessToken);
}

export function getTogglApiTokenLocalStorage(): string | null {
  return localStorage.getItem(currentTogglApiToken);
}

export function getUserIdFromLocalStorage(): string | null {
  return localStorage.getItem(currentUserId);
}

export function getUserSettingsIdFromLocalStorage(): string | null {
  return localStorage.getItem(currentUserSettinsId);
}

export function removeUserIdFromLocalStorage(): void {
  localStorage.removeItem(currentUserId);
}
