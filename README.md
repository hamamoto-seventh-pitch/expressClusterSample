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


```bash 
# run loadtest
# loadtest [-n requests] [-c concurrency] [-k] URL
loadtest -n 1000 -c 100 http://localhost:3000
```


##  memo
ロードテストではリクエスト回数1000、同時接続100でチェックしている。

