build-fac:
	cd fac; wasm-pack build --release
	cp fac/pkg/ src/fac -r
	rm pkg/package.json

build-icons:
	cargo run --bin icons

build: build-icons
	yarn build

lint: build
	yarn run lint
	yarn run web-ext lint -s dist

bundle: ext-lint
	yarn run web-ext build -s dist