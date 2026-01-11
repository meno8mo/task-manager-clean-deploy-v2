const app = require('./app');

const connectMongo = require('./config/mongo');
const { port } = require('./config/env');

const startServer = async () => {
  await connectMongo();
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
