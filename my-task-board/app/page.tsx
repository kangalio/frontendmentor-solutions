"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

import iconLogo from "./icons/Logo.svg";
import iconStatusCompleted from "./icons/Done_round_duotone.svg";
import iconStatusInProgress from "./icons/Time_atack_duotone.svg";
import iconStatusWontDo from "./icons/close_ring_duotone.svg";
import iconAddTask from "./icons/Add_round_duotone.svg";
import iconEditTitle from "./icons/Edit_duotone.svg";
// import iconSelected from "./icons/close_ring_duotone-1.svg";
import iconCheckmark from "./icons/Done_round.svg";
import iconTrash from "./icons/Trash.svg";

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
  // These values were missing in the specs, I guessed them by eye
  taskDetails: {
    fontSize: "1.25rem",
    fontWeight: "500",
  },
};
let statuses = {
  inProgress: {
    bgColor: "#F5D565",
    fgColor: "#E9A23B",
    icon: iconStatusInProgress,
    name: "In Progress",
  },
  completed: {
    bgColor: "#A0ECB1",
    fgColor: "#32D657",
    icon: iconStatusCompleted,
    name: "Completed",
  },
  wontDo: {
    bgColor: "#F7D4D3",
    fgColor: "#DD524C",
    icon: iconStatusWontDo,
    name: "Won't do",
  },
};
let emojis = ["👨‍💻", "💬", "☕", "🏋️", "📚", "⏰"];

let roundedSquare: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "40px",
  height: "40px",

  borderRadius: "10px",
};

type Task = {
  title: string;
  emoji: string;
  status?: (typeof statuses)[keyof typeof statuses];
  description?: string;
};

function StatusRoundedSquare({
  status,
  style,
}: {
  status: (typeof statuses)[keyof typeof statuses];
  style?: CSSProperties;
}) {
  return (
    <Image
      src={status.icon}
      alt={status.name}
      style={{
        ...roundedSquare,
        backgroundColor: status.fgColor,
        padding: "10px",

        ...style,
      }}
    />
  );
}

function TaskEditModal({
  task,
  setTask,
}: {
  task: Task;
  setTask: (_: Task) => void;
}) {
  let section: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };
  let inputLabel = {
    ...typographies.inputLabel,
    color: "#97A3B6",
    marginBottom: "4px",
  };
  let input = {
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderRadius: "8px",
    border: "2px solid #E3E8EF",
  };
  let bottomButton: CSSProperties = {
    height: "32px",
    borderRadius: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",

    color: "white",
    ...typographies.buttonText,
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,

          backgroundColor: "black",
          opacity: 0.2,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "12px",
          margin: "16px",
          top: 0,
          bottom: 0,
          right: 0,
          width: "500px",

          padding: "16px",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ ...typographies.taskDetails }}>Task details</span>
        <div
          style={{
            marginTop: "24px",

            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <section style={{ ...section }}>
            <span style={{ ...inputLabel }}>Task name</span>
            <input
              style={{ ...input }}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </section>
          <section style={{ ...section }}>
            <span style={{ ...inputLabel }}>Description</span>
            <textarea
              placeholder="Enter a short description"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              style={{ ...input, resize: "none", height: "150px" }}
            />
          </section>
          <section style={{ ...section }}>
            <span style={{ ...inputLabel }}>Icon</span>
            <ul style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  style={{
                    ...roundedSquare,
                    backgroundColor:
                      emoji == task.emoji ? "#F5D565" : "#E3E8EF",
                  }}
                  onClick={() => {
                    setTask({ ...task, emoji });
                  }}
                >
                  {emoji}
                </button>
              ))}
            </ul>
          </section>
          <section style={{ ...section }}>
            <span style={{ ...inputLabel }}>Status</span>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "16px",
                rowGap: "8px",
              }}
            >
              {[statuses.inProgress, statuses.completed, statuses.wontDo].map(
                (status) => {
                  let selected = status.name === task.status?.name;
                  return (
                    <button
                      key={status.name}
                      style={{
                        borderRadius: "12px", // snug fit with the status rounded square
                        border: `2px solid ${selected ? "#3662E3" : "#E3E8EF"}`,
                        padding: "2px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setTask({ ...task, status });
                      }}
                    >
                      <StatusRoundedSquare status={status} />
                      <span style={{ marginLeft: "8px" }}>{status.name}</span>
                      {selected ? (
                        <Image
                          src={iconCheckmark}
                          alt="selected"
                          style={{
                            marginLeft: "auto",
                            marginRight: "8px",
                            backgroundColor: "#3662E3",

                            width: "18px",
                            height: "18px",
                            borderRadius: "9px",
                            padding: "2px",
                          }}
                        />
                      ) : null}
                    </button>
                  );
                }
              )}
            </ul>
          </section>
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "flex-end",
          }}
        >
          <button style={{ ...bottomButton, backgroundColor: "#97A3B6" }}>
            Delete <Image src={iconTrash} alt="" />
          </button>
          <button style={{ ...bottomButton, backgroundColor: "#3662E3" }}>
            Save <Image src={iconCheckmark} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  let [tasks, setTasks] = useState<Task[]>([
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
      description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
    },
  ]);

  let roundedCard: CSSProperties = {
    borderRadius: "12px",
    padding: "14px",

    display: "flex",
    flexDirection: "row",
    gap: "16px",

    cursor: "pointer",
  };

  let [boardTitle, setBoardTitle] = useState("My Task Board");
  let [editingBoardTitle, setEditingBoardTitle] = useState(false);

  let titleEditBox = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingBoardTitle && titleEditBox.current) {
      titleEditBox.current.focus();
      titleEditBox.current.select();
    }
  }, [editingBoardTitle]);

  return (
    <div
      style={{
        width: "552px",
        margin: "auto",

        marginTop: "50px",
      }}
    >
      {/* REMEMBER */}
      <TaskEditModal
        task={tasks[0]}
        setTask={(task) => {
          tasks[0] = task;
          setTasks([...tasks]);
        }}
      />
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
        {editingBoardTitle ? (
          <input
            ref={titleEditBox}
            style={{ gridArea: "title", ...typographies.title }}
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") setEditingBoardTitle(!editingBoardTitle);
            }}
            onBlur={(e) => setEditingBoardTitle(!editingBoardTitle)}
          />
        ) : (
          <h1
            style={{ gridArea: "title", ...typographies.title }}
            onClick={() => setEditingBoardTitle(!editingBoardTitle)}
          >
            {boardTitle}
            <Image
              src={iconEditTitle}
              alt="edit"
              style={{ marginLeft: "12px" }}
            />
          </h1>
        )}
        <span style={{ gridArea: "subtitle", marginTop: "8px" }}>
          Tasks to keep organised
        </span>
      </header>
      <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tasks.map((task) => (
          <li
            key={task.title}
            style={{
              ...roundedCard,
              backgroundColor: task.status?.bgColor ?? "#E3E8EF",
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
            {task.status ? (
              <StatusRoundedSquare
                status={task.status}
                style={{ marginLeft: "auto" }}
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
