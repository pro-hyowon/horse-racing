const SERVICE_KEY = import.meta.env.VITE_KRA_API_KEY;

export async function getRaceData() {
  try {
    const url =
      `https://apis.data.go.kr/B551015/API187` +
      `?serviceKey=${SERVICE_KEY}` +
      `&_type=json`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API 호출 실패");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}