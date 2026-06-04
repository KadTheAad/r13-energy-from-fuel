import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import heroNotebook from "./assets/hero-notebook.png";
import notebookBg from "./assets/notebook-bg.png";
import combustionCard from "./assets/card-combustion.png";
import fossilCard from "./assets/card-fossil-fuels.png";
import biofuelsCard from "./assets/card-biofuels.png";
import fuelCellsCard from "./assets/card-fuel-cells.png";

const sources = [
  {
    label: "Chemistry LibreTexts",
    title: "Complete vs. Incomplete Combustion of Alkanes",
    url: "https://chem.libretexts.org/Workbench/Chemistry_LHS_Bridge/12%3A_Alkanes/12.04%3A_Reactivity_of_Alkanes/12.4.03%3A_Complete_vs._Incomplete_Combustion_of_Alkanes",
  },
  {
    label: "U.S. Department of Energy",
    title: "Fossil",
    url: "https://www.energy.gov/fossil",
  },
  {
    label: "U.S. Energy Information Administration",
    title: "U.S. energy facts explained",
    url: "https://www.eia.gov/energyexplained/us-energy-facts/data-and-statistics.php",
  },
  {
    label: "NASA Earth Observatory",
    title: "Emissions from Fossil Fuels Continue to Rise",
    url: "https://science.nasa.gov/earth/earth-observatory/emissions-from-fossil-fuels-continue-to-rise-152519/",
  },
  {
    label: "U.S. Energy Information Administration",
    title: "Biofuels explained",
    url: "https://www.eia.gov/energyexplained/biofuels/",
  },
  {
    label: "U.S. Energy Information Administration",
    title: "Biofuels and the environment",
    url: "https://www.eia.gov/energyexplained/biofuels/biofuels-and-the-environment.php",
  },
  {
    label: "U.S. Department of Energy",
    title: "Biofuels: Energy for Transportation",
    url: "https://www.energy.gov/cmei/fuels/biofuels-energy-transportation",
  },
  {
    label: "U.S. Department of Energy",
    title: "Fuel Cells",
    url: "https://www.energy.gov/cmei/fuels/fuel-cells",
  },
  {
    label: "Alternative Fuels Data Center",
    title: "Hydrogen Benefits and Considerations",
    url: "https://afdc.energy.gov/fuels/hydrogen-benefits",
  },
  {
    label: "U.S. Government Accountability Office",
    title: "Hydrogen Energy Technologies",
    url: "https://www.gao.gov/products/gao-26-107932",
  },
];

const topics = [
  {
    id: "combustion",
    title: "Combustion",
    number: "03",
    short: "Energy released",
    color: "fire",
    image: combustionCard,
    alt: "Torn paper Combustion topic card with flame and reaction sketch",
    paragraphs: [
      "Combustion is a chemical reaction in which a fuel reacts with oxygen and releases energy, usually as heat and light. In hydrocarbon fuels, complete combustion happens when there is enough oxygen for the carbon and hydrogen atoms to fully react. The typical products are carbon dioxide and water.",
      "Incomplete combustion happens when there is not enough oxygen. Instead of producing only carbon dioxide and water, the reaction can also produce carbon monoxide or solid carbon particles, often seen as soot or a yellow smoky flame. Carbon monoxide is especially dangerous because it is colorless, poisonous, and interferes with the blood's ability to carry oxygen.",
      "The main benefit of combustion is that it releases energy quickly and reliably. The challenge is that combustion can produce greenhouse gases and air pollutants. Even when combustion is complete, carbon dioxide is still released if the fuel contains carbon.",
    ],
    questions: [
      "What two products form during complete combustion of a hydrocarbon?",
      "Why can incomplete combustion produce carbon monoxide?",
      "Why is combustion useful for energy needs but also environmentally challenging?",
    ],
    graphic: "Split flame diagram: blue complete combustion beside yellow smoky incomplete combustion.",
    source: sources[0],
  },
  {
    id: "fossil-fuels",
    title: "Fossil Fuels",
    number: "04",
    short: "Ancient energy, modern impact",
    color: "fossil",
    image: fossilCard,
    alt: "Torn paper Fossil Fuels topic card with coal, oil, and pumpjack sketches",
    paragraphs: [
      "Fossil fuels include coal, oil, and natural gas. They formed over millions of years from ancient plants and animals that were buried, compressed, and changed by heat and pressure. They are considered non-renewable because they form far more slowly than humans use them.",
      "Fossil fuels are widely used because they are energy-dense, reliable, and supported by huge existing infrastructure. In the United States, petroleum, natural gas, and coal still make up most primary energy consumption, which helps explain why they are difficult to replace quickly.",
      "The biggest challenge is that burning fossil fuels releases carbon dioxide and other pollutants. NASA has reported record fossil fuel carbon dioxide emissions, and the U.S. Department of Energy identifies fossil fuel burning as a major source of human-caused emissions.",
    ],
    questions: [
      "Why are fossil fuels called non-renewable?",
      "What are two reasons fossil fuels are still widely used?",
      "What is the main argument for replacing fossil fuels with alternatives?",
    ],
    graphic: "Trade-off sheet: dense reliable energy on one side, climate and pollution impacts on the other.",
    source: sources[1],
  },
  {
    id: "biofuels",
    title: "Biofuels",
    number: "05",
    short: "Renewable possibilities",
    color: "bio",
    image: biofuelsCard,
    alt: "Torn paper Biofuels topic card with crops, leaves, and fuel droplet",
    paragraphs: [
      "Biofuels are fuels made from biomass, which means recently living material such as crops, plant waste, wood, algae, used cooking oil, or animal fats. Ethanol is commonly blended with gasoline, while biodiesel and renewable diesel can be used in diesel engines or diesel fuel blends.",
      "Biofuels can help address energy needs because they can replace part of the gasoline, diesel, and jet fuel used in transportation. They can also use domestic or local resources, support agricultural economies, and fit into some existing engines and fuel systems.",
      "The challenge is that biofuels are not automatically carbon-free. Burning biofuels releases carbon dioxide, and the net climate effect depends on how the crops are grown, processed, transported, and converted into fuel. Some biofuels can also compete with food production or require land, water, fertilizer, and pesticides.",
    ],
    questions: [
      "What does biomass mean in the context of biofuels?",
      "How can biofuels reduce dependence on fossil fuels?",
      "Why is it too simple to say all biofuels are automatically carbon-neutral?",
    ],
    graphic: "Life-cycle sketch: crops or waste biomass to fuel pump to vehicle to carbon cycle.",
    source: sources[4],
  },
  {
    id: "fuel-cells",
    title: "Fuel Cells",
    number: "06",
    short: "Clean energy, powered by chemistry",
    color: "cell",
    image: fuelCellsCard,
    alt: "Torn paper Fuel Cells topic card with hydrogen, oxygen, and PEM diagram",
    paragraphs: [
      "A fuel cell converts chemical energy directly into electrical energy. In a hydrogen fuel cell, hydrogen enters the anode and oxygen from air enters the cathode. A catalyst separates hydrogen molecules into protons and electrons, and the moving electrons create electric current.",
      "Fuel cells are different from combustion because the fuel is not burned. If hydrogen is the fuel, the point-of-use products are electricity, water, and heat. This makes fuel cells attractive for clean transportation, backup power, buildings, portable devices, and grid storage.",
      "The challenges are production, storage, cost, and infrastructure. Hydrogen must be produced cleanly to give major climate benefits. It also has low energy content by volume, so storage often requires high pressure, low temperatures, or special materials.",
    ],
    questions: [
      "In a hydrogen fuel cell, what path do the electrons take and why does that matter?",
      "Why are hydrogen fuel cells cleaner at the point of use than combustion engines?",
      "What are two major barriers to widespread fuel cell use?",
    ],
    graphic: "PEM fuel cell diagram: H2 at anode, O2 at cathode, electrons through wire, water out.",
    source: sources[7],
  },
];

const pathItems = [
  ["cover", "01", "Cover"],
  ["map", "02", "Project Map"],
  ...topics.map((topic) => [topic.id, topic.number, topic.title]),
  ["summit-defense", "07", "Summit Defense"],
  ["reflection", "08", "Reflection"],
  ["sources", "09", "Sources"],
];

const defenses = [
  {
    title: "Fossil fuel challenge",
    claim:
      "Fossil fuels solve short-term reliability needs, but they worsen long-term climate and air-quality problems.",
    evidence:
      "Use DOE, EIA, and NASA evidence: fossil fuels are non-renewable, still dominate energy use, and release major carbon dioxide emissions when burned.",
  },
  {
    title: "Biofuels defense",
    claim:
      "Biofuels can reduce dependence on petroleum, but their benefits depend on feedstock and life-cycle choices.",
    evidence:
      "Use EIA and DOE evidence: ethanol and biodiesel can blend into transportation fuels, while land use and processing emissions still matter.",
  },
  {
    title: "Fuel cells defense",
    claim:
      "Fuel cells are clean at the point of use, but hydrogen production and infrastructure decide how scalable they are.",
    evidence:
      "Use DOE, AFDC, and GAO evidence: fuel cells produce electricity, water, and heat, but storage and fueling networks remain difficult.",
  },
];

function PathNav() {
  return (
    <nav className="path-nav" aria-label="Notebook project path">
      {pathItems.map(([id, number, label]) => (
        <a key={id} href={`#${id}`} className="path-link">
          <span>{number}</span>
          <strong>{label}</strong>
        </a>
      ))}
    </nav>
  );
}

function TopicButton({ topic }) {
  return (
    <a href={`#${topic.id}`} className={`topic-button ${topic.color}`}>
      <img src={topic.image} alt={topic.alt} />
      <span>{topic.short}</span>
    </a>
  );
}

function TopicSection({ topic }) {
  return (
    <section id={topic.id} className={`topic-spread ${topic.color}`}>
      <div className="section-pin">{topic.number}</div>
      <div className="topic-art">
        <img src={topic.image} alt={topic.alt} />
      </div>
      <div className="topic-copy paper-panel">
        <p className="stamp">{topic.short}</p>
        <h2>{topic.title}</h2>
        {topic.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <a className="source-sticker" href={topic.source.url} target="_blank" rel="noreferrer">
          Read more: {topic.source.label}
        </a>
      </div>
      <div className="questions paper-panel">
        <h3>Check Questions</h3>
        <ol>
          {topic.questions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>
      <aside className="graphic-note">
        <b>Graphic plan</b>
        <span>{topic.graphic}</span>
      </aside>
    </section>
  );
}

function App() {
  useEffect(() => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <main className="app" style={{ "--notebook-bg": `url(${notebookBg})` }}>
      <PathNav />

      <section id="cover" className="hero notebook-page">
        <h1 className="sr-only">Energy from Fuel</h1>
        <p className="sr-only">
          What are the challenges of using chemical energy to address our energy needs?
        </p>
        <img
          className="hero-photo"
          src={heroNotebook}
          alt="Open IB Chemistry notebook titled Energy from Fuel with project map and topic cards"
        />
        <div className="hero-hotspots" aria-label="Energy from Fuel topic shortcuts">
          <a className="hotspot combustion-hotspot" href="#combustion">
            Combustion
          </a>
          <a className="hotspot fossil-hotspot" href="#fossil-fuels">
            Fossil Fuels
          </a>
          <a className="hotspot biofuels-hotspot" href="#biofuels">
            Biofuels
          </a>
          <a className="hotspot fuel-cells-hotspot" href="#fuel-cells">
            Fuel Cells
          </a>
        </div>
      </section>

      <section id="map" className="project-map notebook-page">
        <div className="map-copy">
          <h2>Project Map</h2>
          <p>
            Follow the path through four energy systems, then use the evidence to
            defend a position at the summit.
          </p>
        </div>
        <div className="map-line" aria-label="Project structure">
          {pathItems.slice(0, 7).map(([id, number, label]) => (
            <a href={`#${id}`} key={id}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </div>
        <div className="topic-grid" aria-label="Topic image buttons">
          {topics.map((topic) => (
            <TopicButton topic={topic} key={topic.id} />
          ))}
        </div>
      </section>

      {topics.map((topic) => (
        <TopicSection topic={topic} key={topic.id} />
      ))}

      <section id="summit-defense" className="summit notebook-page">
        <div className="section-pin purple">07</div>
        <h2>Summit Defense</h2>
        <p className="lead">
          Use cited evidence, compare trade-offs, and make the argument direct.
        </p>
        <div className="defense-grid">
          {defenses.map((defense) => (
            <article key={defense.title} className="evidence-folder">
              <h3>{defense.title}</h3>
              <p><b>Claim:</b> {defense.claim}</p>
              <p><b>Evidence:</b> {defense.evidence}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reflection" className="reflection notebook-page">
        <div className="section-pin green">08</div>
        <h2>Reflection Draft</h2>
        <p>
          Chemical energy can help meet human energy needs because fuels store large
          amounts of energy and can be transported, stored, and released when needed.
          However, every fuel pathway has trade-offs. Fossil fuels are reliable and
          powerful, but they are non-renewable and release greenhouse gases when burned.
          Biofuels can reduce dependence on petroleum and use renewable biomass, but
          their benefits depend on land use, feedstocks, and production methods. Fuel
          cells can produce electricity efficiently with water as the point-of-use
          product when hydrogen is used, but hydrogen production, storage, and
          infrastructure remain major challenges.
        </p>
      </section>

      <section id="sources" className="sources notebook-page">
        <div className="section-pin brown">09</div>
        <h2>Sources</h2>
        <div className="source-list">
          {sources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
              <strong>{source.label}</strong>
              <span>{source.title}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
