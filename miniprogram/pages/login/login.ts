// pages/login/login.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    role: "",
    subject:"",
    phone: "",
    show_select: false,
    columns: {
      role: ["学生", "家长"],
      subject: ["文科", "理科"],
    },
    filed: "",
  },
  /**
   * 点击输入
   * @param e 
   */
  onClickInput(e: WechatMiniprogram.BaseEvent) {
    const { filed } = e.currentTarget.dataset;
    this.setData({
      show_select: true,
      filed,
    });
  },
  /**
   * Popup关闭
   */
  onClosePopup() {
    this.setData({ show_select: false });
  },
  /**
   * Picker改变
   * @param e 
   */
  onChange(e: WechatMiniprogram.CustomEvent) {
    const {  value } = e.detail;
    this.setData({[this.data.filed]:value})
  },
  /**
   * 提交确认
   */
  onConfirm(){
    console.log(111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});