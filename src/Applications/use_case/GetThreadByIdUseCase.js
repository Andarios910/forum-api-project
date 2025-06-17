const DetailComment = require("../../Domains/comments/entities/DetailComment");
const DetailReply = require("../../Domains/replies/entities/DetailReply");

class GetThreadByIdUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
    commentLikeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._commentLikeRepository = commentLikeRepository;
  }

  async execute(id) {
    const thread = await this._threadRepository.getThreadById(id);
    let comments = await this._commentRepository.getCommentsByThreadId(id);
    const replies = await this._replyRepository.getRepliesByThreadId(id);
    const likes = await this._commentLikeRepository.getLikesByThreadId(id);

    comments = comments.map((comment) => {
      return {
        ...new DetailComment(comment),
        replies: replies
          .filter((reply) => reply.comment_id === comment.id)
          .map((reply) => ({ ...new DetailReply(reply) })),
        likeCount: likes.filter((like) => like.comment === comment.id).length,
      };
    });

    return { ...thread, comments };
  }
}

module.exports = GetThreadByIdUseCase;
