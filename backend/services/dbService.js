var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'test'});

module.exports = {
	// DB read operations
	dbReadResources : function(callback){
		client.execute("SELECT * FROM knowledge_tracker", function (err, result) {
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
	dbReadAll : function(callback){
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
		client.execute("INSERT INTO knowledge_tracker(userid,firstname,lastname,tech1,techl1l1atdate,techl2)"+ 
			"values('amsv.subi',{'poornesh.siva@outlook.com','subatra.pharmacy@outlook.com'},'Subatradevi',"+
			"'Siva',{'1984-12-09 11:20:00':'Bro Bday','2010-11-10 13:00:00':'Poornesh Bday'},[123,100,167])", 
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
		return [{"id":1,"name":"SBSA"},
				{"id":2,"name":"MASTER"},
				{"id":3,"name":"GOOGLE"},
				{"id":4,"name":"APPLE"}];
	},

	dbReadProjects : function(callback){
		return [{"id":1,"accountId":1,"name":"Selfie"},
							{"id":2,"accountId":1,"name":"nBOL"},
							{"id":3,"accountId":2,"name":"AWC Channel"},
							{"id":4,"accountId":1,"name":"Mandate Testing"}];
	}
};

