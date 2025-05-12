// Interface class which can be extended by specific payment service provider adapters.
export class FundingAdapter {

    makePayment() {
        throw new Error("Payment function from FundingAdapter interface is not implemented yet.")
    }
}