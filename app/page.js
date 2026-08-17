"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
});

// Edit this array with real bios / achievements whenever you're ready.
// Drop matching photos into /public/team/ using the filenames below
// (square images, ~800x800, work best).
//
// `website` is optional — if set, an extra link shows next to LinkedIn.
const team = [
  {
    no: "001",
    name: "Verity Boyd",
    role: "Project Manager, Backend Developer",
    tag: "DATABASE",
    photo: "/team/verity_pf.png",
    blurb:
      "Primary stakeholder contact for Calgary Opera. Designed the Azure SQL database, developed the REST API and led sprint planning and delivery.",
    bio: "Served as the primary point of contact with Calgary Opera stakeholders, gathering and defining requirements that shaped the system design. Designed and built the 20-table Azure SQL database, developed the REST API using ASP.NET Core, and managed sprint planning, backlog and cross-team coordination across the full project lifecycle.\n\nVerity is a software developer graduating from SAIT in August 2026, transitioning into tech after building a career across financial services, non-profit arts, and client-experience roles. That path shaped her approach to work: with clear communication, strong collaboration, reliable time-management, and stakeholder-focused problem-solving at the core.\n\nIn development, she brings solid technical fundamentals in object-oriented programming, front and backend development, relational databases, SQL, cloud computing, DevOps practices, IoT concepts, and modern AI workflows — including responsible AI and agentic AI. She is especially interested in enterprise applications and building solutions that improve reliability, clarity, and the human experience overall.\n\nCurious, adaptable, and detail-driven, Verity is excited to grow her career in environments where technology, teamwork, and thoughtful design come together to create meaningful impact.",
    linkedin: "https://www.linkedin.com/in/verityb/",
    website: "https://verityboyd.vercel.app/",
  },
  {
    no: "002",
    name: "Aurora Choban",
    role: "Frontend Developer",
    tag: "INTERFACE",
    photo: "/team/aurora_pf.png",
    blurb:
      "Shaped what the archive looked and felt like for users, from the screens and search functionality to the overall day-to-day experience of the archive.",
    bio: "Shaped what the archive looked and felt like for users, from the screens and search functionality to the overall day-to-day experience of the archive.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career in insurance. That work developed the strengths I rely on now: precision with complex information, clear communication with clients and stakeholders, and the judgment to translate detailed requirements into something people can act on with confidence.\n\nIn development, I bring solid technical fundamentals in object-oriented programming, front and backend development, relational databases and SQL, cloud computing on Azure, containerization with Docker, DevOps practices, version control and agile delivery, and modern AI workflows including retrieval-augmented generation.\n\nOn the Calgary Opera Archive I served as frontend developer, building the client in React and TypeScript with a full design system, dark mode support, and a multi-step production wizard that makes a complex data model straightforward for archive staff. I worked across a local environment spanning a .NET API and a SQL Server container, which allows me to read backend code, trace issues across layers, and collaborate effectively with the developers who own them.\n\nMy specialization is frontend development, with a growing focus on integrating AI capabilities such as search, summarization, and natural-language assistance into user-facing applications. I'm detail-driven, comfortable owning a feature end to end, and looking to join a team where interface quality is treated as core engineering.",
    linkedin: "https://www.linkedin.com/in/aurora-choban-818a2334a/",
    website: null,
  },
  {
    no: "003",
    name: "Dylan Khuu",
    role: "Backend Developer",
    tag: "SERVICES",
    photo: "/team/dylan_pf.jpg",
    blurb:
      "Developed the gateway and Reports Service, implementing the necessary models, controllers, DTOs, and supporting backend components.",
    bio: "Developed the gateway and Reports Service, implementing the necessary models, controllers, DTOs, and supporting backend components.\n\nI'm completing a Software Development Diploma at SAIT, where I've built full-stack applications using C#, Python, React, and SQL, including the Calgary Opera Interactive Archive itself, a web-based archival system supporting the digital transformation of historical organizational records.\n\nOn this project, I worked on the overall backend architecture, built the API gateway that routes requests across services, and developed the Reports Service, which handles the models, controllers, and DTOs behind generating and exporting reports from the archive's data.\n\nBefore moving into development, I worked in accounting and financial operations, which gave me a solid grounding in accuracy, process, and translating real-world business requirements into technical solutions, which is something I now bring directly into how I approach backend and system design.",
    linkedin: "https://www.linkedin.com/in/dylan-khuu/",
    website: null,
  },
  {
    no: "004",
    name: "Jenna Hackett",
    role: "Cloud & AI Architect",
    tag: "CLOUD / AI",
    photo: "/team/jenna_pf.jpg",
    blurb:
      "Designed and built the infrastructure backbone, containerization, deployment, and the AI assistant that brings the archive to life.",
    bio: "Designed and built the infrastructure backbone, containerization, deployment, and the AI assistant that brings the archive to life.\n\nI'm a software developer graduating from SAIT in August 2026, transitioning into tech after building a career in banking, following a background in the service industry. That path shaped how I approach problems today: with strong client-facing communication, attention to detail under pressure, and a practical sense of how systems need to actually work for the people using them.\n\nIn development, I bring solid technical fundamentals in cloud computing on Azure, containerization with Docker, microservices architecture, DevOps and CI/CD practices, relational databases, and applied AI including retrieval-augmented generation and agentic workflows.\n\nOn the Calgary Opera Archive I served as Cloud and AI Architect, designing and containerizing all five microservices and deploying the system to Azure Container Apps. I built the RAG-powered AI assistant end to end, from Azure AI Search indexing and retrieval tuning to guardrails and Azure AI Foundry agent configuration, so archive staff can ask natural-language questions and get accurate answers grounded in the archive's own data. I also managed the project's cloud infrastructure and cost footprint throughout development.\n\nMy specialization is cloud infrastructure and applied AI, with a particular interest in building systems that are secure, cost-conscious, and genuinely usable, not just technically impressive. I'm looking to join a team where infrastructure is treated as a first-class part of the product, not an afterthought.",
    linkedin: "https://www.linkedin.com/in/jenna-hackett-673981161/",
    website: null,
  },
];

function MemberPhoto({ member, className, fallbackClassName }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.photo}
        alt={member.name}
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
      <div className={fallbackClassName}>
        {member.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </div>
    </>
  );
}

function TeamCard({ member, onOpen }) {
  return (
    <article className={styles.card}>
      <div className={styles.photoFrame}>
        <MemberPhoto
          member={member}
          className={styles.photo}
          fallbackClassName={styles.photoFallback}
        />
      </div>

      <div className={styles.cardBody}>
        <span className={styles.tag}>{member.tag}</span>
        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.blurb}>{member.blurb}</p>

        <button
          type="button"
          className={styles.readMore}
          onClick={() => onOpen(member)}
        >
          More about {member.name.split(" ")[0]} ↗
        </button>

        <div className={styles.cardFooter}>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedin}
            onClick={(e) => e.stopPropagation()}
          >
            LinkedIn ↗
          </a>

          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
              onClick={(e) => e.stopPropagation()}
            >
              Website ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function MemberModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.modalPhotoFrame}>
          <MemberPhoto
            member={member}
            className={styles.modalPhoto}
            fallbackClassName={styles.modalPhotoFallback}
          />
        </div>

        <div className={styles.modalBody}>
          <span className={styles.tag}>{member.tag}</span>
          <h2 className={styles.modalName}>{member.name}</h2>
          <p className={styles.role}>{member.role}</p>

          {member.bio ? (
            <div className={styles.modalBio}>
              {member.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className={styles.modalBlurb}>{member.blurb}</p>
          )}

          <div className={styles.cardFooter}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              LinkedIn ↗
            </a>

            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedin}
              >
                Website ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <main className={`${styles.page} ${inter.variable}`}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>GO&ndash;GITTERS</p>
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>CALGARY</span> OPERA INTERACTIVE
          ARCHIVE
        </h1>
        <p className={styles.subtitle}>Meet the team behind the archive</p>
      </header>

      <section className={styles.grid} aria-label="Team members">
        {team.map((member) => (
          <TeamCard key={member.no} member={member} onOpen={setActiveMember} />
        ))}
      </section>

      <footer className={styles.footer}>
        <p>Calgary Opera Interactive Archive</p>
        <p>Developed by Team Go&mdash;Gitters</p>
      </footer>

      {activeMember && (
        <MemberModal
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      )}
    </main>
  );
}
