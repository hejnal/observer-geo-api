const gmaps = require("../lib/gmaps.js");
const nasa = require("../lib/nasa.js");
const dateformat = require("dateformat");

const DEFAULT_DIM = 0.10;

module.exports = {
    satImagesController: async function (req, res) {
        console.log(`Received a request: ${JSON.stringify(req.query)}`);

        const placeString = req.query.place;
        
        let today = new Date();
        let date;

        // as the date is optional - use the recent image, if the date is not passed.
        if (req.query.date == undefined) {
            console.log("Date has not been provided, use last week date as a default value.")
            const defaultDate = dateformat(today.setDate(today.getDate() - 7), "yyyy-mm-dd");       // if no date has been provided last week
            date =  defaultDate;
        } else {
            date = req.query.date;
        }
        
        try {
            const {
                lon,
                lat
            } = await gmaps.mapPlaceToLonLat(placeString);

            console.log(`Received coordinates: ${lon}, ${lat}`);
            const imageLocation = await nasa.fetchImageFromNasaApi(lon, lat, date, DEFAULT_DIM);
            console.log(`Returned image: ${imageLocation}`);

            res.setHeader('Content-Type', 'image/jpeg');
            res.redirect(301, imageLocation);
        } catch (err) {
            console.log(`Internal error occured. Error: ${err}`);
            res.status(404).send("Unable to find a place.");
        }
    }
}