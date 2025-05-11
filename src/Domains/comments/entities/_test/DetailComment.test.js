const DetailComment = require("../DetailComment");

describe("a DetailComment entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new DetailComment(payload)).toThrowError(
      "DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    const payload = {
      id: 123,
      username: "user",
      date: "date",
      content: "content comment",
      is_deleted: "x",
    };

    expect(() => new DetailComment(payload)).toThrowError(
      "DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create detailComment object correctly", () => {
    const payload = {
      id: "comment-123",
      username: "user",
      date: new Date(),
      content: "content comment",
      is_deleted: false,
    };

    const { id, username, date, content } = new DetailComment(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual(payload.content);
  });

  it("should create detailComment object correctly and not show deleted conten", () => {
    const payload = {
      id: "comment-123",
      username: "user",
      date: new Date(),
      content: "content comment",
      is_deleted: true,
    };

    const deletedContent = "**komentar telah dihapus**";

    const { id, username, date, content } = new DetailComment(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
    expect(content).toEqual(deletedContent);
  });
});
