/*
 * 用于模块间的通信
 * demo: http://jsbin.com/vevepinavo/edit?html,output
 * ie8+ 支持(iframe,frame或者同tab)
 */


function Pubsub(){
    this.__init__();

    // todo:身份标示
    // publisher
    // subscriber
}

Pubsub.prototype = {
    store:{},
    subscribe:function(topic,callback){
        //todo 多次调用怎么办
        if(!this.store[topic]){
            this.store[topic] = [];
        }

        this.store[topic].push({
            callback:callback
        });
    },
    unsubscribe:function(topic,callback){},
    publish:function(topic,data){
        var publisherName = 'Publisher-' + (+new Date());
        var obj = {
            __pubsub_name__:topic,
            __pubsub_data__:data,
            __pubsub_publisher__: publisherName
        };

        window.postMessage(JSON.stringify(obj),"*");
        return publisherName;
    },
    __init__:function(){
        var self = this;
        window.addEventListener("message", function(e){
            try{
                var obj = JSON.parse(e.data);
                for(var topic in self.store){
                    if(obj.__pubsub_name__ === topic ){
                        self.store[topic].forEach(function(item){
                            item.callback.call(self,obj.__pubsub_data__);
                        });
                    }
                }
            }catch(x){ }
        }, false);
    },
};


module.exports = Pubsub
