const DetailReply = require("../DetailReply");

describe("An DetailReply entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new DetailReply(payload)).toThrowError(
      "DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      id: 123,
      content: "contentx",
      date: "x",
      username: "user",
      is_deleted: false,
    };

    expect(() => new DetailReply(payload)).toThrowError(
      "DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DetailReply object correctly", () => {
    const payload = {
      id: "reply-123",
      content: "contentx",
      date: new Date(),
      username: "user",
      is_deleted: false,
    };

    const { id, content, date, username } = new DetailReply(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });

  it("should create DetailReply object correctly and not show deleted content", () => {
    const payload = {
      id: "reply-123",
      content: "contentx",
      date: new Date(),
      username: "user",
      is_deleted: true,
    };

    const deletedContent = "**balasan telah dihapus**";

    const { id, content, date, username } = new DetailReply(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(deletedContent);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });
});
