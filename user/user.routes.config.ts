/**
 * Define the User requests API
 *
 * Here, we are importing the CommonRoutesConfig class and extending it to our new class, called UserRoutes. With the
 * constructor, we send the app (the main express.Application object) and the name UserRoutes to CommonRoutesConfig’s
 * constructor.
 *
 * This example is quite simple, but when scaling to create several route files, this will help us avoid duplicate code.
 *
 * Suppose we would want to add new features in this file, such as logging. We could add the necessary field to the
 * CommonRoutesConfig class, and then all the routes that extend CommonRoutesConfig will have access to it.
 */

import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class UserRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'UserRoutes');
	}
	
	/**
	 * This logic lets any REST API client call our user endpoint with a POST or a GET request. Similarly, it lets a
	 * client call our /user/:userId endpoint with a GET, PUT, PATCH, or DELETE request.
	 */
	configureRoutes() {
		this.app.route(`/user`)
			.get((req: express.Request, res: express.Response) => {
				res.status(200).send(`List of user`);
			})
			.post((req: express.Request, res: express.Response) => {
				res.status(200).send(`Post to user`);
			});
		
		this.app.route(`/user/:userId`)
			.all((req: express.Request, res: express.Response, next: express.NextFunction) => {
				// this middleware function runs before any request to /user/:userId
				// but it doesn't accomplish anything just yet---
				// it simply passes control to the next applicable function below using next()
				//
				// This function will be beneficial when (later in the series) we create routes that are meant to be
				// accessed only by authenticated users.
				next();
			})
			// curl --location --request GET 'localhost:3000/user/12345'
			.get((req: express.Request, res: express.Response) => {
				res.status(200).send(`GET requested for id ${req.params.userId}`);
			})
			.put((req: express.Request, res: express.Response) => {
				res.status(200).send(`PUT requested for id ${req.params.userId}`);
			})
			.patch((req: express.Request, res: express.Response) => {
				res.status(200).send(`PATCH requested for id ${req.params.userId}`);
			})
			.delete((req: express.Request, res: express.Response) => {
				res.status(200).send(`DELETE requested for id ${req.params.userId}`);
			});
		
		return this.app;
	}
	
}
