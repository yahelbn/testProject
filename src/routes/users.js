const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const utils = require("../../utill");

const dynamoDBConfig = {
  region: "us-east-2",
  endpoint: "dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAYZMED4HSEVR53HU3",
  secretAccessKey: "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",
};

AWS.config.dynamodb = dynamoDBConfig;
const db = new AWS.DynamoDB.DocumentClient();

/**
 * check status of user
 */
router.post("/", async (req, res) => {
  try {
    //Check if user exist by id
    const user = await utils.returnUserExist(req.query.id);

    var statusOfUser = user.Item.status;
    if (statusOfUser === 1) {
      res.send({ message: "The user is sign in" });
    } else if (statusOfUser === 0) {
      res.send({ message: "The user is sign out" });
    } else if (statusOfUser === undefined) {
      res.send({ message: "The user is not exist" });
    }
  } catch (e) {
    res.status(400);
  }
});

router.get("/login", (req, res) => {
  /**
   * check if user inside db by making scan request in DynamoDB AWS.
   */
  try {
    var queryData = {
      TableName: "users",
      FilterExpression: "username=:username and password=:password",
      ExpressionAttributeValues: {
        ":username": req.query.username,
        ":password": req.query.password,
      },
    };

    db.scan(queryData, function (err, details) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        if (JSON.stringify(details.Items) === "[]") {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    });

    res.status(200);
  } catch (e) {
    res.status(400);
  }
});

/**
 *  sign up ( create user name ) by making put request to aws dynamoDB.
 */
router.post("/create", async (req, res) => {
  //From post request user JSON
  const userSignup = req.body.user;

  //Create id
  const id = utils.idCreator();

  var checkIfUserExist = true;
  while (checkIfUserExist === false) {
    //Create id
    const id = utils.idCreator();

    //Check if user exist by id
    checkIfUserExist = await utils.checkIfUserExistFunction(id);
  }
  try {
    var input = {
      id: String(id),
      username: userSignup.username,
      password: userSignup.password,
      nickname: userSignup.nickname,
      create_time: utils.getDateFunction(),
      status: 1,
      ROLE: "USER",
    };
    var params = {
      TableName: "users",
      Item: input,
    };
    db.put(params, function (err, data) {
      if (err) {
        console.log("users::save::error - " + JSON.stringify(err, null, 2));
        res.status(400);
      } else {
        console.log("users::save::success");

        res
          .status(200)
          .send({ user: userSignup, message: "A new user has been created" });
      }
    });

    res.status(200);
  } catch (e) {
    res.status(400);
  }
});

router.get("/checkrole", (req, res) => {
  /**
   * check role of the user
   */
  try {
    var queryData = {
      TableName: "users",
      FilterExpression: "username=:username and password=:password",
      ExpressionAttributeValues: {
        ":username": req.query.username,
        ":password": req.query.password,
      },
    };

    db.scan(queryData, function (err, details) {
      if (err) {
        console.log(err, err.stack);
      } else {
        if (JSON.stringify(details.Items) === "[]") {
          res.send("");
        } else {
          res.send(details.Items[0].ROLE);
        }
      }
    });

    res.status(200);
  } catch (e) {
    res.status(400);
  }
});

module.exports = router;
