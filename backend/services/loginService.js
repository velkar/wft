
module.exports = {
	// Session checking operations
	isValidSession : function(username,password){
		console.log("LoginService - validating username & password");
		if (username == 'admin' 
			&& password == 'pwd'){
			console.log("Authentication Success!!");
			return true;
		}else{
			console.log("Authentication failed !!!");
			return false;
		}
	}
	
};