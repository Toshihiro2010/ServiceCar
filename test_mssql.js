var sql = require('mssql');
var request = new sql.Request();
var Car_model = require('./model/car_model.js');

var config = {
	user: 'CarMaintenance',
	password: 'CarMaintenance',
	server: 'sthq-dev01', // You can use 'localhost\\instance' to connect to named instance
	database: 'CarMaintenance'
}

// var config = {
// 	user: 'stecon',
// 	password: 'Stec2018%%',
// 	server: 'stecondb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
// 	database: 'CarMaintenance',
// 	options: {
//         encrypt: true // Use this if you're on Windows Azure
//     }
// }


exports.myConfig = function() {
    return config;
};


exports.getCarFromLicensePlate = function(licenInput) {

	console.log("in => getCarFromLicensePlate");
	var licenInput2 = '%' + licenInput + '%';

	// return new Promise(function (resolve, reject) {
	//     sql.connect(config).then(() => {
	// 	    return sql.query`select * from tblCar WHERE LicenseNo = ${test}`
	// 	}).then(result => {
	// 		console.log(result);
	// 		resolve(result);
	// 	}).catch(err => {
	// 	    console.log("err => "  + err);
	// 	    reject(err);
	// 	})
	// })

	return new sql.ConnectionPool(config).connect().then(pool => {
		    // return pool.query`select * from tblCar WHERE LicenseNo = ${licenInput}`;
		    return pool.query`select * from tblCar WHERE LicenseNo Like ${licenInput2}`;
		}).then(result => {
			console.log(result);
			return result;
		}).catch(err => {
			return "";
		    console.log(err);	
		})

	// (async function(){
	// 	sql.connect(config).then(() => {
	// 	    return sql.query`select * from tblCar`
	// 	}).then(result => {
	// 		console.dir("in result");
	// 	    //console.dir(result)
	// 	    return result;
	// 	}).catch(err => {
	// 		return "";
	// 	    // ... error checks
	// 	})
	// })

	// sql.connect(config).then(() => {
	//     return sql.query`select * from mytable where id = ${test}`
	// }).then(result => {
	//     console.dir(result)
	// }).catch(err => {
	//     // ... error checks
	// })
};

exports.getLicenNoAll = function(){
	return new sql.ConnectionPool(config).connect().then(pool => {
		    return pool.query`select * from tblCar`;
		}).then(function(result){
			//var test = new Car_model.CarModel(result.recordset,"11/02/2561");

			return result;
		}).catch(err => {
			return "";
		    console.log(err);	
		})


	// (async function () {
	//     let pool = await new sql.ConnectionPool(config).connect();

	//     return "";

	// })()


};


exports.putSQL = function(){
	return new sql.ConnectionPool(config).connect().then(pool => {
	    return pool.query`INSERT INTO tblLog (messange,detail) VALUES ('test2','arigato gozai mus2')`;
	}).then(result => {
	    console.dir(result);
	    return result;
	}).catch(err => {
	    // ... error checks
	    console.log(err);
	    return "";
	})
};

exports.insertFuelMultiData = function(fuelDataList){
	
	return (async function(){
		var result_status = false;
		try{

			let pool = await new sql.ConnectionPool(config).connect();
			for(let i = 0 ; i < fuelDataList.length ; i++){
				//console.log(fuelDataList[i]);
				let licenseplate = fuelDataList[i].license_plate;
				let odometer = fuelDataList[i].odometer;
				let unit_price = fuelDataList[i].unit_price;
				let fuel_type = fuelDataList[i].fuel_type;
				let volume = fuelDataList[i].volume;
				let total_price = fuelDataList[i].total_price;
				let payment_type = fuelDataList[i].payment_type;
				let latitude = fuelDataList[i].latitude;
				let longitude = fuelDataList[i].longitude;
				let transaction_date = fuelDataList[i].transaction_date;
				let note = fuelDataList[i].note;
				let create_date = fuelDataList[i].date_create;
				let update_date = fuelDataList[i].date_update;
				let create_by = fuelDataList[i].create_by;
				let update_by = fuelDataList[i].update_by;
				let status = fuelDataList[i].status;

				if(status == 0){
					status = 1;
				}

				const request = await pool.request();
				//request.input('my_licensePlate' , sql.Varchar , licenseplate);

				let sql = "INSERT INTO tblFuelJournal (license_plate,odometer,unit_price,fuel_type,volume,total_price,payment_type,";
				sql += "latitude,longitude,note,transaction_date,create_date,update_date,status)"; 
				sql += " VALUES ('" + licenseplate + "'," + odometer + "," + unit_price + ",'" + fuel_type + "'," + volume + "," + total_price + ",'" + payment_type + "',";
				sql += latitude + "," + longitude + ",'" + note + "','" + transaction_date + "','" + create_date + "','";
				sql += update_date + "'," + status + ")";

				let result = await request.query(sql);
			}
			result_status = true;
			return result_status;

		}catch(err){
			console.log("error Naja " + err);
			return result_status;
		}

	})()

};

exports.insertServiceMultiData = function(serviceDataList){
	
	return (async function(){
		var result_status = false;
		try{

			let pool = await new sql.ConnectionPool(config).connect();

			for(let i = 0 ; i < serviceDataList.length ; i++ ){
				let license_plate = serviceDataList[i].license_plate;
				let service_id = serviceDataList[i].service_id;
				let odometer = serviceDataList[i].odometer;
				let service_cost = serviceDataList[i].service_cost;
				let latitude = serviceDataList[i].latitude;
				let longitude = serviceDataList[i].longitude;
				let location_name = serviceDataList[i].location_name;
				let transaction_date = serviceDataList[i].transaction_date;
				let create_date = serviceDataList[i].date_create;
				let update_date = serviceDataList[i].date_update;
				let status = serviceDataList[i].status;

				if(status == 0){
					status = 1;
				}

				const request = await pool.request();

				let sql = "INSERT INTO tblServiceJournal (service_id,license_plate,odometer,service_cost,latitude,longitude,location_name,";
				sql += "transaction_date,create_date,update_date,status)"; 
				sql += " VALUES (" + service_id + ",'" + license_plate + "'," + odometer + "," + service_cost + "," + latitude + "," + longitude + ",'" + location_name + "','" + transaction_date + "','";
				sql += create_date + "','" + update_date + "'," + status + ")";

				//console.log("sql => " + sql);
				let result = await request.query(sql);

			}
			result_status = true;
			return result_status;

		}catch(err){
			console.log("error Naja " + err);
			return result_status;
		}

	})()

};



exports.insertTripCostMultiData = function(tripCostDataList){
	
	return (async function(){
		var result_status = false;
		try{

			let pool = await new sql.ConnectionPool(config).connect();

			for(let i = 0 ; i < tripCostDataList.length ; i++ ){
				let license_plate = tripCostDataList[i].license_plate;
				let price_type = tripCostDataList[i].price_type;
				let title = tripCostDataList[i].title;
				let money = tripCostDataList[i].money;
				let note = tripCostDataList[i].note;
				let transaction_date = tripCostDataList[i].transaction_date;
				let create_date = tripCostDataList[i].date_create;
				let update_date = tripCostDataList[i].date_update;
				let status = tripCostDataList[i].status;

				if(status == 0){
					status = 1;
				}

				const request = await pool.request();

				let sql = "INSERT INTO tblTripCostJournal (license_plate,price_type,title,money,note,";
				sql += "transaction_date,create_date,update_date,status)"; 
				sql += " VALUES ('" + license_plate + "','" + price_type + "','" + title + "'," + money + ",'" + note + "','" + transaction_date + "','";
				sql += create_date + "','" + update_date + "'," + status + ")";

				//console.log("sql => " + sql);
				let result = await request.query(sql);

			}
			result_status = true;
			return result_status;

		}catch(err){
			console.log("error Naja " + err);
			return result_status;
		}

	})()

};

exports.insertTripDetailMultiData = function(tripDetailDataList){
	
	return (async function(){
		var result_status = false;
		try{

			let pool = await new sql.ConnectionPool(config).connect();

			for(let i = 0 ; i < tripDetailDataList.length ; i++ ){
				let license_plate = tripDetailDataList[i].license_plate;
				let departure_date = tripDetailDataList[i].departure_date;
				let departure_odometer = tripDetailDataList[i].departure_odometer;
				let departure_latitude = tripDetailDataList[i].departure_latitude;
				let departure_longitude = tripDetailDataList[i].departure_longitude;
				let departure_location_name = tripDetailDataList[i].departure_location_name;
				let arrival_date = tripDetailDataList[i].arrival_date;
				let arrival_odometer = tripDetailDataList[i].arrival_odometer;
				let arrival_latitude = tripDetailDataList[i].arrival_latitude;
				let arrival_longitude = tripDetailDataList[i].arrival_longitude;
				let arrival_parking_location = tripDetailDataList[i].arrival_parking_location;
				let note = tripDetailDataList[i].note;
				let transaction_date = tripDetailDataList[i].transaction_date;
				let date_create = tripDetailDataList[i].date_create;
				let date_update = tripDetailDataList[i].date_update;
				let update_by = tripDetailDataList[i].update_by;
				let status = tripDetailDataList[i].status

				if(status == 0){
					status = 1;
				}
				
				const request = await pool.request();

				let sql = "INSERT INTO tblTripJournal (license_plate,departure_date,departure_odometer,departure_latitude,departure_longitude,";
				sql += "departure_location_name,arrival_date,arrival_odometer,arrival_latitude,arrival_longitude,arrival_parking_location,note,";
				sql += "transaction_date,date_create,date_update,status)"; 
				sql += " VALUES ('" + license_plate + "','" + departure_date + "'," + departure_odometer + "," + departure_latitude + "," + departure_longitude + ",";
				sql += "'" + departure_location_name + "','" + arrival_date + "'," + arrival_odometer + ",'" + arrival_latitude + "','" + arrival_longitude + "',";
				sql += "'" + arrival_parking_location + "','" + note + "'";
				sql += ",'" + transaction_date + "','" + date_create + "','" + date_update + "'," + status + ")";
				//console.log("sql => " + sql);
				let result = await request.query(sql);

			}
			result_status = true;
			return result_status;
		}catch(err){
			console.log("error Naja " + err);
			return result_status;
		}

	})()

};

//Add Value Tomorrow


sql.on('error' , err =>{
		console.log("error => " + err);
		return "error";
})