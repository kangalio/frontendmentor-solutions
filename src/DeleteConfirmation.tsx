import styles from "./DeleteConfirmation.module.css";

export function DeleteConfirmation({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <div className={styles.backgrounddim} onClick={onCancel}></div>
      <div className={styles.card}>
        <span className={styles.head}>Delete comment</span>
        <div className={styles.text}>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className={styles.buttons}>
          <div className={styles.no} onClick={onCancel}>
            NO, CANCEL
          </div>
          <div className={styles.yes} onClick={onConfirm}>
            YES, DELETE
          </div>
        </div>
      </div>
    </>
  );
}
