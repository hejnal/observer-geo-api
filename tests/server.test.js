var assert = require("assert");
var request = require('supertest');
var express = require('express');

// Module under test
var {
    satImagesController
} = require('../controllers/satImages.js');

console.log(satImagesController);

describe('server.routes.satImages', function () {

    var app;

    beforeEach(function (done) {
        app = express();
        app.use('/sat-images', satImagesController);
        done();
    });

    it('try calling the satImages API (with Date)', function (done) {
        request(app)
            .get('/sat-images?place=zaragoza&date=2020-10-15')
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(301)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('try calling the satImages API (with Future Date)', function (done) {
        request(app)
            .get('/sat-images?place=zaragoza&date=2100-10-15')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('try calling the satImages API (with no Date)', function (done) {
        request(app)
            .get('/sat-images?place=zaragoza')
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(301)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('try calling the satImages API (wrong place)', function (done) {
        request(app)
            .get('/sat-images?place=qwertyui')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

});