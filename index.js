const express = require("express");
const bodyParser = require('body-parser');
const {satImagesController} = require('./controllers/satImages');

const {
    validate,
    ValidationError,
    Joi
} = require('express-validation');

const port = process.env.PORT || 8080

const apiValidation = {
    query: Joi.object({
        place: Joi.string()
            .regex(/^[a-zA-Z0-9 ]+$/),
        date: Joi.string()
            .trim()
            .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
            .optional()
    }),
}

// create an express server
const app = express();
app.use(bodyParser.json())

// use API validation and define the route handler logic in the satImages controller
app.get('/sat-images', validate(apiValidation, {}, {}), satImagesController);

// use a validation middleware
app.use(function (err, req, res, next) {

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
})

// listed to the local port
app.listen(port, () => {
    console.log("The server has started.");
});