export function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeBase64(base64));
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

export function decodeBase64(str: string) {
  try {
    return atob(str);
  } catch (error) {
    throw new Error('Invalid base64 string');
  }
} 