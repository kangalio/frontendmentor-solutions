type UserJson = {
  image: {
    png: string,
    webp: string,
  },
  username: string,
}
type ReplyCommentJson = {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  user: UserJson,
  replyingTo: string,
};
type CommentJson = {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  user: UserJson,
  replies: ReplyCommentJson[],
};
type DataJson = {
  currentUser: UserJson,
  comments: CommentJson[],
};

export type {UserJson, ReplyCommentJson, CommentJson, DataJson};
