var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'wipapp'});

module.exports = {
	// DB read operations
	dbReadResourcesByPjt : function(pjtCode,callback){
		var query = "SELECT * FROM skilltracker WHERE wbscode='"+pjtCode+"'";
		console.log("The value of choosen query is "+query);
		client.execute(query, function (err, result) {
			if (!err){
	           if ( result.rows.length > 0 ) {
	           		console.log(result.rows);
	           		return callback(result.rows);
	            } else {
	               console.log("No results");
	           }
	       }else{
	       		console.log(err);
	       }
    	});
	},

	dbReadResourcesByEmpId : function(empId,callback){
		var query = "SELECT * FROM skilltracker WHERE empid='"+empId+"'";
		client.execute(query, function (err, result) {
			if (!err){
	           if ( result.rows.length > 0 ) {
	           		console.log(result.rows);
	           		return callback(result.rows);
	            } else {
	            	console.log("No results");
	           }
	       }else{
	       		console.log(err);
	       }
    	});
	},

	dbUpdateResourceByEmpId : function(empId,fieldId,valId,callback){
		var query = "UPDATE skilltracker SET "+fieldId+"='"+valId+"' WHERE empid='"+empId+"'";
		console.log(query);
		client.execute(query, function (err, result) {
			if (!err){
	           if ( result.rows.length > 0 ) {
	           		console.log(result.rows);
	           		return callback(result.rows);
	            } else {
	            	console.log("No results");
	           }
	       }else{
	       		console.log(err);
	       }
    	});
	},

	dbReadAccounts : function(callback){
		console.log("dbService.dbReadAccounts")
		return [{"id":'SBSA',"name":"SBSA"},
				{"id":'MASTER',"name":"MASTER"},
				{"id":'GOOGLE',"name":"GOOGLE"},
				{"id":'APPLE',"name":"APPLE"}];
	},

	dbReadProjects : function(callback){
		return [{"id":'SELFIE',"accountId":'SBSA',"name":"Selfie"},
				{"id":'NBOL',"accountId":'SBSA',"name":"nBOL"},
				{"id":'MAND',"accountId":'SBSA',"name":"Mandate Testing"}];
	}
};

