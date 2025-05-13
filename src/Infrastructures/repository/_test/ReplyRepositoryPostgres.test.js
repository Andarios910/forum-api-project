const RepliesTableTestHelper = require("../../../../tests/RepliesTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddedReply = require("../../../Domains/replies/entities/AddedReply");
const AddReply = require("../../../Domains/replies/entities/AddReply");
const pool = require("../../database/postgres/pool");
const ReplyRepositoryPostgres = require("../ReplyRepositoryPostgres");

describe("ReplyRepositoryPostgres", () => {
  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addReply function", () => {
    it("should persist new reply and return added reply correctly", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      const newReply = new AddReply({
        content: "contentx",
        commentId: "comment-123",
        threadId: "thread-123",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "123";
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      const addedReply = await replyRepositoryPostgres.addReply(newReply);

      const reply = await RepliesTableTestHelper.findReplyById("reply-123");

      expect(reply).toHaveLength(1);
      expect(addedReply).toStrictEqual(
        new AddedReply({
          id: "reply-123",
          content: "contentx",
          owner: "user-123",
        })
      );
    });
  });

  describe("verifyReplyOwner function", () => {
    it("should return AuthorizationError when owner is not the same as the payload", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      await expect(
        replyRepositoryPostgres.verifyReplyOwner({
          replyId: "reply-123",
          userId: "user-124",
        })
      ).rejects.toThrowError(AuthorizationError);
    });

    it("should return nothing when owner is the same as payload", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      expect(
        replyRepositoryPostgres.verifyReplyOwner({
          replyId: "reply-123",
          userId: "user-123",
        })
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe("deleteReplyById function", () => {
    it("should return NotFoundError when reply is not avilable", async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      await expect(
        replyRepositoryPostgres.deleteReplyById("123")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return delete reply correctly", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      await expect(
        replyRepositoryPostgres.deleteReplyById("reply-123")
      ).resolves.not.toThrowError(NotFoundError);

      const deletedReply = await RepliesTableTestHelper.findReplyById(
        "reply-123"
      );

      expect(deletedReply[0].is_deleted).toEqual(true);
    });
  });

  describe("getRepliesByThreadId function", () => {
    it("should return an empty array when the thread has no comment replies", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      const result = await replyRepositoryPostgres.getRepliesByThreadId(
        "thread-123"
      );

      expect(result).toEqual([]);
    });

    it("should return all the replies correctly", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});

      const firstReply = {
        id: "reply-123",
        comment_id: "comment-123",
        date: new Date("2025-05-13T11:00:00.000Z"),
        content: "first",
        is_deleted: false,
        username: "dicoding",
      };

      const secondReply = {
        id: "reply-1234",
        comment_id: "comment-123",
        date: new Date("2025-05-13T12:00:00.000Z"),
        content: "second",
        is_deleted: false,
        username: "dicoding",
      };

      await RepliesTableTestHelper.addReply(firstReply);
      await RepliesTableTestHelper.addReply(secondReply);

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      const result = await replyRepositoryPostgres.getRepliesByThreadId(
        "thread-123"
      );

      expect(result).toStrictEqual([
        {
          id: firstReply.id,
          comment_id: firstReply.comment_id,
          date: firstReply.date,
          content: firstReply.content,
          is_deleted: firstReply.is_deleted,
          username: firstReply.username,
        },
        {
          id: secondReply.id,
          comment_id: secondReply.comment_id,
          date: secondReply.date,
          content: secondReply.content,
          is_deleted: secondReply.is_deleted,
          username: secondReply.username,
        },
      ]);
    });
  });

  describe("verifyAvailableReply function", () => {
    it("should return NotFoundError when reply is not available", async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      await expect(
        replyRepositoryPostgres.verifyAvailableReply({})
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return nothing when reply found", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({});
      await RepliesTableTestHelper.addReply({});

      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, {});

      await expect(
        replyRepositoryPostgres.verifyAvailableReply({
          replyId: "reply-123",
          commentId: "comment-123",
          threadId: "thread-123",
        })
      ).resolves.not.toThrowError(NotFoundError);
    });
  });
});
