function b64urlToB64(s: string) {
  const r = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = r.length % 4;
  return pad ? r + '='.repeat(4 - pad) : r;
}

function decodePart(part: string) {
  const b64 = b64urlToB64(part);
  try {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
  } catch {
    return JSON.parse(atob(b64));
  }
}

export function decodeJwt(token: string) {
  const [header, payload] = token.split('.');
  return {
    header: decodePart(header) as JwtPayload,
    payload: decodePart(payload) as JwtPayload,
  };
}
