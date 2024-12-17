const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running with PID: ${process.pid}`);
  console.log(`Spawning ${numCPUs} worker processes...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`);
    console.log('Spawning a new worker...');
    cluster.fork();
  });
} else {
  require('./main.js');
  console.log(`Worker ${process.pid} is running`);
}