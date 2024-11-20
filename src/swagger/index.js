export default {
	userSignUp: async (request, reply) => {
		reply.status(200).send({
			message: "User registered successfully",
		});
	},

	userLogin: async (request, reply) => {
		reply.status(200).send({
			accessToken: "abcdefghijklmnopqrstuvwxyz",
			refreshToken: "abcdefghijklmnopqrstuvwxyz",
			expiresIn: "3600",
		});
	},
};
