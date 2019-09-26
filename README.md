# egg-ue

## Install

```bash
npm i @bbyy/egg-ue --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.ue = {
  enable: true,
  package: '@bbyy/egg-ue',
};
```

## Example

### application
* joi 
* boom
```js
ajax(url, options){
    //  发送请求并判断status是否为2XX 
    // 返回 res 响应
}
```

### context
* joi
* boom
* ajax 同上
```js
validate(schema = {}){
    // 传入joi图表进行验证
    // 若发现错误则发送badrequest回调
}
```

### helper
* _ ---------> lodash
* uuid
```js
password {
    hash () {
        // brcypt.hash()
    },
    compare() {
        // brcypt.compare()
    }
}
pagination(data, page, limit){
    // data数据page分页 limit每页数据个数
    // return  { data, prev, next, count, page, limit }
}
exec() {
   // child_process.exec() 转化为promise对象
}
xor (oldArr, newArr){
    return {
        toDel: 合体 - newArr,
        toAdd: 合体 - oldArr
    }
}
getSymbolValue(obj, symbolKey) {
    // return obj[symbolKey对应的值]
}
randomCode(){
    return Math.random() * 900000 | 100000;
}
```

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/bbyy-me/egg-ue/issues).

## License

[MIT](LICENSE)
