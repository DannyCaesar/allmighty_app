const CONFIG = {
	port: process.env.PORT || 3000,
	mongo_dictionary_db: process.env.MONGO_DICTIONARY_DB || "test_db",
	//mongo_port: process.env.MONGO_PORT_DEV || "mongodb://localhost:27017",
	mongo_port: "mongodb://dannycaesar:jokerjok77@ds117423.mlab.com:17423/heroku_0tdhlxcn",
	jwt_expiration_time: 24*60*60*1000,
	jwt_secret: process.env.JWT_SECRET || "secret"
}


module.exports = CONFIG;