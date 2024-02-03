import { useState } from "react";
import styles from "./SubmittableTextArea.module.css";

export function SubmittableTextArea({
  className,
  initialText,
  placeholder,
  buttonText,
  flowVertical,
  onSubmit,
}: {
  className?: string;
  initialText: string;
  placeholder: string;
  buttonText: string;
  flowVertical: boolean;
  onSubmit: (_: string) => void;
}) {
  let [text, setText] = useState(initialText);

  function submit() {
    setText("");
    onSubmit(text);
  }

  return (
    <div
      className={`${styles.container} ${
        flowVertical ? styles.vertical : styles.horizontal
      } ${className}`}
    >
      <textarea
        className={`${styles.input}`}
        value={text}
        onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
        onKeyDown={(e) => {
          console.log(e);
          if (e.key === "Enter" && e.ctrlKey) {
            submit();
          }
        }}
        placeholder={placeholder}
      />
      <button
        className={`${styles.button}`}
        disabled={text.length === 0}
        onClick={() => submit()}
      >
        {buttonText}
      </button>
    </div>
  );
}
