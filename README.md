## Node-CryptoExchange

This is a sample Node.js project that supports CRUD operations for a cryptocurrency exchange.

### Steps to run the application locally:

1. Run the command `npm i` to install all the dependency packages.
2. Update the port number and the local MSSQL database credentials for the microservice to interact with the database.
3. Run the DBScript which will create the necessary table.
4. Import the `crypto.postman_collection.json` and hit any API.

### Steps to run using Docker:

1. Build the Docker image using the following command: `docker build -t <imageID> .`. Example: `docker build -t dasariumamahesh/node-crypto:0.0.1 .`
2. The Docker image with the given tag will be created with the latest code.
3. Run the Docker container using the following command: `docker run -e DB_HOST=<localhost ip> -d -p 3000:3000 <imageID>`. Example: `docker run -e DB_HOST=192.168.137.1 -d -p 3000:3000 dasariumamahesh/node-crypto:0.0.1`
4. The Docker image will start running on port 3000 in detached mode, meaning in the background.
5. Push the Docker image to a Docker registry using the following command: `docker push <imageID>`. Example: `docker push dasariumamahesh/node-crypto:0.0.1`
6. To stop the Docker image, run the following command: `docker container stop <imageID>`.

### Steps to run using Kubernetes:

1. Deployment (`kube.yml`) and service (`kubeService.yml`) files are attached.
2. First, run the deployment file using the following command: `kubectl apply -f kube.yml`.
3. This will create a deployment pod. You can verify this by running the following commands: `kubectl get deployment` and `kubectl get pods`.
4. Now we need to create a service to access the deployment file. Run the following command to create the node service: `kubectl apply -f kubeService.yml`.
5. The Node server is running, and we can access it at `localhost:5000/<path>`.