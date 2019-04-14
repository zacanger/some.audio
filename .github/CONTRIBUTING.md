# Contributing

Contributions are welcome!

* To install and run locally, `npm ci` and `npm start`. You'll need to have
  Node, npm, Docker and Docker Compose installed.
* You can also run locally without Docker: `npm start:serve`. To run without
  Docker you'll need to provide a `MONGO_URI` or have Mongo running locally.
* Deploys happen when tags are pushed.
* There's no view engine, because I don't like any of them. Views are just template strings.
* Try to keep at least core functionality working without JS. There's no reason an app simple as this should need client-side JS to do things.
* Please make sure you fill out the issue or PR template accurately.
* If submitting a PR, please make sure you've run the tests with `npm t`.
* Please use the current latest `npm` and install with `npm ci` (unless you're intending to modify dependencies).
* Follow the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct).
