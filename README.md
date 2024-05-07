# GraphQL + Express + React Job Board App 

During this project, I've developed pretty simple, but reliable and lightweight web-app, which contains of back-end and frond-end parts.
You can get info about actual jobs, add a new job (if authorized), update or even delete a job that not actual anymore.

## Deploy links

- **Client**: https://job-board-client-00f0c6171915.herokuapp.com/ 
- **API with GraphQL Apollo Server**: https://job-board-server-48c92357ba53.herokuapp.com/

Enjoy!

## Tech stack  

For develop all back- and front-end features, I've used several technologies:

- `JavaScript` as well as the main programming language for Web-development (both front- and back-end parts);
- `Express.js` as based framework for creating web-server that contains API;
- `Apollo Server` and `Apollo Client`, first for back-end, second - for client implementation;
- `GraphQL` as query language that makes development much more simple;
- `React`, probably the best JS-library for front-end projects :) ;
- `ESLint`, `Prettier`, `Husky` for best code-style;
- `dotenv`, `cors` and other back-end tiny libs.

## Description 

Main goal of my application is to provide an actual vacancy info for job-seekers.

Job Board is opened for every visitor.

If you are logged in, you can even add new vacancies or change other info here.

Jobs is grouped by 5 on page. If it's necessary, you can change pagination logic using ./client/src/components/PaginationBar.js

Every job entity consists of title, description, post data and company name.

Additionally, you can group vacancies by company.

## Instructions

Mainly, you can use a deployed application. Generally, there is no need to run app locally.
