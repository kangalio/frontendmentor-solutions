import styles from "./CommentCard.module.css";
import replyIcon from "./images/icon-reply.svg";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";
import plusIcon from "./images/icon-plus.svg";
import minusIcon from "./images/icon-minus.svg";
import { useState } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { AddComment } from "./AddComment";
import { SubmittableTextArea } from "./SubmittableTextArea";

export function CommentCard({
  username,
  text,
  setText,
  votes,
  age,
  avatar,
  selfAvatar,
  isSelf,
  onDelete,
  onReply,
  onUpvote,
  onDownvote,
}: {
  username: string;
  text: string;
  setText: (_: string) => void;
  votes: number;
  age: string;
  avatar: string;
  selfAvatar: string;
  isSelf: boolean;
  onDelete: () => void;
  onReply: (_: string) => void;
  onUpvote: () => void;
  onDownvote: () => void;
}) {
  let [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  let [replyCardOpen, setReplyCardOpen] = useState(false);
  let [editMode, setEditMode] = useState(false);

  return (
    <>
      <div className={styles.withreply}>
        <div className={styles.comment}>
          <div className={styles.votebox}>
            <div className={styles.upvote} onClick={onUpvote}>
              <img src={plusIcon} alt="upvote" />
            </div>
            <span>{votes}</span>
            <div className={styles.downvote} onClick={onDownvote}>
              <img src={minusIcon} alt="downvote" />
            </div>
          </div>
          <div className={styles.notvotebox}>
            <div className={styles.topbar}>
              <div className={styles.topbarleft}>
                <img className={styles.avatar} src={avatar} alt="" />
                <div className={styles.usernameGroup}>
                  <span className={styles.username}>{username}</span>
                  {isSelf ? <span className={styles.you}>you</span> : ""}
                </div>
                <span className={styles.createdat}>{age}</span>
              </div>
              <div className={styles.actions}>
                {isSelf ? (
                  <>
                    <div
                      className={styles.actiondelete}
                      onClick={() => setDeleteConfirmDialogOpen(true)}
                    >
                      <img
                        className={styles.deleteicon}
                        src={deleteIcon}
                        alt=""
                      />
                      <span className={styles.deletetext}>Delete</span>
                    </div>
                    <div
                      className={styles.actionedit}
                      onClick={() => setEditMode(true)}
                    >
                      <img className={styles.editicon} src={editIcon} alt="" />
                      <span className={styles.edittext}>Edit</span>
                    </div>
                  </>
                ) : (
                  <div
                    className={styles.actionreply}
                    onClick={() => setReplyCardOpen(!replyCardOpen)}
                  >
                    <img className={styles.replyicon} src={replyIcon} alt="" />
                    <span className={styles.replytext}>Reply</span>
                  </div>
                )}
              </div>
            </div>
            {editMode ? (
              <SubmittableTextArea
                className={styles.editinput}
                initialText={text}
                buttonText={"UPDATE"}
                placeholder="Edit comment..."
                flowVertical={true}
                onSubmit={(editedText) => {
                  setEditMode(false);
                  setText(editedText);
                }}
              />
            ) : (
              <div className={styles.text}>{text}</div>
            )}
          </div>
        </div>
        {replyCardOpen ? (
          <AddComment
            avatar={selfAvatar}
            submitLabel="REPLY"
            onSubmit={(text) => {
              setReplyCardOpen(false);
              onReply(text);
            }}
          />
        ) : null}
      </div>
      {deleteConfirmDialogOpen ? (
        <DeleteConfirmation
          onCancel={() => setDeleteConfirmDialogOpen(false)}
          onConfirm={() => {
            setDeleteConfirmDialogOpen(false);
            onDelete();
          }}
        />
      ) : null}
    </>
  );
}
