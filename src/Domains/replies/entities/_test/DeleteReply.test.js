const DeleteReply = require("../DeleteReply");

describe("An DeleteReply entitie", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new DeleteReply(payload)).toThrowError(
      "DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      replyId: 123,
      commentId: "comment-123",
      threadId: true,
      userId: "user-123",
    };

    expect(() => new DeleteReply(payload)).toThrowError(
      "DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DeleteReply object correctly", () => {
    const payload = {
      replyId: "reply-123",
      commentId: "comment-123",
      threadId: "thread-123",
      userId: "user-123",
    };

    const { replyId, commentId, threadId, userId } = new DeleteReply(payload);

    expect(replyId).toEqual(payload.replyId);
    expect(commentId).toEqual(payload.commentId);
    expect(threadId).toEqual(payload.threadId);
    expect(userId).toEqual(payload.userId);
  });
});
