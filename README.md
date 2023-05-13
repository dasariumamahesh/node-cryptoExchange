# node-cryptoExchange
Sample project for a Node js project supporting CRUD operations for a crypto exchange

# Steps on how to run the application locally
1) Run "npm i": This command will install all the dependecy packages
2) Update the port Number and the local MSSQL db credentails for the microservice to interact with DB
3) Run the DBScript which will create the necessary table
4) Import the crypto.postman_collection.json and hit any API

# Steps on running docker
1) run the below commands
docker build -t <imageID>
ex: docker build -t dasariumamahesh/node-crypto:0.0.1 .
2) docker image with the given tage will be created with latest code

docker run -e DB_HOST=<localhost ip> -d -p 3000:3000 <imageID>
ex: docker run -e DB_HOST=192.168.137.1 -d -p 3000:3000 dasariumamahesh/node-crypto:0.0.1
3) the docker image will start running on port 3000 and in detached mode, means in background.

docker push <imageID>
ex: docker push dasariumamahesh/node-crypto:0.0.1
4) now we push our docker image

to stop the docker image, run below command
docker container stop <imageID>
