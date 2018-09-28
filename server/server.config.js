const CONFIG = {
	port: process.env.PORT || 3000,
	mongo_dictionary_db: process.env.MONGO_DICTIONARY_DB || "test_db",
	mongo_port: process.env.MONGO_PORT_DEV || "mongodb://localhost:27017",
	//mongo_dictionary_db: "heroku_0tdhlxcn",
	//mongo_port: "mongodb://username:password@ds117423.mlab.com:17423/heroku_0tdhlxcn", // passw: jj77, username: dannycaesar
	jwt_expiration_time: 24*60*60*1000,
	jwt_secret: process.env.JWT_SECRET || "secret"
}


module.exports = CONFIG;