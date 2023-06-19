interface RequestConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  header?: object;
  nomsg?: boolean;
}

export interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

function handerErrorStatus(statusCode: number, requestConfig: RequestConfig) {
  let msg = "服务找不到";
  if (statusCode === 502 || statusCode === 503) {
    msg = "服务器开小差了~";
  }
  !requestConfig.nomsg &&
    wx.showToast({
      title: `${msg}，错误码：${statusCode}`,
      icon: "none",
    });
  return msg;
}
function handerError(err: { errMsg: string }, requestConfig: RequestConfig) {
  let msg = `请求异常`;
  if (/timeout/.test(err.errMsg)) {
    msg = "请求超时";
  }
  !requestConfig.nomsg &&
    wx.showToast({
      title: msg,
      icon: "none",
    });
  return msg;
}
export function request<T>(requestConfig: RequestConfig): Promise<ResponseData<T>> {
  const { url, data, header, method } = requestConfig;
  return new Promise((resolve, reject) => {
    // 默认header
    const contentType =
      requestConfig.method === "GET"
        ? "application/x-www-form-urlencoded"
        : "application/json";
    const header = {
      "content-type": contentType,
    };
    wx.request({
      method,
      url,
      data,
      header,
      success: function (res) {
        const code = res.statusCode || -404;
        const data = res.data;
        /** 接口请求成功*/
        if (code == 200) {
          resolve(data as any);
        } else if (code === 401) {
          // 未授权
          !requestConfig.nomsg &&
            wx
              .showModal({
                title: "登录失效",
                content: "登录失效，请重新登录",
              })
              .then((resModa) => {
                if (resModa.confirm) {
                }
              });
          reject({ code, msg: "未登录", data: data });
        } else {
          //非200及401状态码-数据处理
          const errMsg = handerErrorStatus(code, requestConfig);
          reject({ code, msg: errMsg, data });
        }
      },
      fail: (err) => {
        let msg = handerError(err, requestConfig);
        reject({ msg });
      },
    });
  });
}
