const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const AWS = require("aws-sdk");
const { environments } = require("./src/config/constants.json");
const port = process.env.PORT || 5000;

const dynamoDBConfig = {
  region: "us-east-2",
  endpoint: "dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAYZMED4HSEVR53HU3",
  secretAccessKey: "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",
};

AWS.config.dynamodb = dynamoDBConfig;
const db = new AWS.DynamoDB.DocumentClient();

/* import all routes */
const users = require("./src/routes/users");
const admin = require("./src/routes/admin");
/* Serve static files from the React app */
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

/* security package */
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === environments.DEVELOPMENT) {
  app.use(cors());
  app.use(morgan("tiny"));
}

/* routes */
app.use("/api/users", users);
app.use("/api/admin", admin);

/* gets you to react generated index file - root of your application */
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

/* startup */
app.listen(port, undefined, () =>
  console.log(`server is running on port: ${port}`)
);
