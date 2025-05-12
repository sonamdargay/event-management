export class FundingProcessor {

    constructor(adapter) {
        this.adapter = adapter;
    }

    processFunding() {
        this.adapter.makePayment();
    }
}