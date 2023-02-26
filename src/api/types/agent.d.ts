export interface Agent {
  address: string
  contacts: string
  created_at: number
  created_name: string
  describe: string
  end_time: number
  icon: string
  id: string
  longitude_latitude: string
  name: string
  nick_name: string
  start_time: number
  state: number
  telephone: string
  updated_at: number
  updated_name: string
}

export interface AgentUser {
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
