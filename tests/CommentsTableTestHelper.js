const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  async addComment({
    id = "comment-123",
    threadId = "thread-123",
    owner = "user-123",
    date = new Date(),
    content = "contentx",
  }) {
    const query = {
      text: `
        INSERT INTO comments (id, thread_id, owner, date, content)
        VALUES ($1, $2, $3, $4, $5)
      `,
      values: [id, threadId, owner, date, content],
    };

    await pool.query(query);
  },

  async findCommentById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableTestHelper;
