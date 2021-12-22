help: ## display this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-40s\033[0m %s\n", $$1, $$2}'

docker-logs: ## stream logs of api service (require docker)
	docker-compose logs -f --tail=80 node 

docker-install: ## install the project to be used with Docker, run it after cloning repo or switching branch (require docker)
	docker-compose run install

docker-run: ## start the project and all its dependencies (require docker)
	docker-compose up -d

docker-stop: ## stop services (require docker)
	docker-compose stop

docker-shell: ## run an interactive shell in the api container (require docker)
	docker-compose exec node /bin/bash

docker-postgres: ## open a psql client in database container
	docker-compose exec postgres bash -c "psql -U postgres"