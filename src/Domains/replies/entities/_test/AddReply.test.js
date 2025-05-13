const AddReply = require("../AddReply");

describe("An AddReply entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new AddReply(payload)).toThrowError(
      "ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      content: 1,
      threadId: "thread-123",
      commentId: true,
      owner: "user-123",
    };

    expect(() => new AddReply(payload)).toThrowError(
      "ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create addReply objecet correctly", () => {
    const payload = {
      content: "contentx",
      threadId: "thread-123",
      commentId: "comment-123",
      owner: "user-123",
    };

    const { content, threadId, commentId, owner } = new AddReply(payload);

    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
    expect(owner).toEqual(payload.owner);
  });
});
