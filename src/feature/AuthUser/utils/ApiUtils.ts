import { BASE_API_URL } from "../../../utils/EndPoint";
import { currentUserSettinsIdInLocalStorage, getAccessTokenFromLocalStorage } from "./LocalStorageUtils";

type TokenResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export async function getToken(username: string, password: string): Promise<TokenResponse> {
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/oauth/token`;
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);
  data.append('grant_type', 'password');
  data.append('client_id', 'W9U9vcWpmPHjK-pI8ss_RnpOv1dEyTKgUv7WiZc_xP8');
  data.append('client_secret', '@');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/vnd.api+json'
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: data
    });
    return await response.json() as TokenResponse;
  } catch (error) {
    throw new Error("ネットワークエラー: " + error);
  }
}

export async function getIds(): Promise<{UserId: string, UsId: string}> {
  const accessToken = getAccessTokenFromLocalStorage();
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/login-data`;
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
    "Authorization": `Bearer ${accessToken}`,
  };
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
    });
    const responseData = await response.json();
    return {
      UserId: responseData[0].UserUUID,
      UsId: responseData[0].UsUUID,
    }
  } catch (error) {
    throw new Error("ネットワークエラー: " + error);
  }
}

export async function getUserSettinsUUID(): Promise<boolean> {
  let resFlag: boolean;
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
    "Authorization": `Bearer ${accessToken}`,
  };
  const response = await fetch(`${BASE_API_URL}/jsonapi/us/us`, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    resFlag = false;
    return resFlag;
  }
  const responseData =  await response.json();
  currentUserSettinsIdInLocalStorage(responseData?.data[0].id);
  resFlag = true;
  return resFlag;
}
