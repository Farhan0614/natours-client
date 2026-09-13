// src/app/global-error.js
// Last-resort boundary: catches errors that escape app/error.js,
// including errors thrown by the root layout itself.
// NOTE: it MUST render its own <html> and <body> tags.

"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f8fafc",
          color: "#334155",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            color: "#dc2626",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Something went really wrong!
        </h2>
        <p style={{ marginBottom: "2rem", maxWidth: "32rem" }}>
          {error?.message || "An unexpected application error occurred."}
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#10b981",
            color: "#fff",
            border: "none",
            padding: "0.75rem 2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
