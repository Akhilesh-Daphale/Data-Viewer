# Data-Viewer

---
**Basic application with authentication, upload data and view uploaded data as features.**

### Tools and Technologies

- Frontend (ReactJS)
- Backend (Spring Boot)
- Database (PostgreSQL)

### Backend Setup

- Open the folder **data-viewer-api** in Intellij and use maven project
- Go to **src/main/resources/application.properties** file and provide the required credentials for username and password. PostgreSQL is used for the database if you want to use another database change the url accordingly and update the **pom.xml** file too with respective dependency.
- Create the database in PostgreSQL named **sampledb** using pgAdmin.
- Go to **src/main/java/DataViewerApplication.java** file and run the application.
- Once the application is started go to http://localhost:8080/live to check if backend is live.

### Frontend Setup

- Open the folder **data-viewer-ui** in command prompt and run command `npm install`.
- After installing all packages run command `npm start`.
- The browser window will be opened at url http://localhost:3000/login

### Application login credentials

- Username - user@gmail.com
- Password - pass@123

