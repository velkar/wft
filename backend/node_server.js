var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
// This initiates to help getting data from request of type GET
//var url  = require('url');
var dbService  = require('./services/dbService.js');
var loginService  = require('./services/loginService.js');

var port = 1337;
// Setting context root for serving static files
app.use(express.static('../'));
// For parsing request values as jSON when POST is used from client side
app.use(bodyParser.json());
// Setting secret key for cookie
app.use(expressSession({secret : 'abcdefgh',
                        resave : true,
                        saveUninitialized : true}));

var pMap = {};

// This need to be loaded from DB based on account
pMap['NBOL'] = 'BEU-SBA-PJ-BOL-TPS-DEV';
pMap['SELFIE'] = 'BEU-SBA-PJ-SELFIE';
pMap['MAND'] = 'BEU-SBA-PJ-MAN-TPS-DEV';

//Add headers
app.use(function (req, res, next) {
    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Pass to next layer of middleware
    next();
});

/*app.get('/', function(req, res){
    console.log("Inside / route");
    var isSession = req.session.username ? true : false;
    console.log("Chk session available - " + isSession);
    if (isSession){
        console.log("Going to call routeValidation()");
        routeValidate(isSession,req,res);
    } 
    else{
        console.log("Going to render login.html");
        res.sendfile(path.resolve("../login.html"));
    }
})*/

// Handling data from POST from client side
app.post('/authenticate', function(req, res){
    console.log("Inside /authenticate route");
    var sesFlag = req.session.username ? true : false;
    console.log("Chk session available - " + sesFlag);
    routeValidate(sesFlag,req,res);
    console.log("/authenticate ends!!!");
    
})

// Handling data from POST from client side
app.get('/accounts', function(req, res){
    console.log("Inside /accounts route");
    res.send(dbService.dbReadAccounts());
    console.log("/accounts ends!!!");
    
})

// Handling data from POST from client side
app.get('/accounts/:aId', function(req, res){
    console.log("Inside /accounts/id route with id value : "+req.params.id);
    res.send(dbService.dbReadProjects());
    console.log("/accounts/id ends!!!");
    
})

// Handling data from POST from client side
app.get('/accounts/:aId/projects/:pId', function(req, res){
    console.log("/accounts/id/projects/id starts with accountId,projectId : "+req.params.aId+","+req.params.pId);
    console.log("map value of "+req.params.pId+" is "+pMap[req.params.pId]);
    dbService.dbReadResourcesByPjt(pMap[req.params.pId],function(data){
            res.send(data);
        });
})
// Handling data from POST from client side
app.get('/employee/:eId', function(req, res){
    console.log("/employee/eId of employee : "+req.params.eId);
    dbService.dbReadResourcesByEmpId(req.params.eId,function(data){
            res.send(data);
        });
})

// Handling data from POST from client side
app.put('/employee/:eId/:wId/:fId/:vId', function(req, res){
    console.log("/employee/eId of employee : "+req.params.eId+" "+req.params.fId+" "+req.params.vId);
    dbService.dbUpdateResourceByEmpId(req.params.eId,req.params.wId,req.params.fId,req.params.vId,function(data){
            res.send(data);
        });
})

function routeValidate(sesFlag,req,res){
    console.log("Inside routeValidate");
    if ((sesFlag && loginService.isValidSession(req.session.username, req.session.password)) 
        || 
        loginService.isValidSession(req.body.username,req.body.password)){
        console.log("Authentication sucessfull");
        if(!sesFlag){
            console.log("Set the request attributes in to session");
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            
        }
        console.log("Going to send SUCCESS");
        res.send("SUCCESS");
    }else {
        console.log("Authentication failed !!!");
        res.send("A_FAILED");
     }

}

app.listen(port);
console.log('Node.js express server started on port %s', port);



