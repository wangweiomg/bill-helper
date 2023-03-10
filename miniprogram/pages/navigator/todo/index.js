// pages/navigator/index/index.js
import tabbar from '../../tabbar'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: tabbar,
    today: new Date(),

    items1: [{
      id: 1,
      name: '青花瓷',
      checked: true
    }, {
      id: 2,
      name: '双截棍',
      checked: false
    }, {
      id: 3,
      name: '一千年以后',
      checked: false
    }, {
      id: 4,
      name: '江南',
      checked: true
    }],
    items2: [{
      id: 1,
      name: '功夫',
      checked: false
    }, {
      id: 2,
      name: '喜剧之王',
      checked: false
    }, {
      id: 3,
      name: '少林足球',
      checked: false
    }],
    items3: [{
      id: 1,
      name: '春天',
      checked: true
    }, {
      id: 2,
      name: '夏天',
      checked: false
    }, {
      id: 3,
      name: '秋天',
      checked: false
    }, {
      id: 4,
      name: '冬天',
      checked: false
    }],
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
    let {items1, items3} = this.data;
    let todo = items1.filter(i => i.name === e.detail.key)[0];
    todo.checked = e.detail.checked;
    items3.unshift(todo);
    this.setData({
      items1: items1.filter(i => i.name !== e.detail.key),
      items3: items3
    })

  },

  activeChange(e) {
    // 删除active 的，增加 done的
    let {items2, items3} = this.data;

    let todo = items2.filter(i => i.name === e.detail.key)[0];
    todo.checked = e.detail.checked;
    items3.unshift(todo)
    this.setData({
      items2: items2.filter(i => i.name !== e.detail.key),
      items3: items3
    })

    wx.lin.showMessage({
      content: `${todo.name}    已完成!`,
      type: 'success',
      icon: 'success'
    })

  },


  doneChange(e) {
    
    let {items1, items2, items3} = this.data 
    
    let todo = items3.filter(i => i.name === e.detail.key)[0];
    todo.checked = e.detail.checked;
    if (todo.status === 1) {
      // 放进items1, 并排序
      items1.push(todo)
      // Todo 排序

      this.setData({
        items1: items1
      })

    } else if (todo.status === 0) {
      // 放进items2， 并排序
      items2.push(todo)
      // todo 排序
    
      this.setData({
        items2: items2
      })
    } else {
      // 不合法，不处理
    }

    this.setData({
      items3: items3.filter(i => i.name !== e.detail.key)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callContainer({
      "config": {
        "env": "prod-7gaxhaj4785afe65"
      },
      "path": "/api/todo/list",
      "header": {
        "X-WX-SERVICE": "springboot-kj23"
      },
      "method": "GET"
    }).then(res => {
      // this.setData({
      //   cardList: res.data.data,
      //   totalCardLimit: res.data.data.map(e => e.cardLimit).reduce((prev, curr) => prev + curr, 0) / 10000
      // })

      
      const list = res.data.data;
      const overdue = list.filter(i => i.type===1 && i.status===1); 
      const active = list.filter(i => i.type===1 && i.status===0); 
      const done = list.filter(i => i.type===1 && i.status>1); 
      console.log('data-->', res.data.data);
      console.log('overdue', overdue);
      console.log('active', active);
      console.log('done', done);
      this.setData({
        items1: overdue,
        items2: active,
        items3: done
      })

    }).catch(err => console.error(err))

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
    console.log('todopage , onhide!!')

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