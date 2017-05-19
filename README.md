# Hoth Rebel-Hanger [![Build Status](https://travis-ci.org/ACIT2910-HOTH/hoth.svg?branch=develop)](https://travis-ci.org/ACIT2910-HOTH/hoth)
**DISCLAIMER**: This website is for a BCIT ACIT-2910 Summer 2017 project course. 
A food ordering web application for the Star Wars Rebel base, on Planet Hoth. 

## Team Hoth
R.Chin, R.Guo, C.Lee, A.Mori, F.Zhang
For support, please contact us by email <fan.cbest@gmail.com>, <clee565@my.bcit.ca>, or comment on our github page [Hoth](https://github.com/ACIT2910-HOTH/hoth)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
### Prerequisites
[Node.Js](https://nodejs.org/en/)
[PostGres](https://www.postgresql.org/)

### Build

A step by step guide for building the environment:
	
1. Clone the repository: ```https://github.com/ACIT2910-HOTH/hoth.git```

2. Start SQL Shell(psql) use default settings press enter unitl you are prompt to enter your  password, enter your password.
3. Type ```CREATE DATABASE kitchen;```
4. In cmd prompt type ```psql -U -f (filename) -d (database name)``` *NOTE: OUR DB file can be found in our Hoth Trello board under Database.* 
5. Open command prompt and change directory to the repository folder.
6. Type ```npm init``` (creates the package.json file)
7. Type ```npm install body-parser express express-session formidable jquery jshint mocha pg socket.io webpack -- install ``` (adds the dependencies)
8. In the server.js file find the line ```var dbURL = process.env.DATABASE_URL || "postgres://postgres:REBELHANGER@localhost:5432/kitchen"``` *(Change REBELHANGER to your postgres password)*
9. In command prompt type ```node server.js``` *Note: the server will be using port 10000*
10. Type ```http://localhost:10000``` in a browser to get the server running locally.

## Running the tests

A step by step guide for running tests:

1. Clone to local repo
```git clone https://github.com/ACIT2910-HOTH/hoth.git```

2. cd into hoth directory
```cd hoth```


3. Install all other required packages
    ```npm install bcrypt body-parser bootstrap express express-session jquery pg socket.io webkit webpack --save```

4. Install mocha and zombie:
    ``` npm install mocha –save```
5. Install zombie:
    ```npm install zombie –save```

6. Run all functional tests:
    ```mocha test/functional/pagetest.js```

## Built With

* [HTML](https://en.wikipedia.org/wiki/HTML5) - The template markup language.
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - Style sheet language.
* [Node.Js](https://nodejs.org/en/) - JavaScript server-side.
* [PostGres](https://www.postgresql.org/) - Open source database.
* [Github](https://github.com/) - Version Control Repository.
* [Heroku](https://www.heroku.com/) - Cloud Application Platform.

## License

This project has no license

## Acknowledgments

* Jim Parry & Pope Kim
* BCIT CIT 2A
