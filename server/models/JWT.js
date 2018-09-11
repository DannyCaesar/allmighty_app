const jwt = require('jsonwebtoken');
const config = require('../server.config.js');

function JWT() {
	this.sign = TokenSign.bind(this); 
	this.verify = TokenVerify.bind(this);
	return this;
}

function TokenSign(){
	return (
		 jwt.sign({
			data: 'foobar'
			}, 'secret', { expiresIn: config.jwt_expiration_time })
		)
}

function TokenVerify(){
	return 'verified';
}


module.exports = JWT;