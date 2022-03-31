const asyncMiddleware = fn =>
  (req, res, next) => {
      //resolves the function which was wrapped in a promise
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
module.exports = asyncMiddleware;