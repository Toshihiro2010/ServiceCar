var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sql = require('mssql');
var coommon_function = require('./commonFunction/common_function.js');
var Car_model = require('./model/car_model.js');
var test_mssql = require('./test_mssql');

app.use(bodyParser.json());


//app.use(express.static('private'));
app.use('/image',express.static(__dirname + '/image'))
app.use('/pdf',express.static(__dirname + '/file_pdf'))

var port = process.env.PORT || 780;



app.get('/', function (req, res) {
    res.send('<h1>Hello CarMaintenance 55555555</h1>');

});

app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});

app.get('/test' , function(req,res){
	var test = test_mssql.myConfig();
	var temp = "rrrrrr";
	console.log(test);
	
	//console.log("test_mssql=> " + test);
	//res.send("helo 888");
	res.status(400).send("HELLO WORLD");
});

app.get('/getLicenseNo/:licencenNumber' , function(req,res){
	var licenInput = req.params.licencenNumber;
	console.log(licenInput);

	//test
	test_mssql.getCarFromLicensePlate(licenInput).then((result) =>{
		//console.log("result => " + JSON.stringify(result));
		var check = result.recordset.length;
		if(check > 0 ){
			res.send(result);
		}else{
			res.sendStatus(203);
		}
	}).catch(function (err) {
		res.status(500).send(err)
	}) 

});

app.get('/findLicenseAll' , function(req,res){

	test_mssql.getLicenNoAll().then(function(result){
		//var check = result.recordset.length;

		// var test = JSON.stringify(result);
		console.log("get => findLicenseAll");
		console.log(result);
		res.send(result);
		
	}).catch(function (err) {
		console.log(err);
		res.status(500).send(err)
	}) 

})

app.get('/putSQL' , function(req,res){

	test_mssql.putSQL().then((result) =>{
		var check = result.length;
		console.log("res => " + result);
		console.log("check => " + check);

		res.send(result);
	}).catch(function (err) {
		res.status(500).send(err)
	}) 

});

app.post('/syncData',function(req,res){

	var req_json = req.body;
	var result_status;

	(async function(){

		if(req_json){
			var status_fuel = await test_mssql.insertFuelMultiData(req_json.fuelData);
			var status_service = await test_mssql.insertServiceMultiData(req_json.serviceData);
			var status_tripcost = await test_mssql.insertTripCostMultiData(req_json.tripCost);
			var status_trip_detail = await test_mssql.insertTripDetailMultiData(req_json.tripDetail);

			result_status = await Car_model.StatusReturnServer(status_fuel,status_service,status_tripcost,status_trip_detail);

		}else{
			console.log("No data");
		}
		console.log("result => " + JSON.stringify(result_status));
		await res.send(result_status);
			
	})();

});



app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});