# node express cluster sample

## 詳細

** クラスタリングして処理を分散する **  
CPUの件数を確認しながら、処理をさばくような構成にする。


## usage

***set up***
```bash
# git clone
git clone git@github.com:hamamoto-seventh-pitch/expressClusterSample.git

# run node server
cd expressClusterSample
npm install 
npm start 
```

***loadtest install & test***

https://www.npmjs.com/package/loadtest

```bash 
# loadtest install 
npm install -g loadtest
```


**クラスターワーカーがある状態で実行する**

以下のようにapp.jsソースの状態で実行

```javascript
if(cluster.isMaster) {
    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    })
} else {
    app.listen(3000, () => {
        console.log(` server ${process.pid} @ http://localhost:3000 `);
    });
}

// app.listen(3000, () => {
//     console.log(' server @ http://localhost:3000 ')    
// });
```

```bash 
# run loadtest
# loadtest [-n requests] [-c concurrency] [-k] URL
loadtest -n 1000 -c 100 http://localhost:3000
```

**通常のシングルスレッドでの実行をする**

以下のようにapp.jsソースの状態で実行

```javascript
// if(cluster.isMaster) {
//     for (let i = 0; i < numCpu; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//         cluster.fork();
//     })
// } else {
//     app.listen(3000, () => {
//         console.log(` server ${process.pid} @ http://localhost:3000 `);
//     });
// }

app.listen(3000, () => {
    console.log(' server @ http://localhost:3000 ')    
});
```

```bash 
# run loadtest
# loadtest [-n requests] [-c concurrency] [-k] URL
loadtest -n 1000 -c 100 http://localhost:3000
```

##  memo
ロードテストではリクエスト回数1000、同時接続100でチェックしている。

