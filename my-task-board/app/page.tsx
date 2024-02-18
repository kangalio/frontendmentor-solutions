import Image from "next/image";

import iconLogo from "./icons/Logo.svg";
import iconStatusCompleted from "./icons/Done_round_duotone.svg";
import iconStatusInProgress from "./icons/Time_atack_duotone.svg";
import iconStatusWontDo from "./icons/close_ring_duotone.svg";
import { CSSProperties } from "react";
import iconAddTask from "./icons/Add_round_duotone.svg";
import iconEditTitle from "./icons/Edit_duotone.svg";
// import iconAAA from "./icons/close_ring_duotone-1.svg";
// import iconAAA from "./icons/Done_round.svg";
// import iconAAA from "./icons/Trash.svg";

export default function Home() {
  let statuses = {
    inProgress: {
      bgColor: "#F5D565",
      fgColor: "#E9A23B",
      icon: iconStatusInProgress,
      alt: "in progress",
    },
    completed: {
      bgColor: "#A0ECB1",
      fgColor: "#32D657",
      icon: iconStatusCompleted,
      alt: "completed",
    },
    wontDo: {
      bgColor: "#F7D4D3",
      fgColor: "#DD524C",
      icon: iconStatusWontDo,
      alt: "won't do",
    },
    toDo: {
      bgColor: "#E3E8EF",
      fgColor: "#97A3B6",
      icon: undefined,
      alt: "to do",
    },
  };

  let roundedSquare: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "40px",
    height: "40px",

    borderRadius: "10px",
  };
  let roundedCard: CSSProperties = {
    borderRadius: "12px",
    padding: "14px",

    display: "flex",
    flexDirection: "row",
    gap: "16px",
  };
  let typographies = {
    title: {
      fontSize: "2.5rem",
      fontWeight: "400",
    },
    description: {
      fontSize: "1rem",
      fontWeight: "300",
    },
    taskTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
    taskButton: {
      fontSize: "1rem",
      fontWeight: "600",
    },
    buttonText: {
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    inputLabel: {
      fontSize: "0.75rem",
      fontWeight: "500",
    },
  };

  return (
    <div
      style={{
        width: "552px",
        margin: "auto",

        marginTop: "50px",
      }}
    >
      <header
        style={{
          display: "grid",
          gridTemplateAreas: "'icon title' 'icon subtitle'",
          gridTemplateColumns: "auto 1fr",
          columnGap: "12px",
          marginBottom: "40px",
        }}
      >
        <Image style={{ gridArea: "icon" }} src={iconLogo} alt="" />
        <h1 style={{ gridArea: "title", ...typographies.title }}>
          My Task Board
          <Image
            src={iconEditTitle}
            alt="edit"
            style={{ marginLeft: "12px" }}
          />
        </h1>
        <span style={{ gridArea: "subtitle", marginTop: "8px" }}>
          Tasks to keep organised
        </span>
      </header>
      <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          {
            title: "Task In Progress",
            emoji: "⏰",
            status: statuses.inProgress,
          },
          {
            title: "Task Completed",
            emoji: "🏋️",
            status: statuses.completed,
          },
          {
            title: "Task Won't Do",
            emoji: "☕",
            status: statuses.wontDo,
          },
          {
            title: "Task To Do",
            emoji: "📚",
            status: statuses.toDo,
            description:
              "Work on a Challenge on devChallenges.io, learn TypeScript.",
          },
        ].map((task) => (
          <li
            key={task.title}
            style={{
              ...roundedCard,
              backgroundColor: task.status.bgColor,
            }}
          >
            <span
              style={{
                ...roundedSquare,
                backgroundColor: "white",
              }}
            >
              {task.emoji}
            </span>
            <div
              style={{
                // Balanced to make task title align with center of emoji
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              <span style={{ ...typographies.taskTitle }}>{task.title}</span>
              {task.description ? (
                <div style={{ ...typographies.description, marginTop: "8px" }}>
                  {task.description}
                </div>
              ) : null}
            </div>
            {task.status.icon ? (
              <Image
                src={task.status.icon}
                alt={task.status.alt}
                style={{
                  ...roundedSquare,
                  backgroundColor: task.status.fgColor,
                  marginLeft: "auto",
                  padding: "10px",
                }}
              />
            ) : null}
          </li>
        ))}
        <li
          style={{
            ...roundedCard,
            backgroundColor: "#F5E8D5",
            alignItems: "center",
          }}
        >
          <Image
            src={iconAddTask}
            alt=""
            style={{
              ...roundedSquare,
              backgroundColor: "#E9A23B",
              padding: "10px",
            }}
          />
          <span style={{ ...typographies.taskButton }}>Add new task</span>
        </li>
      </ul>
    </div>
  );
}
