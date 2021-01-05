const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

const dynamoDBConfig = {
  region: "us-east-2",
  endpoint: "dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAYZMED4HSEVR53HU3",
  secretAccessKey: "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",
};

AWS.config.dynamodb = dynamoDBConfig;
const db = new AWS.DynamoDB.DocumentClient();

/* return all users in db by makign scan request to DynamoDB */
router.get("/users", (req, res) => {
  var queryData = {
    TableName: "users",
    FilterExpression: "begins_with(id, :tagIDValue)",
    ExpressionAttributeValues: {
      ":tagIDValue": "_",
    },
  };

  db.scan(queryData, function (err, details) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send(err);
    } else {
      res.send(details.Items);
    }
  });
});

module.exports = router;
