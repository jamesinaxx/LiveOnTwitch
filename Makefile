build-fac:
	cd fac; wasm-pack build --release

build-icons:
	cargo run --bin icons

build: build-fac build-icons
	yarn build

lint: build
	yarn run lint
	yarn run web-ext lint -s dist

bundle: ext-lint
	yarn run web-ext build -s dist