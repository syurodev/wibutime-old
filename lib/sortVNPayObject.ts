import { VnpParams } from "@/app/api/payments/vnpay/route";

export function sortVNPayObject(obj: VnpParams): VnpParams {
  let sorted: VnpParams = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    //@ts-ignore
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}