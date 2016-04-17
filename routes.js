// routes.js  	
var db = require('./db.js');
var seeder = require('./dbSeed.js');

module.exports = function(app) 
{
    // server routes ===========================================================
	app.get('/api/flights', function(req, res) {
        
        db.connect(function(cb)
        {
            if(cb == true)
            {
                db.getFlights(function(content)
                {
                var jsonContent = JSON.parse(content);
                res.send(jsonContent);
                });
            }   
        });
    });

    app.get('/api/airports', function(req, res) {
        
        db.connect(function(cb)
        {
        	if(cb == true)
        	{
        		db.getAirports(function(content)
	        	{
	        	var jsonContent = JSON.parse(content);
	        	res.send(jsonContent);
	        	});
        	}	
        });
    });

    app.get('/api/airplanes', function(req, res) {
        
        db.connect(function(cb)
        {
            if(cb == true)
            {
                db.getAirplanes(function(content)
                {
                var jsonContent = JSON.parse(content);
                res.send(jsonContent);
                });
            }   
        });
    });

    app.get('/api/bookings', function(req, res) {
        
        db.connect(function(cb)
        {
            if(cb == true)
            {
                db.getBookings(function(content)
                {
                var jsonContent = JSON.parse(content);
                res.send(jsonContent);
                });
            }   
        });
    });

    app.get('/', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

        /* SEED DB */
    app.get('/db/seed', function(req, res) {
    	seeder.seed(function(cb)
    	{
            if(cb == true)
            {
                res.send("Database Seeded!");
            }
            if(cb == false)
            {
                res.send("Error Seeding Database!");
            }
    	});
    });      

    /* DELETE DB */
    app.get('/db/delete', function(req, res) {
    	db.clearDB(function(cb){
    		console.log(cb);
    	});
    });      

    /* ******************************************** */
    /*  ROUTES IN WHICH YOUR APPLICATION REQUIRES */
    /* ******************************************** */

    /* Middleware */

    /* ROUND-TRIP SEARCH REST ENDPOINT */
    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
        
        // retrieve origin, destiantion, departingDate, returningDate, and class from req.params.{{origin | departingDate | ...}}
        // return an array of objects with this exact format
        console.log("URL CALLED");
        //console.log();
        res.send(
        [{
            "flightNumber"      : "SE2804",
            "aircraftType"      : "Boeing",
            "aircraftModel"     : "747",
            "departureDateTime" : "Tuesday, April 12, 2016 06:25 PM",
            "arrivalDateTime"   : "Wednesday, April 13, 2016 12:25 AM",
            "origin"            : "JFK",
            "destination"       : "CAI",
            "cost"              : "750",
            "currency"          : "USD",
            "class"             : "economy",
            "Airline"           : "United"
        },{
            "flightNumber"      : "SE2805",
            "aircraftType"      : "Boeing",
            "aircraftModel"     : "747",
            "departureDateTime" : "Friday, April 23, 2016 04:25 AM",
            "arrivalDateTime"   : "Friday, April 23, 2016 03:25 PM",
            "origin"            : "CAI",
            "destination"       : "JFK",
            "cost"              : "845",
            "currency"          : "USD",
            "class"             : "economy",
            "Airline"           : "United"
        }] );
    });

    // Error Handling
    app.use(function(req, res, next) 
    {
   	res.status(404).send('404 NOT FOUND');
  	//res.sendfile('./public/error.html', {root: __dirname })
	});

	/* ONE-WAY SEARCH REST ENDPOINT */
    app.get('/api/flights/search/:origin/:departingDate', function(req, res) {
        // retrieve origin, destiantion, departingDate, returningDate, and class from req.params.{{origin | departingDate}}
        // return an array of objects with this exact format
        return 
        [{
            "flightNumber"      : "SE2804",
            "aircraftType"      : "Airbus",
            "aircraftModel"     : "A320",
            "departureDateTime" : "Tuesday, April 12, 2016 06:25 PM",
            "arrivalDateTime"   : "Wednesday, April 13, 2016 12:25 AM",
            "origin"            : "JFK",
            "destination"       : "CAI",
            "cost"              : "1567",
            "currency"          : "USD",
            "class"             : "economy",
            "Airline"           : "United"
        }];    
    });        

    /* ONE-WAY SEARCH REST ENDPOINT */
    app.post('/api/flights/search/oneway', function(req, res) {
        // retrieve origin, destiantion, departingDate, returningDate, and class from req.payload
        // return an array of objects matching format above
        return [{}];
    });

    /* ROUND-TRIP SEARCH REST ENDPOINT */
    app.post('/api/flights/search/roundtrip', function(req, res) {
        // retrieve origin, destiantion, departingDate, returningDate, and class from req.payload
        // return an array of objects matching format above
        return [{}];
    }); 

};
