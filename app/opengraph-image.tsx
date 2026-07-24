import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.shortName} - ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #102235 0%, #062a42 100%)",
          color: "white",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
            <div
              style={{
                background: "#5ed5d2",
                clipPath: "polygon(0 0, 100% 0, 44% 42%, 27% 100%, 22% 49%)",
                height: 72,
                width: 72
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>{site.shortName}</div>
              <div style={{ color: "#d9f2ec", fontSize: 22, marginTop: 8 }}>Technologies and Consultancy Ltd</div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -1, lineHeight: 1.06, marginTop: 70 }}>
            {site.tagline}
          </div>
          <div style={{ color: "#d9f2ec", fontSize: 26, lineHeight: 1.35, marginTop: 30 }}>
            Salesforce, AI, data, integration and technical delivery.
          </div>
        </div>
        <div style={{ display: "flex", height: 430, position: "relative", width: 360 }}>
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              style={{
                background: index % 7 === 0 ? "#f1ab2c" : "#5ed5d2",
                borderRadius: 999,
                height: index % 5 === 0 ? 10 : 6,
                left: `${(index * 47) % 330}px`,
                opacity: 0.82,
                position: "absolute",
                top: `${(index * 71) % 390}px`,
                width: index % 5 === 0 ? 10 : 6
              }}
            />
          ))}
          <div
            style={{
              border: "1px solid rgba(94,213,210,.45)",
              height: 270,
              left: 40,
              position: "absolute",
              top: 70,
              transform: "rotate(45deg)",
              width: 270
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
