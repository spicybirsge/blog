# Blog
This is my personal blog site coded with express nextjs and mongodb(for database). You can use this too I will document to you how to run it.

# Features
1. Supports markdown with a really good text editor and a lot of features
2. Admin login with auth key system allows only you to login and write blogs and manage them
3. Decent UI
4. And many more!

# Installation
1. Clone this repository
2. Open two terminals and navigate to the backend folder and client folder
3. After that in the client folder go to src/variables and open the vars.js file and edit the "BACKEND_URL" to your own  backend url (if it is local host it should be http://localhost:7060) make sure you will not add a '/' at the end
4. After that in the backend at to env variables one called `AUTHORIZATION_KEY` which will be any strong secure string of text you like and `MONGODB_URI` which will be your MONGODB database URI
5. then in backend and client folder run `node index.js` and `npm run dev` respectively.

# Additional notes
1. You might need to change some meta data and text content in the root folder because they have my name in it.
2. For production use I recommend you to use https://vercel.com for hosting and they have a free tier
