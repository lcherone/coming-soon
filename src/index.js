require('dotenv').config({
    path: __dirname + '/../.env'
});

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.set("views", __dirname + '/views')
app.set("view engine", "ejs")
app.use('/images', express.static(__dirname + '/images'))

let images = {}
for (let env of Object.keys(process.env))
    if (env.startsWith('IMAGE_'))
        for (let domain of process.env[env].replace(/ /g, '').split(',').filter(Boolean))
            images[domain] = env.substring(6) + '.png'

app.get('*', (req, res) => res.render('index', {
    domain: req.hostname,
    image: images[req.hostname] || '1.png'
}))

app.listen(port)
