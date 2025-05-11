const DeleteComment = require("../DeleteComment");

describe("an DeleteComment entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new DeleteComment(payload)).toThrowError(
      "DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      commentId: {},
      threadId: "thread-123",
      userId: "user-123",
    };

    expect(() => new DeleteComment(payload)).toThrowError(
      "DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create deleteCommentById object correctly", () => {
    const payload = {
      commentId: "comment-123",
      threadId: "thread-123",
      userId: "user-123",
    };

    const { commentId, threadId, userId } = new DeleteComment(payload);

    expect(commentId).toEqual(payload.commentId);
    expect(threadId).toEqual(payload.threadId);
    expect(userId).toEqual(payload.userId);
  });
});
