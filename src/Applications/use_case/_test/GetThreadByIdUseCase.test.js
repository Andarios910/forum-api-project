const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ReplyRepository = require("../../../Domains/replies/ReplyRepository");
const DetailThread = require("../../../Domains/threads/entities/DetailThread");
const GetThreadByIdUseCase = require("../GetThreadByIdUseCase");

describe("GetThreadByIdUseCase", () => {
  it("should orchestrating the get thread by id action correctly", async () => {
    const useCasePayload = {
      id: "thread-123",
    };
    const currentDate = new Date();
    const expectedThread = {
      id: "thread-123",
      title: "title thread",
      body: "body thread",
      date: currentDate,
      username: "user",
      comments: [
        {
          id: "comment-123",
          username: "user",
          date: currentDate,
          content: "content comment",
          replies: [
            {
              id: "reply-123",
              content: "contentx",
              date: currentDate,
              username: "user",
            },
          ],
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.getThreadById = jest.fn(() =>
      Promise.resolve(
        new DetailThread({
          id: "thread-123",
          title: "title thread",
          body: "body thread",
          date: currentDate,
          username: "user",
        })
      )
    );
    mockCommentRepository.getCommentsByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "comment-123",
          username: "user",
          date: currentDate,
          content: "content comment",
          is_deleted: false,
        },
      ])
    );
    mockReplyRepository.getRepliesByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "reply-123",
          comment_id: "comment-123",
          content: "contentx",
          date: currentDate,
          is_deleted: false,
          username: "user",
        },
      ])
    );

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const thread = await getThreadByIdUseCase.execute(useCasePayload.id);

    expect(thread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(
      useCasePayload.id
    );
  });

  it("should not display deleted content", async () => {
    const useCasePayload = {
      id: "thread-123",
    };
    const currentDate = new Date();
    const expectedThread = {
      id: "thread-123",
      title: "some thread",
      body: "anything",
      date: currentDate,
      username: "user",
      comments: [
        {
          id: "comment-123",
          username: "user",
          date: currentDate,
          content: "x",
          replies: [
            {
              id: "reply-123",
              content: "**balasan telah dihapus**",
              date: currentDate,
              username: "user",
            },
          ],
        },
        {
          id: "comment-124",
          username: "user",
          date: currentDate,
          content: "**komentar telah dihapus**",
          replies: [],
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.getThreadById = jest.fn(() =>
      Promise.resolve(
        new DetailThread({
          id: "thread-123",
          title: "some thread",
          body: "anything",
          date: currentDate,
          username: "user",
        })
      )
    );
    mockCommentRepository.getCommentsByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "comment-123",
          username: "user",
          date: currentDate,
          content: "x",
          is_deleted: false,
        },
        {
          id: "comment-124",
          username: "user",
          date: currentDate,
          content: "x",
          is_deleted: true,
        },
      ])
    );
    mockReplyRepository.getRepliesByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "reply-123",
          comment_id: "comment-123",
          content: "contentx",
          date: currentDate,
          is_deleted: true,
          username: "user",
        },
      ])
    );

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const thread = await getThreadByIdUseCase.execute(useCasePayload.id);

    expect(thread).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      useCasePayload.id
    );
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(
      useCasePayload.id
    );
  });
});
