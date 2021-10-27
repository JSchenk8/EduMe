//* This is an errorhandler middleware. It evaluates the errors from try/catch
//* statements and gives back useful error codes. 
//? It also sends back the error in every case, so that one can read the body
//? of the error


export default function errorHandler(err, req, res, next) {
  if (err.name === 'ValiationError') {
    res.status(422).send(err)
  } else if (err.name === 'CastError') {
    res.status(404).send(err)
  } else if (err.statusCode === 400) {
    res.status(400).send(err)
  } else {
    res.status(500).send(err)
  }
  next()
}