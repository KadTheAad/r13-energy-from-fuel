import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import heroNotebook from "./assets/hero-notebook.png";
import notebookBg from "./assets/notebook-bg.png";
import combustionCard from "./assets/card-combustion.png";
import fossilCard from "./assets/card-fossil-fuels.png";
import biofuelsCard from "./assets/card-biofuels.png";
import fuelCellsCard from "./assets/card-fuel-cells.png";

const cards = [
  {
    id: "combustion",
    label: "Combustion",
    className: "combustion-card",
    image: combustionCard,
    theme: "fire",
    tag: "Energy released",
    paragraphs: [
      "Combustion is a chemical reaction in which a fuel reacts with oxygen and releases energy, usually as heat and light. In hydrocarbon fuels, complete combustion happens when there is enough oxygen for carbon and hydrogen atoms to fully react.",
      "Incomplete combustion happens when oxygen is limited. It can produce carbon monoxide or soot instead of only carbon dioxide and water. Carbon monoxide is especially dangerous because it is colorless, poisonous, and interferes with oxygen transport in blood.",
      "Combustion is useful because it releases energy quickly and reliably, but it can also produce greenhouse gases and air pollutants. Even complete combustion releases carbon dioxide when the fuel contains carbon.",
    ],
    questions: [
      "What two products form during complete combustion of a hydrocarbon?",
      "Why can incomplete combustion produce carbon monoxide?",
      "Why is combustion useful but environmentally challenging?",
    ],
    source: "Chemistry LibreTexts",
    media: {
      video: {
        label: "Complete and Incomplete Combustion",
        url: "https://www.youtube.com/watch?v=cRnpKjHpFyg",
      },
      reading: {
        label: "Combustion overview",
        url: "https://www.britannica.com/science/combustion",
      },
      graphic: {
        label: "Fire triangle graphic",
        url: "https://commons.wikimedia.org/wiki/File:Fire_triangle.svg",
      },
    },
  },
  {
    id: "fossil-fuels",
    label: "Fossil Fuels",
    className: "fossil-card",
    image: fossilCard,
    theme: "fossil",
    tag: "Ancient energy, modern impact",
    paragraphs: [
      "Fossil fuels include coal, oil, and natural gas. They formed over millions of years from ancient living matter buried, compressed, and changed by heat and pressure. They are non-renewable because humans use them far faster than they form.",
      "They remain widely used because they are energy-dense, reliable, and supported by huge infrastructure for electricity, heating, transportation, and industry. That makes replacing them quickly difficult.",
      "The major challenge is that burning fossil fuels releases carbon dioxide and other pollutants. They provide dependable energy, but their climate and air-quality impacts are why alternatives matter.",
    ],
    questions: [
      "Why are fossil fuels considered non-renewable?",
      "What makes fossil fuels hard to replace quickly?",
      "Why should fossil fuel alternatives be used?",
    ],
    source: "DOE, EIA, NASA",
    media: {
      video: {
        label: "NASA fossil fuel CO2 visualization",
        url: "https://www.youtube.com/watch?v=1rZDJrVcie4",
      },
      reading: {
        label: "U.S. energy facts",
        url: "https://www.eia.gov/energyexplained/us-energy-facts/data-and-statistics.php",
      },
      graphic: {
        label: "NASA fossil fuel emissions graphic",
        url: "https://science.nasa.gov/earth/earth-observatory/emissions-from-fossil-fuels-continue-to-rise-152519/",
      },
    },
  },
  {
    id: "biofuels",
    label: "Biofuels",
    className: "biofuels-card",
    image: biofuelsCard,
    theme: "bio",
    tag: "Renewable possibilities",
    paragraphs: [
      "Biofuels are fuels made from biomass, which means recently living material such as crops, plant waste, wood, algae, used cooking oil, or animal fats. Ethanol, biodiesel, and renewable diesel are common transportation biofuels.",
      "Biofuels can reduce dependence on petroleum because they can replace or blend with gasoline, diesel, and jet fuel. Some can work with existing engines and fuel systems, which makes them practical as transition fuels.",
      "The challenge is that biofuels are not automatically carbon-free. Their real impact depends on land use, growing methods, processing energy, transportation, and whether they compete with food production.",
    ],
    questions: [
      "What does biomass mean?",
      "How can biofuels reduce petroleum use?",
      "Why are biofuels not automatically carbon-neutral?",
    ],
    source: "EIA, DOE",
    media: {
      video: {
        label: "Energy 101: Biofuels",
        url: "https://www.energy.gov/energysaver/articles/energy-101-video-biofuels",
      },
      reading: {
        label: "Biofuels explained",
        url: "https://www.eia.gov/energyexplained/biofuels/",
      },
      graphic: {
        label: "Biofuels and biomass graphic",
        url: "https://www.eia.gov/energyexplained/biofuels/",
      },
    },
  },
  {
    id: "fuel-cells",
    label: "Fuel Cells",
    className: "fuel-cells-card",
    image: fuelCellsCard,
    theme: "cell",
    tag: "Clean energy, powered by chemistry",
    paragraphs: [
      "A fuel cell converts chemical energy directly into electrical energy. In a hydrogen fuel cell, hydrogen enters the anode and oxygen enters the cathode. Electrons travel through an external circuit, creating electric current.",
      "Fuel cells are different from combustion because the fuel is not burned. With hydrogen, the point-of-use products are electricity, water, and heat, making fuel cells attractive for clean transport and backup power.",
      "The main challenges are hydrogen production, storage, cost, and infrastructure. Hydrogen must be produced cleanly, and it is difficult to store because it has low energy content by volume.",
    ],
    questions: [
      "How does a fuel cell create electric current?",
      "Why are hydrogen fuel cells clean at the point of use?",
      "What are two barriers to widespread fuel cell use?",
    ],
    source: "DOE, AFDC, GAO",
    media: {
      video: {
        label: "Hydrogen and fuel cells basics",
        url: "https://www.energy.gov/eere/fuelcells/fuel-cell-animation",
      },
      reading: {
        label: "Fuel cells explained",
        url: "https://www.energy.gov/eere/fuelcells/fuel-cells",
      },
      graphic: {
        label: "Fuel cell parts diagram",
        url: "https://www.energy.gov/eere/fuelcells/parts-fuel-cell",
      },
    },
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
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  if (window.location.search.includes("calibrate")) {
    return <CalibrationApp />;
  }

  const activeTopic = cards.find((card) => hash === `#${card.id}`);
  if (activeTopic) {
    return <InfoPage topic={activeTopic} />;
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

function InfoPage({ topic }) {
  return (
    <main className={`info-page ${topic.theme}`} style={{ "--notebook-bg": `url(${notebookBg})` }}>
      <a className="back-home" href="./">
        Back to notebook
      </a>
      <section className="info-spread">
        <div className="info-card">
          <img src={topic.image} alt={`${topic.label} visual notebook card`} />
        </div>
        <article className="info-copy">
          <p className="topic-tag">{topic.tag}</p>
          <h1>{topic.label}</h1>
          {topic.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="source-note">Source trail: {topic.source}</p>
        </article>
        <aside className="question-note">
          <h2>Check Questions</h2>
          <ol>
            {topic.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </aside>
        <aside className="media-note">
          <h2>Explore More</h2>
          <a href={topic.media.video.url} target="_blank" rel="noreferrer">
            <span>Video</span>
            {topic.media.video.label}
          </a>
          <a href={topic.media.reading.url} target="_blank" rel="noreferrer">
            <span>Reading</span>
            {topic.media.reading.label}
          </a>
          <a href={topic.media.graphic.url} target="_blank" rel="noreferrer">
            <span>Graphic</span>
            {topic.media.graphic.label}
          </a>
        </aside>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
