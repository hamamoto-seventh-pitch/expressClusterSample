const expless = require('express');
const cluster = require('cluster');
const os = require('os');

const app = expless();

const numCpu = os.cpus().length;

const userCount = process.env.USER_COUNT;

app.get('/', (req, res) => {
    res.send('Hello World!' + userCount);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port', port);
});


app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // task
    }
    res.send(`ok... ${process.pid}`);
    // cluster.worker.kill();
});

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