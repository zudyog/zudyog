import cluster from 'cluster';
import os from 'os';
import { Application } from 'express';

const numCPUs = os.cpus().length;

export const setupClustering = (app: Application) => {
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);

        // Fork workers based on CPU cores
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
            // Replace the dead worker
            cluster.fork();
        });
    } else {
        // Workers share the TCP connection
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Worker ${process.pid} started on port ${port}`);
        });
    }
};
