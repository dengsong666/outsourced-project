// pages/info/info.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatar: [],
    active_collapse: ["1", "2"],
    show_upload_grade: false,
    grade_total: "",
    grade_rank: "",
    college_name:'',
    onBeforeClose: () =>
      new Promise((reslove) => {
        wx.showModal({
          content: "请仔细确认，诚信提交，一经提交便无法修改",
          success(res) {
            if (res.confirm) {
              reslove(true);
              console.log("用户点击确定");
            } else if (res.cancel) {
              reslove(false);
              console.log("用户点击取消");
            }
          },
        });
      }),
  },
  onAfterUploadRead(event: WechatMiniprogram.CustomEvent) {
    const _this = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: "https://example.weixin.qq.com/upload",
      filePath: file.url,
      name: "file",
      formData: { user: "test" },
      success(res) {
        _this.setData({ avatar: { ...file, url: res.data } });
      },
    });
  },
  onCollapseChange(event: WechatMiniprogram.CustomEvent) {
    this.setData({
      active_collapse: event.detail as any,
    });
  },
  onUploadGrade() {
    this.setData({ show_upload_grade: true });
  },
  onSearch(e:WechatMiniprogram.CustomEvent){
    this.setData({college_name:e.detail as unknown as string})
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
