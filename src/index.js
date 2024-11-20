import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyOpenapiGlue from "fastify-openapi-glue";
import { join, dirname } from "path";
import process from "node:process";
import handlers from "./swagger/index.js";

const dirName = dirname(import.meta.filename);

const openApiGlueOptions = {
	specification: join(dirName, "swagger/swagger.yaml"),
	serviceHandlers: handlers,
};
const startServer = async () => {
	const fastifyInstance = fastify({
		ajv: {
			customOptions: {
				strict: false,
			},
		},
	});
	fastifyInstance
		.register(fastifySwagger, {
			mode: "static",
			specification: {
				path: join(dirName, "swagger/swagger.yaml"),
			},
		})
		.register(fastifySwaggerUi, {
			routePrefix: "/swagger",
			uiConfig: {
				docExpansion: "full",
				deepLinking: false,
			},
			uiHooks: {
				onRequest: function (request, reply, next) {
					next();
				},
				preHandler: function (request, reply, next) {
					next();
				},
			},
			staticCSP: true,
			transformStaticCSP: (header) => header,
			transformSpecification: (swaggerObject) => {
				return swaggerObject;
			},
			transformSpecificationClone: true,
		})
		.register(fastifyOpenapiGlue, openApiGlueOptions);
	return fastifyInstance;
};

startServer()
	.then((fastifyInstance) => {
		console.log(fastifyInstance.printRoutes());
		const serverOptions = {
			port: 3001,
			host: "127.0.0.1",
		};

		fastifyInstance.listen(serverOptions, (err, address) => {
			if (err) {
				console.log("There is error in listening to server", err);
				process.exit(1);
			}

			console.log(`Server running successfully on ${address}`);
		});
	})
	.catch((err) => {
		console.log("There is an error starting the server", err);
		process.exit(1);
	});
