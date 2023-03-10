// app.js
App({
  async onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'cloud1-0g7b2ug65d6138e6',
        traceUser: true,
      });

    }


    await wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/user/upsert",
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "POST"
    }).then(res => {

      if (res.data.code === 0) {

        console.log('onLanuch, user-->', res.data.data)
        this.globalData = {
          userInfo: res.data.data
        };
      }

    }).catch(err => console.error(err))

    
  }
});
