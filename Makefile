build-fac:
	cd fac; wasm-pack build --release -d ../pkg-fac
	rm pkg-fac/package.json

build-env:
	cd env; wasm-pack build --release -d ../pkg-env
	rm pkg-env/package.json

build-icons:
	cargo run --bin icons

build-wasm: build-fac build-env

build: build-icons build-wasm
	yarn build

lint: build
	yarn run lint
	yarn run web-ext lint -s dist

bundle: ext-lint
	yarn run web-ext build -s dist