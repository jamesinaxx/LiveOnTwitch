build-fac:
	cd fac; wasm-pack build --release -d ../pkg-fac

build-env:
	cd env; wasm-pack build --release -d ../pkg-env

build-icons:
	cargo run --bin icons

build-wasm: build-fac build-env

build: build-icons build-wasm
	yarn build

lint: build
	yarn run lint
	yarn run web-ext lint -s dist

bundle:
	yarn run web-ext build -s dist