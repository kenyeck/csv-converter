// Vercel serverless function entry point
// This imports the pre-built Express app from the tsup dist output
const { createServer } = require('../dist/server.cjs');

const app = createServer();

module.exports = app;
