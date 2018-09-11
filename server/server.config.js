const CONFIG = {
	port: process.env.PORT || 3000,
	mongo_dictionary_db: process.env.MONGO_DICTIONARY_DB || "test_db",
	mongo_port: process.env.MONGO_PORT_DEV || "mongodb://localhost:27017",
	jwt_expiration_time: 1*1*60*1000
}


module.exports = CONFIG;