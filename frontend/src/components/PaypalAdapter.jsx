import { FundingAdapter } from "./FundingAdapter";

export class PaypalAdapter extends FundingAdapter {

    makePayment() {
        window.open("https://www.paypal.com/donate?token=MWpmrYYIYrfdok_EwoROAc7BRsFKv_UmkFZ8IhSLtwWBTX39RQvwzCLo8TFcuP4eYSOijP3poNZvL9obRApucSgd7k0", '_blank')
    }
}