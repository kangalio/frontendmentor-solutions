import styles from "./AddComment.module.css";
import { SubmittableTextArea } from "./SubmittableTextArea";

export function AddComment({
  avatar,
  submitLabel,
  onSubmit,
}: {
  avatar: string;
  submitLabel: string;
  onSubmit: (_: string) => void;
}) {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar} alt="" />
      <SubmittableTextArea
        initialText={""}
        placeholder={"Add a comment..."}
        onSubmit={onSubmit}
        flowVertical={false}
        buttonText={submitLabel}
      />
    </div>
  );
}
