export async function login(username: string, password: string): Promise<string> {
  const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/user/login?_format=json`;

  try {
    const loginResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        name: username,
        pass: password
      }),
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log(loginData);
      const currentUserId = loginData.current_user.uuid;
      return currentUserId;
    } else {
      throw new Error('ログインに失敗しました。');
    }
  } catch (error) {
    throw new Error('ネットワークエラー: ' + error);
  }
}
