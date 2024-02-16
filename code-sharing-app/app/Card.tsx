"use client";

import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import iconShare from "./images/Share.svg";
import iconLink from "./images/link.svg";
// import iconDownArrow from "./images/down arrow.svg";

import stylesCard from "./Card.module.css";
import Image from "next/image";

export default function Card({ initialCode }: { initialCode: string }) {
  let [copyableLink, setCopyableLink] = useState<
    { url: string; display: string } | undefined
  >(undefined);
  let [lang, setLang] = useState("html");
  let [theme, setTheme] = useState("light");
  let [editorContent, setEditorContent] = useState(initialCode);

  let styles = stylesCard;
  return (
    <section
      className={styles.codeCard}
      style={{ backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#ffffff" }}
    >
      <Editor
        defaultValue={editorContent}
        language={lang}
        theme={theme}
        onChange={(value) => {
          setCopyableLink(undefined);
          setEditorContent(value ?? "");
        }}
      />
      <div className="row">
        <select onChange={(e) => setLang(e.target.value)}>
          <option value="html">HTML</option>
          <option value="rust">Rust</option>
        </select>
        <select onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="vs-dark">Dark</option>
        </select>
        <section className="row" style={{ marginLeft: "auto" }}>
          {copyableLink ? (
            <button
              className="row fadeIn"
              style={{
                marginRight: "16px",
                color: "gray",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!copyableLink) {
                  console.error("this shouldn't be possible");
                  return;
                }
                navigator.clipboard.writeText(copyableLink.url);
                setCopyableLink({
                  ...copyableLink,
                  display: "Copied to clipboard",
                });
              }}
            >
              <Image src={iconLink} alt="" style={{ marginRight: "8px" }} />
              {copyableLink.display}
            </button>
          ) : null}
          <button
            className="row shareButton"
            onClick={async () => {
              let { url, display } = await (
                await fetch("/api/snippet", {
                  method: "POST",
                  body: editorContent,
                })
              ).json();
              setCopyableLink({ url, display });
            }}
            disabled={copyableLink !== undefined}
          >
            <Image src={iconShare} alt="" style={{ marginRight: "8px" }} />
            Share
          </button>
        </section>
      </div>
    </section>
  );
}
