const AWS = require("aws-sdk");

const dynamoDBConfig = {
  region: "us-east-2",
  endpoint: "dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAYZMED4HSEVR53HU3",
  secretAccessKey: "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",
};

AWS.config.dynamodb = dynamoDBConfig;
const db = new AWS.DynamoDB.DocumentClient();

exports.getDateFunction = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  return (newdate = day + "/" + month + "/" + year);
};

exports.idCreator = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

exports.checkIfUserExistFunction = function (id) {
  var idExist = false;

  let params = {
    TableName: "users",
    Key: {
      id: String(id),
    },
  };

  return new Promise((res, rej) => {
    db.get(params, function (err, data) {
      if (JSON.stringify(data) === "{}") {
        console.log("User Not Exist");
        idExist = false;
        res(false);
      } else {
        console.log("User Exist");
        console.log(data);
        idExist = true;
        res(true);
      }
      if (err) {
        rej(err);
      }
    });
  });
};

exports.returnUserExist = function (id) {
  var idExist = false;

  let params = {
    TableName: "users",
    Key: {
      id: String(id),
    },
  };

  return new Promise((res, rej) => {
    db.get(params, function (err, data) {
      if (JSON.stringify(data) === "{}") {
        idExist = false;
        res({ message: "user not exist in DB" });
      } else {
        idExist = true;
        res(data);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
