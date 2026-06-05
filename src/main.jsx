import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import heroNotebook from "./assets/hero-notebook.png";

const cards = [
  {
    id: "combustion",
    label: "Combustion",
    className: "combustion-card",
  },
  {
    id: "fossil-fuels",
    label: "Fossil Fuels",
    className: "fossil-card",
  },
  {
    id: "biofuels",
    label: "Biofuels",
    className: "biofuels-card",
  },
  {
    id: "fuel-cells",
    label: "Fuel Cells",
    className: "fuel-cells-card",
  },
];

function toCssPercent(box) {
  return [
    `left: ${box.left.toFixed(2)}%;`,
    `top: ${box.top.toFixed(2)}%;`,
    `width: ${box.width.toFixed(2)}%;`,
    `height: ${box.height.toFixed(2)}%;`,
  ].join("\n");
}

function CalibrationApp() {
  const frameRef = useRef(null);
  const [activeId, setActiveId] = useState(cards[0].id);
  const [boxes, setBoxes] = useState({});
  const [draft, setDraft] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const activeCard = cards.find((card) => card.id === activeId) ?? cards[0];

  const output = useMemo(
    () =>
      cards
        .map((card) => {
          const box = boxes[card.id];
          if (!box) return `.${card.className} {\n  /* draw this box */\n}`;
          return `.${card.className} {\n  ${toCssPercent(box).replaceAll("\n", "\n  ")}\n}`;
        })
        .join("\n\n"),
    [boxes],
  );

  function pointFromEvent(event) {
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
    return {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    };
  }

  function startDraw(event) {
    if (event.button !== 0) return;
    const point = pointFromEvent(event);
    setDraft({ startX: point.x, startY: point.y, left: point.x, top: point.y, width: 0, height: 0 });
  }

  function moveDraw(event) {
    if (!draft) return;
    const point = pointFromEvent(event);
    const left = Math.min(draft.startX, point.x);
    const top = Math.min(draft.startY, point.y);
    const width = Math.abs(point.x - draft.startX);
    const height = Math.abs(point.y - draft.startY);
    setDraft({ ...draft, left, top, width, height });
  }

  function endDraw() {
    if (!draft) return;
    if (draft.width > 0.4 && draft.height > 0.4) {
      setBoxes((current) => ({
        ...current,
        [activeId]: {
          left: draft.left,
          top: draft.top,
          width: draft.width,
          height: draft.height,
        },
      }));
      const currentIndex = cards.findIndex((card) => card.id === activeId);
      const next = cards[currentIndex + 1];
      if (next) setActiveId(next.id);
    }
    setDraft(null);
  }

  return (
    <main className={`calibrator ${isPreviewing ? "previewing" : ""}`}>
      <div
        className="calibration-frame"
        ref={frameRef}
        onMouseDown={isPreviewing ? undefined : startDraw}
        onMouseMove={isPreviewing ? undefined : moveDraw}
        onMouseUp={isPreviewing ? undefined : endDraw}
        onMouseLeave={isPreviewing ? undefined : endDraw}
      >
        <img
          className="notebook"
          src={heroNotebook}
          alt="Open IB Chemistry notebook for hotspot calibration"
          draggable="false"
        />
        {cards.map((card) => {
          const box = boxes[card.id];
          return box ? (
            <div
              key={card.id}
              className={`calibration-box ${card.id === activeId ? "active" : ""}`}
              style={{
                left: `${box.left}%`,
                top: `${box.top}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
              }}
            >
              {card.label}
            </div>
          ) : null;
        })}
        {draft ? (
          <div
            className="calibration-box draft"
            style={{
              left: `${draft.left}%`,
              top: `${draft.top}%`,
              width: `${draft.width}%`,
              height: `${draft.height}%`,
            }}
          >
            {activeCard.label}
          </div>
        ) : null}
        {isPreviewing
          ? cards.map((card) => {
              const box = boxes[card.id];
              if (!box) return null;
              return (
                <a
                  key={card.id}
                  className="preview-hotspot"
                  href={`#${card.id}`}
                  aria-label={`Preview ${card.label}`}
                  style={{
                    left: `${box.left}%`,
                    top: `${box.top}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                  }}
                />
              );
            })
          : null}
      </div>

      <button
        type="button"
        className="panel-toggle"
        onClick={() => setIsPanelOpen((value) => !value)}
      >
        {isPanelOpen ? "Hide Menu" : "Show Menu"}
      </button>

      <aside className={`calibration-panel ${isPanelOpen ? "open" : "closed"}`}>
        <h1>{isPreviewing ? "Preview Boxes" : "Draw Boxes"}</h1>
        <p>Click a label, then drag around that exact card.</p>
        <div className="calibration-buttons">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={activeId === card.id ? "selected" : ""}
              onClick={() => setActiveId(card.id)}
            >
              {card.label}
            </button>
          ))}
        </div>
        <textarea readOnly value={output} aria-label="Generated hotspot CSS" />
        <button
          type="button"
          className={isPreviewing ? "selected" : ""}
          onClick={() => setIsPreviewing((value) => !value)}
        >
          {isPreviewing ? "Back to Drawing" : "Preview Hover"}
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(output)}
        >
          Copy CSS
        </button>
      </aside>
    </main>
  );
}

function App() {
  if (window.location.search.includes("calibrate")) {
    return <CalibrationApp />;
  }

  return (
    <main className="image-map">
      <h1 className="sr-only">Energy from Fuel</h1>
      <div className="image-frame" style={{ "--hero-image": `url(${heroNotebook})` }}>
        <img
          className="notebook"
          src={heroNotebook}
          alt="Open IB Chemistry notebook titled Energy from Fuel with project map and four topic cards"
        />
        {cards.map((card) => (
          <a
            key={card.id}
            className={`card-hotspot ${card.className}`}
            href={`#${card.id}`}
            aria-label={card.label}
          />
        ))}
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
