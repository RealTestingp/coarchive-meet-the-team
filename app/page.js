"use client";

import { useState } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import styles from "./page.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Edit this array with real bios / achievements whenever you're ready.
// Drop matching photos into /public/team/ using the filenames below
// (square images, ~800x800, work best).
//
// `bio` is optional — if set, a "Read more" toggle appears under the
// short blurb to reveal it. `linkedin` is a placeholder "#" until you
// have each person's real URL; swap it in whenever it's ready.
const team = [
  {
    no: "001",
    name: "Verity Boyd",
    role: "Project Manager, Backend Developer",
    tag: "PROJECT MGMT / DATABASE",
    photo: "/team/verity_pf.png",
    blurb:
      "Keeps the backend roadmap honest — tracking tickets, timelines, and making sure the pieces land in the right order.",
    linkedin: "https://www.linkedin.com/in/verityb/",
  },
  {
    no: "002",
    name: "Aurora Choban",
    role: "Frontend Developer",
    tag: "INTERFACE",
    photo: "/team/aurora.jpg",
    blurb:
      "Shapes what the archive looks and feels like to use — the screens, the search, the everyday experience of the whole system.",
    linkedin: "https://www.linkedin.com/in/aurora-choban-818a2334a/",
  },
  {
    no: "003",
    name: "Dylan Khuu",
    role: "Backend Developer",
    tag: "SERVICES",
    photo: "/team/dylan_pf.jpg",
    blurb:
      "Builds and maintains the services that keep the archive running underneath everything else — data access, reports, the stuff nobody sees until it breaks.",
    linkedin: "https://www.linkedin.com/in/dylan-khuu/",
  },
  {
    no: "004",
    name: "Jenna Hackett",
    role: "Cloud & AI Architect",
    tag: "CLOUD / AI",
    photo: "/team/jenna_pf.jpg",
    blurb:
      "Designs how the whole system talks to itself and to Azure — routing, infrastructure, and where AI fits into the archive's future.",
    linkedin: "https://www.linkedin.com/in/jenna-hackett-673981161/",
  },
];

function TeamCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.tab}>
        <span className={styles.tabNo}>NO. {member.no}</span>
        <span className={styles.tabTag}>{member.tag}</span>
      </div>

      <div className={styles.photoFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.photo}
          alt={member.name}
          className={styles.photo}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div className={styles.photoFallback}>
          {member.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
      </div>

      <div className={styles.perforation} aria-hidden="true" />

      <div className={styles.cardBody}>
        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.blurb}>{member.blurb}</p>

        {expanded && member.bio && (
          <div className={styles.bio}>
            {member.bio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        <div className={styles.cardFooter}>
          {member.bio && (
            <button
              type="button"
              className={styles.readMore}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedin}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className={`${styles.page} ${fraunces.variable} ${mono.variable}`}>
      <div className={styles.spotlight} aria-hidden="true" />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>GO&ndash;GITTERS</p>
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>CALGARY</span> OPERA INTERACTIVE ARCHIVE
        </h1>
        <p className={styles.subtitle}>Meet the team behind the archive</p>
      </header>

      <section className={styles.grid} aria-label="Team members">
        {team.map((member) => (
          <TeamCard key={member.no} member={member} />
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Calgary Opera Interactive Archive</p>
        <p>Developed by Team Go&mdash;Gitters</p>
      </footer>
    </main>
  );
}