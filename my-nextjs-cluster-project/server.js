const cluster = require('cluster');
const os = require('os');
const http = require('http');
const next = require('next');
const dotenv = require('dotenv');
const { createProxyServer } = require('http-proxy');

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const database = require('./database');
const numCPUs = os.cpus().length;
const PORT = parseInt(process.env.PORT || 8000);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });


  const proxy = createProxyServer({});

  const balancer = http.createServer((req, res) => {
    const worker = Object.values(cluster.workers)[0];
    proxy.web(req, res, { target: `http://localhost:${PORT + worker.id}` });
  });

  balancer.listen(PORT, () => {
    console.log(`Load balancer running on http://localhost:${PORT}/api`);
  });


} else {
    app.prepare().then(() => {
    console.log(`Worker ${process.pid} started`);

    http.createServer((req, res) => {
      handle(req, res);
    }).listen(PORT + cluster.worker.id, (err) => {
      if (err) throw err;
      console.log(`Server running on http://localhost:${PORT + cluster.worker.id}`);
    });
  });
}
