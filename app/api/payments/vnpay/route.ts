import { format } from "date-fns"
import querystring from "qs"
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";
import { sortVNPayObject } from "@/lib/sortVNPayObject";

type RequestBody = {
  amount: number
  callbackUrl: string
  bankCode: string
  userId: string
}

export type VnpParams = {
  vnp_Version?: string;
  vnp_Command?: string;
  vnp_ResponseCode?: string;
  vnp_PayDate?: string;
  vnp_TransactionNo?: string;
  vnp_TmnCode?: string;
  vnp_Locale?: string;
  vnp_CardType?: string;
  vnp_TransactionStatus?: string;
  vnp_SecureHashType?: string;
  vnp_TxnRef?: string;
  vnp_CurrCode?: string;
  vnp_BankTranNo?: string;
  vnp_OrderInfo?: string;
  vnp_OrderType?: string;
  vnp_Amount?: number;
  vnp_ReturnUrl?: string;
  vnp_IpAddr?: string;
  vnp_CreateDate?: string;
  vnp_SecureHash?: string;
  vnp_BankCode?: string;
}

export async function POST(
  req: NextRequest,
  res: NextResponse
) {
  try {
    const body: RequestBody = await req.json()
    const { amount, callbackUrl, bankCode, userId } = body

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const currentDate = new Date();

    // Tạo createDate và orderId
    const createDate = format(currentDate, 'yyyyMMddHHmmss');
    const orderId = format(currentDate, 'ddHHmmss');

    const ipAddr = req.ip || req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "192.168.1.1"
    const tmnCode = process.env.vnp_TmnCode!
    const secretKey = process.env.vnp_HashSecret!
    let vnpUrl = process.env.vnp_Url!
    const returnUrl = `${process.env.APP_URL}${callbackUrl}`
    const locale = "vn"
    const currCode = "VND"

    let vnp_Params: VnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_BankCode: bankCode,
      // vnp_ExpireDate: expireDate,
    };

    vnp_Params = sortVNPayObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params.vnp_SecureHash = signed

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return new Response(JSON.stringify({
      url: vnpUrl,
      code: orderId,
      userId: userId,
      service: "vnp",
      status: "pending"
    }))
  } catch (error) {
    return new Response(JSON.stringify({ error: "Lỗi server" }))
  }
}