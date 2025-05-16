# Overview
La Tiendita is the career aptitude survey system which allows them to create, update, and delete their own surveys. The surveys can then be taken the users. 

## Role
### Admin 
<strong>Admin</strong> are generally the La Tiendita staff or partners who are responsible for coordinating the internship program and creating the survey for the program. 

- Create, update, and delete the basic information and set of questions for the survey.
- Manage user data and response data to the list of surveys each user has taken. 
- Update user's information if requested by the users themselves.
- Get the overview of the general as well as survey-specific user metrics (i.e, total number of users and surveys, response distribution for each question in the survey). 

### User
<strong>User</strong> are mostly the Latino students applying for the internship program and required to take the surveys before being assigned the position. 

- Create account using third-party accounts.
- Take the surveys 
- Get the results and analysis of each survey they have taken using text and data visualization.

# Functionality
The application is divided into 2 sections: user interface, and admin interface.

## User interface 
### Login page 
- The user can login through the third-party account using Open Authorization (OAuth). The current options are ```Google```, ```Discord```, and ```Microsoft```. 
- The user can also check the option ```Remember me``` so that they don't have to re-authenticate everytime they visit the app because the refresh token's expiry date will be extended. 

### Home page and About
- The user can get the overview of what the application is, what is the motivation behind that, and how it can help the users (students) who consider using their surveys. 
- The user can be navigated to the Login page or the Surveys page.
- The user can get the contact information of La Tiendita. 

### Surveys page 
- The user can get the list of available surveys offered by La Tiendita
- From there, the user can be navigated to the page in which they can start taking their surveys. 

### Take survey page 
- The user can take the survey
- There are 3 types of questions: scalar, multiple choices (MCQ), and free response (FRQ). The UI design of each type of question is different from others.
- The response of the questions the user has answered so far will be saved automatically. Therefore, the user can exit the survey and go back later to continue where they left of. 

### Results page 
- After submitting the survey, the user can visit the results page to review the answer they have given to each question, 
- The user can see the results, and analysis from their answers through data visualization.  

## Admin interface 
### Dashboard page 
- The admin can see the general metrics of the application: total number of users, total number of completed surveys, and pending surveys. 
- <strong>The user table</strong> can manage the user data, and navigate the page in which the admin can see the list of surveys that specific user has taken and their responses.
- The filtering feature of the user table has been implemented. The admin can filter the users based on their names, emails, and roles (```USER``` or ```ADMIN```). 
- <strong>The survey table</strong> can manage the survey data, as well as providing the admin with survey-specific metrics (i.e, number of users taking the survey, response distribution of each question).
- The response distribution are visualized using pie charts. 

### Create survey page 
- The admin can create new surveys, or edit the current surveys. 

# Third-party intergration
The only third-party intergration this application has used is [Auth0](https://auth0.com/intro-to-iam/what-is-oauth-2) for login. 

# Tech Stack 
- Front-end: React, TailwindCSS
- Backend and API: Next
- Database & Query: SQLite, Prisma
- Others: Postman, Axios, ChartJS

# Deployment notes
The project was started in the <strong>Spring 2025</strong> and is still in the development phase. Therefore, deployment has not been done. 

# Migration scripts 
Currently, no data migration is needed as the partners haven't provided the data. However, they will start providing data in the upcoming semester since we already have an MVP. 

# Getting started 

Before getting started, make sure you have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Node.js](https://nodejs.org/en/download) downloaded and installed in your machine. 

Clone the project: 
```
git clone https://github.com/UTDallasEPICS/la-tiendita.git
```
Go to the cloned directory, and run ```npm install``` to install all the dependencies. 

Create the ```.env``` file with the example below and enter necessary inputs: 
```
DATABASE_URL="file:./database.sqlite"
# DATABASE_URL="file:./dev.db"

# OAuth
OAUTH_REDIRECT_URL_BASE=http://localhost:3000/api/oauth/

# Discord
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
Client ID and Secret will set up Auth0 for the application.

To initialize the SQLite Database, run the following commands: 
```
npx run build
npx prisma generate
npx prisma db push
```

Now that you have got everything set up and initialized, let's run the the application: 
```
npm run dev
```
Congratulations! You've gove the server up and running. Enjoy using the app!