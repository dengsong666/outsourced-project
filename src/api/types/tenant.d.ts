export interface Tenant {
  /**
   * 地址
   */
  address?: string
  /**
   * 联系人
   */
  contacts?: string
  /**
   * 描述
   */
  describe?: string
  /**
   * 结束时间
   */
  end_time?: number
  /**
   * 经纬度
   */
  longitude_latitude?: string
  /**
   * 租户名称
   */
  name?: string
  /**
   * 简称
   */
  nick_name?: string
  /**
   * 租户图片
   */
  photo?: string
  /**
   * 开始时间
   */
  start_time?: number
  /**
   * 联系电话
   */
  telephone?: string
}

export interface Product {
  /**
   * 产品图标
   */
  product_icon: string
  /**
   * 产品ID
   */
  product_id: number
  /**
   * 产品名称
   */
  product_name: string
  /**
   * 租户的使用状态：0 未安装/1 启动 /2 禁用
   */
  product_state: number
}

export interface ProductModule {
  /**
   * 销售模块ID
   */
  module_id: number
  /**
   * 销售模块名称
   */
  module_name: string
  /**
   * 产品ID
   */
  product_id: number
  /**
   * 模块状态：0 未开通/1已开通
   */
  state: number
}

export interface ProductRole {
  /**
   * 角色ID
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
}

export interface ProductUser {
  /**
   * 用户名
   */
  account: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 专业
   */
  major?: string
  /**
   * 姓名
   */
  nick_name: string
  /**
   * 密码
   */
  password: string
  /**
   * 岗位
   */
  position?: string
  /**
   * 产品ID
   */
  product_id: number
  /**
   * 角色ID
   */
  role_id: number
  /**
   * 手机号
   */
  telephone: string
  /**
   * 租户ID
   */
  tenant_id: string
}
