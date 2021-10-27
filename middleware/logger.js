//* This is a logger middleware. 
//* It logs in the console when running the express app.
//* It gives information on the requests being made to our server/API

function buildObjectLog(obj) {
  if (!Object.keys(obj).length) return 'None'
  return JSON.stringify(obj, null, 4)
}

export default function logger(req, _res, next) {
  console.log(`--------------------------------
🔴 INCOMING REQUEST!
🔴 Request Method: ${req.method}
🔴 Request URL: ${req.url}
😺‍ Request Headers: ${buildObjectLog(req.headers)}
📦 Request Body: ${buildObjectLog(req.body)}
❓ Request Query: ${buildObjectLog(req.query)}
--------------------------------`)

  next()
}
