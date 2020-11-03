const got = require("got");

const GMAPS_GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json"
const GMAPS_GEOCODE_API_KEY = process.env.GMAPS_GEOCODE_API_KEY || "Default Key"

module.exports = {
    mapPlaceToLonLat: async (placeString) => {

        const response = await got.get(GMAPS_GEOCODE_API_URL, {
            searchParams: {
                address: placeString,
                key: GMAPS_GEOCODE_API_KEY
            }
        });
        const parsedResponse = JSON.parse(response.body);

        console.log(parsedResponse);

        if (parsedResponse.status != "OK") {
            throw `Response from gMaps is not valid, received response: ${JSON.stringify(parsedResponse)}`;

        }

        let lon = parsedResponse.results[0].geometry.location.lng;
        let lat = parsedResponse.results[0].geometry.location.lat;
        console.log(`Succesfully mapped: ${placeString} to coordinates: lon: ${lon}, lat: ${lat}`);

        return {
            lon,
            lat
        };
    }
}