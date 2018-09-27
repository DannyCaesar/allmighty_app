const jwt = require('jsonwebtoken');
const config = require('../server.config.js');

function JWT() {
	this.sign = TokenSign.bind(this); 
	this.verify = TokenVerify.bind(this);
	return this;
}

function TokenSign(data){
	return (
		 jwt.sign({
			data
			}, config.jwt_secret, { expiresIn: config.jwt_expiration_time })
		)
}

function TokenVerify(jwtCookie){
	return jwt.verify(jwtCookie, config.jwt_secret)
}


module.exports = JWT;