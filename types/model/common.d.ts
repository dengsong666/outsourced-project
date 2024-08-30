interface Res<D = any> {
  code: number;
  message: string;
  data: D;
  requestId: string;
  status: "ACCESS_DENIED" | "BAD_REQUEST" | "EXCEPTION" | "SUCCESS" | "UNAUTHORIZED" | "VALIDATION_EXCEPTION" | "WRONG_CREDENTIALS"
}
interface PageReq {
  pageNum: number;
  pageSize: number;
}
interface PageRes<L = any> {
  dataList: L[]
  pageIndex: number
  pageSize: number
  totalCount: number
}
interface MemberPackage {
  id: number
  integral: number
  price: number
  validTime: number
}
interface Order {
  orderId: string
  orderPrice: string
  orderTime: string
  orderType: string
}
interface OrderStatus {
  createTime: string
  orderId: string
  status: string
  statusDesc: string
}
interface Pay {
  orderId: string
  payQrcode: string
  payUrl: string
}