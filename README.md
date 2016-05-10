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
