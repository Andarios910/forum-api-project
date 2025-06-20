const AddThread = require("../AddThread");

describe("an AddThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = {};

    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type spec", () => {
    const payload = {
      title: 123,
      body: true,
      owner: "user-123",
    };

    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create addThread object correctly", () => {
    const payload = {
      title: "title thread",
      body: "body thread",
      owner: "user-123",
    };

    const { title, body, owner } = new AddThread(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
