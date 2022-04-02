Setup Instructions:

Database:
There are two possible approaches for setting up the database for this application:
1. MongoDB Atlas- Cloud hosted database 
2. MongoDB local with compass- Local DB
If needed, here is a tutorial for setting up a local mongodb instance 
https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database#setting-up-mongodb-on-windows


Once one of these is set up, change the MONGO_CONNECTION_URL attribute in the .env file to your database connection string (it's probably the same as it is currently if 
you're using a local Db)


VS Code:
Once the repository is cloned into your visual studio code window, run a terminal and enter the following commands:
- npm install
- node app.js

After this is ran, you should be able to access the application at localhost:3000

If you are already using port 3000 for something else, then go to app.js > app.listen and change the values to a port you have free
