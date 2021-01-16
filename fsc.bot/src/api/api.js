const xpService = require('../services/xpService')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

async function auth(req, res, next) {
  if(req.headers && req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === "Bearer") {
    const token = req.headers["authorization"].split(" ")[1]

    const opts = {
      url: "https://discord.com/api/users/@me",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      // TODO: Add another check for server role
      let userRes = await axios(opts)
      req.user = userRes.data
      req.user.token = token
      next()
    } catch (err) {
      console.error(err)
      res.status(401).send()
    }
  } else {
    res.status(401).send()
  }
};

app.use(auth)

app.get('/xp', async (req, res) => {
  try {
    let xp = xpService.getXpForUserId(req.user.id)
    let level = xpService.getLevelForUserId(req.user.id)
    res.json({
      xp,
      level
    })
  } catch (err) {
    res.status(500).send()
  }
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`API listening on port ${port}`))