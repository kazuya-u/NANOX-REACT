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

export async function getUserUUID(username: string, password: string): Promise<string> {
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/user/login?_format=json`;
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  };
  const data = {
    name: username,
    pass: password,
  }
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const currentUserId = responseData.current_user.uuid;
    return currentUserId;
  } catch (error) {
    throw new Error("ネットワークエラー: " + error);
  }
}
