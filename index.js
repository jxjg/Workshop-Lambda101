var AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-1'
});
var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = (event, context, callback) => {
// get the entered user from the query string
    var currentUser = 'mehs'; //req.params.lanID;
// get the user info if it exits
    var params = {
        TableName: 'user-info',
        KeyConditionExpression: "lanID = :value",
        ExpressionAttributeValues: {
            ":value": currentUser
        },
        "ProjectionExpression": "lanID, firstName, lastName, mobile"
    };
    docClient.query(params, function(err, data) {
        console.log("data: " + JSON.stringify(data));
        console.log("error: " + err);
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
};