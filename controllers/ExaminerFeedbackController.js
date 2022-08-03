const User = require("../models/user");
module.exports = async (req, res) => {
  console.log("this is this", req.params.id);
  console.log("this is that", req.body.id);

  let testResult;
  if (req.body.testResult === "on") {
    testResult = true;
  } else if (Object.keys(req.body).includes("reset")) {
    testResult = null;
  } else {
    testResult = false;
  }

  User.findOneAndUpdate(
    { _id: req.body.id },
    {
      feedback: req.body.feedback,
      isPassed: testResult,
    },
    {
      returnDocument: "after",
    }
  )
    .then((result) => {
      res.redirect("/candidate/" + req.body.id);
    })
    .catch((err) => {
      console.log(err);
    });
};
