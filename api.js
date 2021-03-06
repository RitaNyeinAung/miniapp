import config from './config.js';

const api = {
	getHotSearch : 'Goods/hotSearch',
	getProductCategories : 'GoodsClass/getOtherClass',
	getHome : 'HomeIndex/home',
	getProductListByCategory : 'GoodsClass/getClassGoods',
	aboutEtcetera : 'IntnetInformation/aboutEtcetera',
	StyColor : 'IntnetInformation/color',
	goodsType : 'Goods/goodsType',
	newGoodsData : 'Goods/newGoods',
	getClass : 'Goods/getClass',
	recommend : 'Goods/recommend',
	getStoreAd : 'HomeIndex/getStoreAd',
	getProductInfoById : 'Goods/goodInfo',
	getProductSpec : 'Goods/goodSpecsByGoodsChildren',	
	getStoreList : 'Store/getStoreList',
	getCouponList : 'Coupon/couponSendList',
	getAddressList: 'UserAddress/addressLists?page=0',
	indexFloor : 'GoodsClass/indexFloor',
	storeHome : 'Store/storeHome',
	getCoupon : 'Coupon/couponReceiveBehavior',
	getOpenId : 'WeiLogin/login',
	getProductComment : 'OrderComment/getAllCommentContent',
	getConsultList: 'GoodsConsultation/consultationData',
	getVerificationCode : 'Register/registerSendMsg',
	submitVerificationCode : 'Register/bindAccount',
	submitConsultQuestion : 'GoodsConsultation/userCommitProblem',
	storeBanner : 'StoreAdv/getBanner',
	newGoods : 'Store/NewGoods',
	storeIrregular : 'StoreAdv/getIrregular',
	recommendStoreArticle : 'Store/recommendStoreArticle',
	buttonAdv : 'StoreAdv/getButton',
	getIndexAd : 'StoreAdv/getIndexAd',
	getRecommondGoods : 'Goods/getRecommondGoods',
	storeGoodsAll : 'Store/storeGoodsAll',
	storeDynamic : 'Store/storeDynamic',
	getStoreArticleCategory : 'Store/getStoreArticleCategory',
	getStoreArticle : 'Store/getStoreArticle',
	getStoreArticleById : 'store/getStoreArticleById',
	attenStore : 'Store/attenStore',
	cancelAttenStore : 'Store/cancelAttenStore',
	levelStoreClass : 'StoreClass/storeClass',
	shopDetails : 'Store/shopDetails',
	shopLicense : 'Store/shopLicense',
	storeClasses : 'StoreClass/storeClasses',
	storeHotClass : 'StoreClass/storeHotClass',
	userinfo : 'User/getUserInfo',
	hotSearch : 'Goods/hotSearch',
	keyWordSearch : 'HomeIndex/keyWordSearch',
	getSearchList : 'Brand/getSearchList',
	myFootprint : 'Pcenter/myFootprint',
	progressQueryList : 'OrderReturnGoods/progressQueryList',
	progressQuery : 'OrderReturnGoods/progressQuery',
	myCollection : 'Collection/myCollection',
	collectShops : 'Collection/collectShops',
	orderListAll : 'Order/orderListAll',
	pendingPayment : 'Order/pendingPayment',
	pendingDelivery : 'Order/pendingDelivery',
	goodsToBeReceived : 'Order/goodsToBeReceived',
	completed : 'Order/completed',
	haveBeenCancelled : 'Order/haveBeenCancelled',
	toBeEvaluated : 'Order/toBeEvaluated',
	integralGoodsList : 'IntegralGoods/integralGoodsList',
	integralGoodInfo : 'IntegralGoods/integralGoodInfo',
	integralLog : 'Integral/integralLog',
	userIntegral : 'User/getIntegral',
	myInvoice : 'InvoiceType/myInvoice',
	myComment : 'Pcenter/myComment',
	capitaSave : 'InvoiceType/capitaSave',
	capitaAdd : 'InvoiceType/capitaAdd',
	invoicesAreRaisedSave : 'InvoiceType/invoicesAreRaisedSave',
	invoicesAreRaisedDelete : 'InvoiceType/invoicesAreRaisedDelete',
	capitaDelete : 'InvoiceType/capitaDelete',
	invoicesAreRaisedAdd : 'InvoiceType/invoicesAreRaisedAdd',
	helpClass : 'StoreHelp/helpClass',
	feedback : 'FeedBack/feedback',
	feedbackType : 'FeedBack/feedBackType',
	noticeList : 'GoodsReport/reportList',
	noticeCheckSingle : 'GoodsReport/reportDetail',
	cancelNotice : 'GoodsReport/cancelReport',
	announcement_list : 'HomeIndex/announcementInfo',
	onlineMessage : 'Problem/onlineMessage',
	StoreHelp : 'StoreHelp/storeHelp',
	enterFlow : 'StoreHelp/enterFlow',
	standardOfInvestment : 'StoreHelp/standardOfInvestment',
	rulesOfCooperation : 'StoreHelp/rulesOfCooperation',
	PersonStoreAduitProgress : 'StorePerson/getStoreByUser',
	personEnter : 'StorePerson/personEnter',
	CompanyStoreAduitProgress : 'StoreJoinCompany/getStoreByUser',
	myConfirm : 'OrderIntegral/myConfirm',
	delOrder : 'OrderIntegral/delOrder',
	orderDel : 'Order/orderDel',
	orderDetail : 'Order/orderDetail',
	packageOrderAll : 'OrderPackage/orderListAll',
	packageOrderDetail : 'OrderPackage/orderDetail',
	packagePendingPayment : 'OrderPackage/pendingPayment',
	packagePendingDelivery : 'OrderPackage/pendingDelivery',
	packageGoodsToBeReceived : 'OrderPackage/goodsToBeReceived',
	packageCompleted : 'OrderPackage/completed',
	packageCancelOrder : 'OrderPackage/cancelOrder',
	packageHaveBeenCancelled : 'OrderPackage/haveBeenCancelled',
	packageToBeEvaluated : 'OrderPackage/toBeEvaluated',
	packageOrderDel : 'OrderPackage/orderDel',
	getOrderGroup : 'OrderGroup/getOrderGroup',
	my_wallet : 'MyWallet/myWalletMoney',
	myCouponLists : 'CouponList/myCouponLists',
	walletDetail : 'MyWallet/walletMoneyDetail',
	rechargeType : 'GetPayType/getPayRechargeResult',
	orderGroupLeagueMember : 'OrderGroup/orderGroupLeagueMember',
	orderGroupDetail : 'OrderGroup/orderGroupDetail',
	editMobileSendSms:'User/editMobileSendSms',
	editMobile:'User/editMobile',
	resetPassword:'User/modifyPassword',
	backPwd:'Register/backPwd',
	backPwdSendSms:'Register/backPwdSendSms',
	logOut:'Register/logOut',
	getDefault:'UserAddress/getDefault',
	getFreight:'FreightMonery/getFreightMoneyByEnoughToBuyImmediately',
	requeryConfirmOrderId:'Delivery/deliveryMoney',
	cartGoodsDetail:'Goods/cartGoodsDetail',
	orderBeginFromGood:'GeneratingOrder/orderBeginFromGood',
	paymentType : 'GetPayType/getPayResult',
	getBalance : 'Balance/getBalance',
	verifyPassword : 'Balance/smsPassword',
	initiatePayment : 'PayOrder/initiatePayment',
	getRegionList : 'Region/regionLists',
	addAddress : 'UserAddress/addAddress',
	editAddress : 'UserAddress/editAddress',
	addressInfo : 'UserAddress/addressInfo',
	addressDelete : 'UserAddress/addressDelete',
	getUserAddress : 'UserAddress/addressLists',
	deliveryCalc : 'Goods/deliveryCalculation',//????????????
	freightCalc : 'Goods/freightCalculation',//????????????
	getExpressInfo :'Goods/getExpressInfo',
	shopInfo:'Store/shopInfo',
	goodsDetail:'GoodsDetail/getGoodsDetail',
	goodsAttr:'Goods/goodAttr',//????????????????????????
	recommendSet:'GoodsPackage/packageSub',//????????????
	addToCart:"GoodsCart/addGoodToCart",//???????????????
	getCartItem:"GoodsCart/cartGoodsList",
	deleteOneCartItem:"GoodsCart/delGoodsCart",
	plusOneToCartItem : "GoodsCart/cartNumPlus",
	minusOneToCartItem : "GoodsCart/cartNumReduce",
	userBuyCartGoods : "GoodsCart/userBuyCartGoods",//????????????????????????????????? ????????????
	getUserCoupon : "OrderCouponOptions/usersCanUseCoupons",
	orderBeginFromCart:"GeneratingOrder/buildOrderByCart",
	getWeixinPayData:"WeiXinPay/pay",
	getLogo : 'IntnetInformation/logo',
	guessYouLike : 'GuessYouLike/guessYouLike',
	flashsale : '/Promotion/seckillList',//??????
	storeList: '/Store/storeGoodsAll',
	newGoodList: '/Goods/newArrivals',
	hotGoodList: '/Goods/hotSellingGoods',
	getGroupProduct : 'Promotion/groupPurchase',
	getGroupBuyPerson : 'Promotion/getLackingPeopleGroupBuy',
	getGroupBuyProductDetail : 'Promotion/getGoodsDetail',
	getSecKillProductList : 'Promotion/getSeckillList',
	getSecKillTimeList : 'Promotion/timeList',
	getSecKillProductDetail : 'Promotion/seckillDetail',
	getSecKillBuyProductDetail:'Promotion/seckillBuyDetail',
	generateSeckillProductOrder:'GeneratingOrder/orderBeginFromPanicGood',
	performSearch:'HomeIndex/keyWordSearch',
	getIntegralProducts:'IntegralGoods/integralGoodsList',
	getIntegralProductDetail:'IntegralGoods/integralGoodDetails',
	getIntegralProductInfo:'IntegralGoods/integralGoodInfo',
	generateIntegralProductOrder: 'GeneratingOrderIntegral/confirmExchange',
	initiateIntegralPayment : 'PayOrderByIntegral/initiatePayment',
	initiatePackagePayment : 'PayOrderByPackage/initiatePayment',
	uploadAvatar:'User/uploadPicture',
	EditUserInfo:'User/editUserInfo',
	AddToCollection:'Collection/addCollection',
	getCodeByBindAccount : 'Register/bindAccountSendMsg',
	serviceList : 'Service/serviceList',
	cancelOrder : 'Order/cancelOrder',
	buyAgain : 'OrderBuyAgain/buyAgain',
	orderPackageBuyAgain : 'OrderPackage/buyAgain',
	confirmGet : 'Order/confirmGet',
	orderPackageConfirmGet : 'OrderPackage/confirmGet',
	integralConfirmGet : 'OrderIntegral/confirmGet',
	integralCancelOrder : 'OrderIntegral/cancelOrder',
	integralGoodsInfo : 'OrderIntegral/integralGoodsInfo',
	orderNewBuy : 'OrderIntegral/orderNewBuy',
	uploadImageComment : 'UploadImage/uploadImageComment',
	commentImagesConfig : 'UploadImage/commentImagesConfig',
	commentOrder : 'OrderComment/commentOrder',
	lookGoodsExpress : 'LogisticsQuery/lookGoodsExpress',
	lookOrderPackageExpress : 'LogisticsQuery/lookOrderPackageExpress',
	isCheckIn : 'CanICheckIn/isCheckIn',
	getFirstId : 'GoodsClass/getFirstId',
	nextClassId : 'GoodsClass/nextClassId',
	getShopLevel : 'StoreGrade/getShopLevel',
	perfectInfo : 'StoreInformation/perfectInfo',
	storeBank : 'StoreCompanyBankInformation/storeBank',
	uploadImage : 'UploadImage/uploadImage',
	storeJoinCompany : 'StoreJoinCompany/storeJoinCompany',
	getAddressByLat : 'HomeIndex/getAddress',
}

for(let path in api){
	api[path] = config.server_url + api[path]; 
}
//039665
//10001

module.exports = api;
