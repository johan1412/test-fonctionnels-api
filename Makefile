tests : 
	docker-compose exec server npx jest

start :
	docker-compose up 

stop :
	docker-compose down

cucumber :
	docker-compose exec server npx cucumber