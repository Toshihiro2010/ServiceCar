exports.CarModel = function (carList,date) {
    this.carList = carList;
    this.date = date;
}



exports.StatusReturnServer = function(statusFuel,statusService,statusTripCost,statusTripDetail){
	var status = {
		fuel: statusFuel,
		service : statusService,
		tripCost : statusTripCost,
		tripDetail : statusTripDetail
	};
	return status;
}