发布订阅模式,用于模块间通信

```javascript
window.pubsub = new Pubsub();

// module b.js
pubsub.publish("chart-refresh",{
    groupId : 5
});

// module a.js
pubsub.subscribe("chart-refresh",function(config){
    console.log(config.groupId)
});
```
