// pages/navigator/index/index.js
import tabbar from '../../tabbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: tabbar,
    today: new Date(),
    items: [],
    items_changed: [],
    items4: [{
      id: 1,
      name: '单刀赴会',
      checked: true
    }, {
      id: 2,
      name: '大意失荆州',
      checked: false
    }, {
      id: 3,
      name: '水淹七军',
      checked: false
    }],
    items5: [{
      id: 1,
      name: '日温差大',
      checked: true
    }, {
      id: 2,
      name: '年降雨量小',
      checked: false
    }, {
      id: 3,
      name: '年温差小',
      checked: false
    }, {
      id: 4,
      name: '植物根长小',
      checked: false
    }],
    items6: [{
      id: 1,
      name: '潘森',
      checked: true
    }, {
      id: 2,
      name: '提莫',
      checked: false
    }, {
      id: 3,
      name: '孙悟空',
      checked: false
    }],
    items7: [{
      id: 1,
      name: '在任何情况下都可以开启，不会被敌方打断',
      checked: true
    }, {
      id: 2,
      name: '在开启过程中，无法对敌方进行攻击，但是可以移动',
      checked: false,
      disabled: true
    }, {
      id: 3,
      name: '开启后只能免疫技能攻击，无法免疫普通攻击',
      checked: false
    }],
    items8: [{
      id: 1,
      name: 'JavaScript',
      checked: false
    }, {
      id: 2,
      name: 'CSS',
      checked: true
    }, {
      id: 3,
      name: 'NodeJS',
      checked: false
    }, {
      id: 4,
      name: 'Webpack',
      checked: false
    }],
    items9: [{
      id: 1,
      name: '篮球',
      checked: true
    }, {
      id: 2,
      name: '排球',
      checked: false
    }, {
      id: 3,
      name: '足球',
      checked: false
    }],
    items10: [{
      id: 1,
      name: '成龙',
      checked: true
    }, {
      id: 2,
      name: '甄子丹',
      checked: false
    }, {
      id: 3,
      name: '周润发',
      checked: false
    }, {
      id: 4,
      name: '周星驰',
      checked: false
    }],
    items11: [{
      id: 1,
      name: '成龙',
      checked: false
    }, {
      id: 2,
      name: '甄子丹',
      checked: false
    }, {
      id: 3,
      name: '周润发',
      checked: false
    }, {
      id: 4,
      name: '周星驰',
      checked: false
    }],
    position: 'left'

  },

  change(e) {
    let index = e.currentTarget.dataset['index'];
    let items = this.data[`items${index}`];
    items.forEach(item => {
      if(item.name === e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      [`items${index}`]: items
    });
  },

  dueChange(e) {
    let {items, items_changed} = this.data;
    let todo = items.find(i => i.id == e.detail.key);
    todo.checked = e.detail.checked;
    todo.status = 3;

    items_changed = items_changed.filter(i => i.id !== todo.id);
    items_changed.push(todo);

    this.setData({
      items: items,
      items_changed: items_changed
    })

    wx.lin.showMessage({
      content: `${todo.name}    已完成!`,
      type: 'warning',
      icon: 'warning'
    })
  },

  activeChange(e) {
    // 删除active 的，增加 done的
    let {items, items_changed} = this.data;
    console.log('active e-->', e)

    let todo = items.find(i => i.id == e.detail.key);
    todo.checked = e.detail.checked;
    todo.status = 2;

    items_changed = items_changed.filter(i => i.id !== todo.id);
    items_changed.push(todo);


    this.setData({
      items: items,
      items_changed: items_changed
    })

    console.log('active items-->', items)
    wx.lin.showMessage({
      content: `${todo.name}    已完成!`,
      type: 'success',
      icon: 'success'
    })

  },


  doneChange(e) {
    
    console.log('done e-->', e)
    let {items, items_changed} = this.data 
    
    let todo = items.find(i => i.id == e.detail.key);
    todo.checked = e.detail.checked;
    
    if (todo.status === 2) {
      todo.status = 0;
    } else if (todo.status === 3) {
      todo.status = 1;
    } else {
      // 不合法，不处理
    }

    items_changed = items_changed.filter(i => i.id !== todo.id);
    items_changed.push(todo);

    this.setData({
      items: items,
      items_changed: items_changed
    })

    console.log('done items-->', items)

    wx.lin.showMessage({
      content: `${todo.name}    已取消完成!`,
      type: 'error',
      icon: 'error'
    })
    

  },
  change2(e) {

    let index = e.currentTarget.dataset['index'];
    let items = this.data[`items${index}`];
    items.forEach(item => {
      if(item.id.toString() === e.detail.key) {
        item.checked = e.detail.checked;
      }
    });
    this.setData({
      [`items${index}`]: items
    });
  },
  
  tipOverflow(data) {
    let title = data.detail.type === 'overflow_max_selected' ? `最多选择${data.detail.limitNumber}个` : `至少选择${data.detail.limitNumber}个`;
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000
    });
  },

  requestTodoList(userId) {
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/todo/list?userId="+userId,
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "GET"
    }).then(res => {
      
      const list = res.data.data;
      this.setData({
        items: list
      })

    }).catch(err => console.error(err))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp()
    
    if (app.globalData === undefined || app.globalData.userInfo === undefined) {
      console.log('no global')
      // 没有取到，就调用回调函数
      app.globalDataCallback = (user) => {
        if (user !== undefined) {
          userId = user.id;
          console.log('callback-->', user)
          this.requestTodoList(user.id)
        }
      }
      
    } else {
      userId = app.globalData.userInfo.id;
      console.log('have global')
      this.requestTodoList(userId)
    } 

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    let {items, items_changed} = this.data
    if (items_changed.length == 0) {
      return;
    }

    const userId = getApp().globalData.userInfo.id;
    console.log('todopage , onhide! changed-->', items, items_changed)
    // 更新todos
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/todo/update?userId="+userId,
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "POST",
      "data": JSON.stringify(items_changed)
    }).then(res => {
      console.log('update todos', res.data)
      // changed 修改为空
      this.setData({
        items_changed: []
      })

    }).catch(err => console.error(err))


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

    console.log('todo page, unload!!!')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})