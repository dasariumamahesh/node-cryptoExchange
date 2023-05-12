# node-cryptoExchange
Sample project for a Node js project supporting CRUD operations for a crypto exchange

# Steps on how to run the application locally
1) Run "npm i": This command will install all the dependecy packages
2) Update the port Number and the local MSSQL db credentails for the microservice to interact with DB
3) Run the DBScript which will create the necessary table
4) Import the crypto.postman_collection.json and hit any API

# steps on running docker
1) run the below commands
docker build -t dasariumamahesh/node-crypto:0.0.1 .
docker containter run -d -p 3000:3000 dasariumamahesh/node-crypto:0.0.1 
2) the docker image will start running on port 3000. For the current project, since we are using mssql as DB and that instance isn't configured in the above docker image. Hence, only the test api will return response: --> localhost:3000/test

to stop the docker image, run below command
docker container stop <imageID>
