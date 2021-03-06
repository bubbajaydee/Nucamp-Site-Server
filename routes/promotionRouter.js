const express = require('express');
const promotionRouter = express.Router();
const authenticate = require('../authenticate');
const Promotion = require('../models/Promotions');

promotionRouter.route('/')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		Promotion.find()
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Promotion.create(req.body)
			.then((promotions) => {
				console.log('promotions Created ', promotions);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /promotions');
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Promotion.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

promotionRouter.route('/:promotionsId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
		Promotion.findById(req.params.promotionsId)
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/${req.params.promotionsId}`);
	})
	.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Promotion.findByIdAndUpdate(
			req.params.promotionsId,
			{
				$set: req.body,
			},
			{new: true}
		)
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Promotion.findByIdAndDelete(req.params.promotionsId)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

module.exports = promotionRouter;
