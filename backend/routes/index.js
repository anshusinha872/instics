module.exports = {
	userController: require('./controller/userController'),
	pdfController: require('./controller/pdfController'),
	orderController: require('./controller/orderController'),
	cartController: require('./controller/cartController'),
	// cashFreeWebHook: require('./controller/webhooks/cashFreeWebHook'),
	upiWebHook: require('./controller/webhooks/upiWebHook'),
	adminController: require('./controller/adminController'),
	laundryController:require('./controller/laundryController'),
	laundryAdminController:require('./controller/laundryAdminController'),
	printAdminController:require('./controller/printAdminController'),
};