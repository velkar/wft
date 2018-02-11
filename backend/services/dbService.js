var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'test'});

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
	dbReadByEmpId : function(callback){
		client.execute("SELECT * FROM knowledge_tracker where userid=?", function (err, result) {
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
	// DB insert operations
	dbWrite : function(callback){
		client.execute("UPDATE kts1 set", 
		function (err, result) {
			if (!err){
	           console.log(results);
	           return callback('Successfully inserted');
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

