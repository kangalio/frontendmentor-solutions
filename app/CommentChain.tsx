import { CommentCard } from "./CommentCard";
import { CommentJson, UserJson } from "./commentJson";
import styles from "./CommentChain.module.css";

export function CommentChain({
  comment,
  setComment,
  selfUser,
  onDelete,
  onReply,
}: {
  comment: CommentJson;
  setComment: () => void;
  selfUser: UserJson;
  onDelete: () => void;
  onReply: (_: string) => void;
}) {
  return (
    <>
      <CommentCard
        username={comment.user.username}
        text={comment.content}
        setText={(text) => {
          comment.content = text;
          setComment();
        }}
        votes={comment.score}
        onUpvote={() => {
          comment.score += 1;
          setComment();
        }}
        onDownvote={() => {
          comment.score -= 1;
          setComment();
        }}
        age={comment.createdAt}
        avatar={comment.user.image.png}
        selfAvatar={selfUser.image.png}
        isSelf={comment.user.username === selfUser.username}
        onDelete={onDelete}
        onReply={onReply}
      />
      {comment.replies.length > 0 ? (
        <div className={styles.replybox}>
          <div className={styles.replyline}></div>
          <div className={styles.replies}>
            {comment.replies.map((reply) => (
              <CommentCard
                key={reply.id}
                username={reply.user.username}
                text={reply.content}
                setText={(text) => {
                  reply.content = text;
                  setComment();
                }}
                votes={reply.score}
                onUpvote={() => {
                  reply.score += 1;
                  setComment();
                }}
                onDownvote={() => {
                  reply.score -= 1;
                  setComment();
                }}
                age={reply.createdAt}
                avatar={reply.user.image.png}
                selfAvatar={selfUser.image.png}
                isSelf={reply.user.username === selfUser.username}
                onDelete={() => {
                  comment.replies = comment.replies.filter(
                    (r) => r.id !== reply.id
                  );
                  setComment();
                }}
                onReply={(text) => {
                  comment.replies.push({
                    content: text,
                    createdAt: "now", // TODO
                    id: 1234, // TODO
                    score: 0,
                    replyingTo: comment.user.username,
                    user: selfUser,
                  });
                  setComment();
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
