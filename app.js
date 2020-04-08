const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function (req, res, next) {
  try {
    if ( !req.query.nums ) {
      // if no query string, throw an error
      throw new ExpressError("No numbers passed!", 400);
    }
    let nums = req.query.nums.split(',');
    let split = nums.map(num => {
      if (typeof num != 'number') {
        // if num in [nums] is not a number, throw an error
        throw new ExpressError("Not a number!", 400);
      }
      parseInt(num)});
    let mean = split.reduce((acc, val) => {
      return acc + val;
    }) / nums.length;
    return res.send( `hello i'm here with ${mean}` );
  } catch ( err ) {
    return next(err);
  }
});

app.get('/median', function (req, res) {
  
});

app.get('/mode', function (req, res) {
  
});

// bottom stuff ~~~~~~~~~~~~~~~


// generic error catcher
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function() {
  console.log("App on port 3000");
});

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}