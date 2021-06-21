"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const Paytm = require("paytm-pg-node-sdk");

class DemoApp {
  static getPaymentStatus() {
    try {
      // var orderId = "3b801c6a-ca61-431b-b9e6-19809e9726df";
      var orderId = process.argv[2];
      var readTimeout = 80000;
      var paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(
        orderId
      );
      var paymentStatusDetail = paymentStatusDetailBuilder
        .setReadTimeout(readTimeout)
        .build();
      return Paytm.Payment.getPaymentStatus(paymentStatusDetail).then(function (
        response
      ) {
        if (response instanceof Paytm.SDKResponse) {
          console.log(response.getJsonResponse());
        }
      });
    } catch (e) {
      console.log("Exception caught: ", e);
      return Promise.reject(e);
    }
  }
  static setInitialParameters() {
    try {
      var env = Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;
      /* Find your Merchant ID and Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
      var mid = process.env.PAYTM_MID_KEY
      var key = process.env.PAYTM_MERCHANT_KEY
      /* Website: For Staging - WEBSTAGING, For Production - DEFAULT */
      var website = "xxxxxxxxxx";
      var client_id = "cid";
      var callbackUrl =  process.env.PAYTM_CALLBACK_URL
      Paytm.MerchantProperties.setCallbackUrl(callbackUrl);

      /** Initialize mandatory Parameters */
      Paytm.MerchantProperties.initialize(env, mid, key, client_id, website);
      /** Setting timeout for connection i.e. Connection Timeout */
      Paytm.MerchantProperties.setConnectionTimeout(5000);
    } catch (e) {
      console.log("Exception caught: ", e);
    }
  }
}
DemoApp.setInitialParameters();
DemoApp.getPaymentStatus();
