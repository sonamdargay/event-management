import { FundingAdapter } from "./FundingAdapter";

export class StripeAdapter extends FundingAdapter {

    makePayment() {
        // Simply use 4242 4242 4242 4242 as card number and also date of expiry should be in the future everything else can be random.
        window.open("https://buy.stripe.com/test_7sY14pfrz4QK9OzdvY0gw00", '_blank')
    }
}