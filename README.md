# egg-ue

## Install

```bash
npm i @ustack/egg-ue --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.ue = {
  enable: true,
  package: '@ustack/egg-ue',
};
```

## Example
application
joi 
boom
fs --------->    fs-async-await
ajax(url, options){
    //  发送请求并判断status是否为2XX 
    // 返回 res 响应
}

context
joi
boom
ajax 同上
validate(schema = {}){
    // 传入joi图表进行验证
    // 若发现错误则发送badrequest回调
}

helper
_ ---------> lodash
uuid
fs ----------> fs-async-await
password.hash()  brcypt 
        .compare() brcypt 
pagination(data, page, limit){
    // data数据page分页 limit每页数据个数
    // return  { data, prev, next, count, page, limit }
}
exec: child_process.exec() 转化为promise对象
xor (oldArr, newArr){
    return {
        toDel: newArr里没有的,
        toAdd: oldArr里没有的
    }
}
getSymbolValue(obj, symbolKey) {
    // return obj[symbolKey对应的值]
}
randomCode(){
    return 0~900000    0变100000
}

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/unitedstack/halo/issues).

## License

[MIT](LICENSE)
