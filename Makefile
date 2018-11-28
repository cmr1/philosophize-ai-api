setup: init rebuild
start: up
rebuild: clean install

init:
	([ ! -e .git/hooks/pre-push ] || rm .git/hooks/pre-push) && ln -s ../../bin/pre-push .git/hooks

clean:
	rm -rf node_modules

build:
	npm run build

install:
	npm install

up:
	npm start

lint:
	npm run lint

test:
	npm run test

fix:
	npm run fix
