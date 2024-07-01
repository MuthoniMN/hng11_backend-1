const express = require('express')
const app = express()

require('dotenv').config({ path: './.env' })

const PORT = process.env.PORT

app.get('/api/hello', async (req, res) => {
    const name = req.query.visitor_name
    const ip = req.socket.remoteAddress.replace("::ffff:", "")

    // get location
    const results = await fetch(`https://www.weatherapi.com/docs/search.json?key=${process.env.WEATHER_API_KEY}q=${ip}`)
    const data = await results.json();
    console.log(data);


    return res.json({
        current_ip: ip,
        location: req.socket.a,
        greeting: `Hello, ${name}!, the temperature is 11 degrees Celcius in ${req.headers.location}`
    })
})

app.listen(PORT, () => console.log("App running!"))