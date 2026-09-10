# Http Module:
- Hyper Text Transfer Protocol
- Html - Hyper Text Markup Language
- CSS - Cascade Style Sheet
- NPM - Node Package Manager
## Http Methods:
- req = url , method , socket , headers.
- Get - by default any browser.
- Post
- Put
- Patch
- Delete
### HTTP Status Codes: 
- 200 okay
- 201 created
- 400 Bad Request
- 401 UnAuthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
## Some imp terms: 
- npm -> node install krne ke liye.
- ctrl + C -> Terminate
- npm start -> server start
- npm run dev -> make changes in live server without terminating
- text/plain
- text/html
- text/json
- text/css
- text/js
## Server can send data
1. html content
2. html files
3. json data
4. plain text
5. css
6. jss
7. file

## Server can set Header to send data
1. res.writeHeader()
2. res.setHeader

## Server can set status code: 

1. res.statusCode()
2. res.writeHeader()

## request methods

1. get
2. post
3. put/patch
4. delete
5. Routes

# NPM Project

1. create project folder
2. right click on project folder and select open in integrated terminal
![alt text](./image.png)
3. type `npm init -y` press enter
4. open package.json file from project folder
5. update type as `type:module` in package.json
![alt text](./image.png)
6. type in terminal `npm i nodemon -D to install nodemon, which restarts server while file changes. -D flag indicate intstall in dev dependency.
7. it creates node_modules folder and package-lock.json.
8. update .gitignore file and write project folder/node_modules.
9. update package.json to run the project, update script property as below 
![alt text](./image-2.png)
```
"scripts" : {
    "start" : "node app.js",
    "dev" : "nodemon app.js:
},
```
