
// Build Docker  
$ docker-compose build  
// create react app  
$ docker-compose run --rm react sh -c "yarn create react-app ."  
$ docker-compose run --rm react sh -c "yarn install ."  
// run container  
$ docker-compose up -d  

.env  
CHOKIDAR_USEPOLLING=true


yarn add @fortawesome/free-solid-svg-icons && yarn add @fortawesome/react-fontawesome