"use server"

import QueryString from "qs"
import crypto from 'crypto';

import { VnpParams } from "@/app/api/payments/vnpay/route"
import { insertPayment } from "@/drizzle/queries/payments/insertPayment"
import { sortVNPayObject } from "@/lib/sortVNPayObject"
import { getServerSession } from "@/lib/getServerSession";
import { updatePayment } from "@/drizzle/queries/payments/updatePayment";
import { updateCoins } from "@/drizzle/queries/user/updateCoins";

export const createVNPayUrl = async (
  amount: number,
  callbackUrl: string,
  bankCode: string,
): Promise<string | null> => {
  try {
    const session = await getServerSession()

    if (!session || !session.id) return null

    const bodyData: {
      amount: number,
      callbackUrl: string
      bankCode: string
      userId: string
    } = {
      amount,
      userId: session.id,
      callbackUrl,
      bankCode
    }

    const res = await fetch(`${process.env.APP_URL}/api/payments/vnpay`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(bodyData)
    })

    if (res.ok) {
      const data: {
        url: string,
        code: string,
        userId: string,
        service: string,
        status: string,
      } = await res.json()

      if (!data.code || !data.userId || !data.service) return null

      const payment = await insertPayment({
        code: data.code,
        service: data.service as "vnp",
        userId: data.userId,
      })

      if (!payment) return null

      return data.url
    }

    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const verificationVNPayPayment = async (data: VnpParams) => {
  try {
    const session = await getServerSession()

    if (!session) return {
      code: 401,
      message: "Không tìm thấy phiên đăng nhập, vui lòng lưu liên kết hiện tại đăng nhập và thử lại",
      data: null
    }
    const secureHash = data.vnp_SecureHash!

    let vnp_Params: VnpParams = {
      vnp_TmnCode: data.vnp_TmnCode,
      vnp_Amount: data.vnp_Amount,
      vnp_BankCode: data.vnp_BankCode,
      vnp_BankTranNo: data.vnp_BankTranNo,
      vnp_CardType: data.vnp_CardType,
      vnp_PayDate: data.vnp_PayDate,
      vnp_OrderInfo: data.vnp_OrderInfo,
      vnp_TransactionNo: data.vnp_TransactionNo,
      vnp_ResponseCode: data.vnp_ResponseCode,
      vnp_TransactionStatus: data.vnp_TransactionStatus,
      vnp_TxnRef: data.vnp_TxnRef,
    };

    vnp_Params = sortVNPayObject(vnp_Params);

    const secretKey = process.env.vnp_HashSecret!;
    var signData = QueryString.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
      const payDate = vnpPayDateToDate(data.vnp_PayDate)

      const updatedPayment = await updatePayment(
        "success",
        data.vnp_Amount! / 100,
        data.vnp_BankCode!,
        data.vnp_BankTranNo!,
        data.vnp_CardType!,
        payDate,
        data.vnp_TxnRef!,
        session.id!
      )

      if (!updatedPayment) return {
        code: 400,
        message: "Có lỗi trong quá trình cập nhật thông tin thanh toán",
        data: null
      }

      const updatedCoins = await updateCoins(
        session.id!,
        data.vnp_Amount! / 100,
        "plus"
      )

      if (!updatedCoins) return {
        code: 400,
        message: "Có lỗi trong quá trình cập nhật số coins",
        data: null
      }

      return {
        code: 200,
        message: "Nạp coins thành công",
        data: updatedCoins.coins ?? 0
      }
    }
    else {
      const payDate = vnpPayDateToDate(data.vnp_PayDate)

      await updatePayment(
        "reject",
        data.vnp_Amount ? data.vnp_Amount / 100 : null,
        data.vnp_BankCode ?? null,
        data.vnp_BankTranNo ?? null,
        data.vnp_CardType ?? null,
        payDate,
        data.vnp_TxnRef ?? null,
        session.id!
      )

      return {
        code: 400,
        message: "Thông tin thanh toán không chính xác",
        data: null
      }
    }

  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}

function vnpPayDateToDate(dateString?: string): Date | null {

  if (!dateString) return null

  const year = Number(dateString.substring(0, 4));
  const month = Number(dateString.substring(4, 6)) - 1; // Giảm đi 1 vì tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1)
  const day = Number(dateString.substring(6, 8));
  const hours = Number(dateString.substring(8, 10));
  const minutes = Number(dateString.substring(10, 12));
  const seconds = Number(dateString.substring(12, 14));

  const payDate = new Date(year, month, day, hours, minutes, seconds);

  return payDate
}