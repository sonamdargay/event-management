import { FundingAdapter } from "./FundingAdapter";

export class PaypalAdapter extends FundingAdapter {

    makePayment() {
        window.open("https://www.paypal.com/donate/?token=9BiOl3dKVTK8lgeSgxk7l-TK1LN37Y6hVeiL0fDxhTZWlX7LlHoKq3VfwvbyohHvgb66qxQ_6QZiSPfuSxaokfS87H4&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6ImVkMjcyYzdkZjNfbWRpNm16aTZtemsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjguMCJ9", '_blank')
    }
}