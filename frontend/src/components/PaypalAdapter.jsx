import { FundingAdapter } from "./FundingAdapter";

export class PaypalAdapter extends FundingAdapter {

    makePayment() {
        window.open("https://www.paypal.com/pools/c/9eLqsv2Q4h", '_blank')
    }
}