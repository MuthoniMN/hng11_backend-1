const express = require('express')
const app = express()

require('dotenv').config({ path: './.env' })

const PORT = process.env.PORT

app.get('/api/hello', async (req, res) => {
    const name = req.query.visitor_name
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    console.log(ip);

    try {
        // get city
        const result = await fetch(`http://api.weatherapi.com/v1/ip.json?key=${process.env.WEATHER_API_KEY}&q=${ip}`)
        const data2 = await result.json();
        const city = data2.city
        console.log(city);

        // get location
        const results = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
        const data = await results.json();
        console.log(data);
        const temp = data.current.temp_c

        return res.json({
            current_ip: ip,
            location: city,
            greeting: `Hello, ${name}!, the temperature is ${temp} degrees Celcius in ${city}`
        })
    } catch (error) {
        console.error(error)
        return res.json({
            message: "An error has occured"
        })
    }

})

app.listen(PORT, () => console.log("App running!"))


module.exports = app