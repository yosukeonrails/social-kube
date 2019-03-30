# Social-Kube

The Social Kube is a very simple application that lets user create their own social environment special to their interest. This is done by creating "kubes" which are small versions of what today is considered a social network. Instead of hungreds or thousands of people to connect with, Social Kube narrows your social environment down to a few. The results of that are dialogues that are more intimant and focused. 

## Kubes

Kubes takes in everything that we know that is great about social media and funnels it to a limited few. This means that your posts and views about politics are not going to affect your work relationships or vice-versa. 

## Technology

Social Kube depends very heavily on very performant and fast IO operations. This means that one client needs to talk to other clients very frequent and very quickly across the server. For that matter, we use the Socket.IO in order to implement publsih and subscribe operations. 

## Risks 

The biggest hurdle with creating this type of application is to be able to create stability through out the application. Meaning that at any point in the data transaction between services and clients, data needs to be protected and backed up in the case of any outage or latency problems in the server. This means that error handling becomes a very crucial component in this application

## Main Dependancies

- Node.JS 11.6.0

- Express 4.16.4

- Socket.IO 2.0 

- React JS 16.8.0

- Redux 4.0.0

- Webpack 4.29.0

- MongoDB 4.0.5

- Passport 0.4.0

## Start guide

After cloning the project, open the terminal in the directory and install all the dependancies with:

`
npm install
`

Once it has finished downloading, run the server with:

`
npm start
`