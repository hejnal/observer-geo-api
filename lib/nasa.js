const got = require("got");

const NASA_EARTH_API_URL = "https://api.nasa.gov/planetary/earth/imagery"
const NASA_EARTH_API_KEY = process.env.NASA_EARTH_API_KEY || "DEMO_KEY"

module.exports = {
    fetchImageFromNasaApi: async (lon, lat, date, dim) => {
        
            console.log(`Trying to call the NASA API: ${NASA_EARTH_API_URL}, with params: lon=${lon}, lat=${lat}, date=${date}, dim=${dim}`);
            const response = await got.get(NASA_EARTH_API_URL, {
                searchParams: {
                    lon: lon,
                    lat: lat,
                    date: date,
                    dim: dim,
                    api_key: NASA_EARTH_API_KEY
                }
            });
        
            const responseParsed = JSON.parse(response.body);
            if (parseInt(response.statusCode) != 200) {
                throw `Response from Nasa is not valid, received response: ${JSON.stringify(parsedResponse)}`;
            }

            return responseParsed.url;

    }
}