export const baseNaviConfigs = [{
  icon: '/images/component/card.png',
  title: '中信银行',
  desc: '账单日:12，还款日:出账单后20天',
  componentsPath: '/pages/filter/pages/base/index?type=string'
},
{
  icon: '/images/component/card.png',
  title: '工商银行-文',
  desc: '账单日:25, 还款日:账单日后19天',
  componentsPath: '/pages/filter/pages/base/index?type=array'
},
{
  icon: '/images/component/card.png',
  title: '农业银行',
  desc: '账单日',
  componentsPath: '/pages/filter/pages/base/index?type=is'
}
];

export const filterNaviConfigs = [{
  icon: '/images/filter/classnames.png',
  title: 'ClassNames',
  desc: '动态设置class',
  componentsPath: '/pages/filter/pages/classnames/index'
}, {
  icon: '/images/filter/zeroPadding.png',
  title: 'ZeroPadding',
  desc: '补零',
  componentsPath: '/pages/filter/pages/zero-padding/index'
}, ];
