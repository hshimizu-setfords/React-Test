
// Build Docker  
$ docker-compose build  
// create react app  
$ docker-compose run --rm react sh -c "npx create-react-app ."  
// run container  
$ docker-compose up -d  

.env  
CHOKIDAR_USEPOLLING=true