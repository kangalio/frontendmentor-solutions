import dataJson_ from "./data.json";
import styles from "./CommentSection.module.css";
import { CommentChain } from "./CommentChain";
import { AddComment } from "./AddComment";
import { useState } from "react";

export default function App() {
  let [dataJson, setDataJson] = useState(dataJson_);

  return (
    <div className={styles.root}>
      {dataJson.comments.map((comment) => (
        <CommentChain
          key={comment.id}
          comment={comment}
          setComment={() => setDataJson({ ...dataJson })}
          onDelete={() => {
            dataJson.comments = dataJson.comments.filter(
              (c) => c.id !== comment.id
            );
            setDataJson({ ...dataJson });
          }}
          onReply={(text) => {
            comment.replies.push({
              content: text,
              createdAt: "now", // TODO
              id: 1234, // TODO
              score: 0,
              replyingTo: comment.user.username,
              user: dataJson.currentUser,
            });
            setDataJson({ ...dataJson });
          }}
          selfUser={dataJson.currentUser}
        />
      ))}
      <AddComment
        avatar={dataJson.currentUser.image.png}
        submitLabel="SEND"
        onSubmit={(text) => {
          dataJson.comments.push({
            content: text,
            createdAt: "now", // TODO
            id: 1234, // TODO
            replies: [],
            score: 0,
            user: dataJson.currentUser,
          });
          setDataJson({ ...dataJson });
        }}
      />
    </div>
  );
}
