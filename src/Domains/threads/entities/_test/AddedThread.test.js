const AddedThread = require("../AddedThread");

describe("an AddedThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {
      title: "title thread",
      body: "body thread",
    };

    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type spec", () => {
    const payload = {
      id: 123,
      title: {},
      owner: true,
    };

    expect(() => new AddedThread(payload)).toThrowError(
      "ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create addedThread object correctly", () => {
    const payload = {
      id: "thread-123",
      title: "title thread",
      owner: "user-123",
    };

    const { id, title, owner } = new AddedThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
