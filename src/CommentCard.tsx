import styles from "./CommentCard.module.css";
import replyIcon from "./images/icon-reply.svg";
import deleteIcon from "./images/icon-delete.svg";
import editIcon from "./images/icon-edit.svg";
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
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className={styles.votes}>{votes}</span>
            <div className={styles.downvote} onClick={onDownvote}>
              <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
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
                  <img className={styles.deleteicon} src={deleteIcon} alt="" />
                  <span className={styles.deletetext}>Delete</span>
                </div>
                <div
                  className={styles.actionedit}
                  onClick={() => setEditMode(!editMode)}
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
          {editMode ? (
            <SubmittableTextArea
              className={styles.content + " " + styles.editinput}
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
            <div className={styles.content + " " + styles.text}>{text}</div>
          )}
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
