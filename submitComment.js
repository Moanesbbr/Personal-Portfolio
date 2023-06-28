const faunadb = require('faunadb');

const { Create, Collection } = faunadb.query;

const handler = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Initialize the FaunaDB client
    const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

    // Create a new comment in the FaunaDB collection
    await client.query(
      Create(Collection('comments'), {
        data: {
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
        },
      })
    );

    res.status(200).json({ message: 'Comment submitted successfully' });
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ error: 'An error occurred while submitting the comment' });
  }
};

module.exports = handler;
