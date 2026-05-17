import { useEffect, useState } from "react";
import { getRaceData } from "./api/kraApi";

export default function App() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRaceData = async () => {
    try {
      setLoading(true);

      const data = await getRaceData();

      if (data) {
        setRaces(data?.response?.body?.items?.item || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRaceData();

    const interval = setInterval(() => {
      loadRaceData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "#00E87A" }}>
        🏇 경마 인텔리전스
      </h1>

      <div style={{ marginBottom: 20 }}>
        실시간 한국마사회 데이터
      </div>

      {loading && <div>로딩중...</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20
        }}
      >
        {races.map((race, idx) => (
          <div
            key={idx}
            style={{
              background: "#13151E",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #1E2235"
            }}
          >
            <h2 style={{ color: "#00E87A" }}>
              {race.rcNo || idx + 1}경주
            </h2>

            <div>경주명: {race.rcName || "정보없음"}</div>
            <div>거리: {race.dist || "정보없음"}m</div>
            <div>등급: {race.grade || "정보없음"}</div>

            <button
              style={{
                marginTop: 15,
                width: "100%",
                padding: 12,
                background: "#00E87A",
                color: "black",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              AI 분석
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}