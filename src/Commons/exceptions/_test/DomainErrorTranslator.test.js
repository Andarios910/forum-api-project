const DomainErrorTranslator = require("../DomainErrorTranslator");
const InvariantError = require("../InvariantError");

describe("DomainErrorTranslator", () => {
  it("should translate error correctly", () => {
    expect(
      DomainErrorTranslator.translate(
        new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat user baru karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("REGISTER_USER.USERNAME_LIMIT_CHAR")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat user baru karena karakter username melebihi batas limit"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat user baru karena username mengandung karakter terlarang"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat thread baru karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat komentar baru karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat menghapus komentar karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat menghapus komentar karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat balasan baru karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat membuat balasan baru karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat menghapus balasan karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat menghapus balasan karena tipe data tidak sesuai"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY")
      )
    ).toStrictEqual(
      new InvariantError(
        "tidak dapat menyukai karena properti yang dibutuhkan tidak ada"
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error("ADD_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION")
      )
    ).toStrictEqual(
      new InvariantError("tidak dapat menyukai karena tipe data tidak sesuai")
    );
  });

  it("should return original error when error message is not needed to translate", () => {
    // Arrange
    const error = new Error("some_error_message");

    // Action
    const translatedError = DomainErrorTranslator.translate(error);

    // Assert
    expect(translatedError).toStrictEqual(error);
  });
});
