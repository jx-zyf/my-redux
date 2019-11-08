## my-redux

简单实现redux，react-redux和中间件机制

### my-redux主要实现createStore和bindActionCreators
* createStore接收reducer，返回一个对象，包含getState，dispatch，subscribe等方法
* bindActionCreators将每个creator与dispatch绑定并返回绑定之后函数(也可不实现此方法，只需对外暴露一个dispatch，我们手动dispatch一个action，但是这种写法没有绑定之后的方便)

### react-redux主要实现Provider和connect
* Provider是一个组件，只渲染它的子组件，负责把store放到context中，所有的子组件都可以拿到store
* connect负责连接组件
	* 接收一个组件，将redux数据放入组件的props内，并且返回一个组件
	* 当redux中的数据发生改变时，通知组件
 
重点就是[context](https://linxunzyf.cn/posts/cb30c8d6/#context)的实现
