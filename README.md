## NestJS Task manager app formation

[![CodeQL](https://github.com/rbelon-decat/nestjs-formation/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rbelon-decat/nestjs-formation/actions/workflows/codeql-analysis.yml)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# without Docker
$ npm run start

# with Docker (require make)
$ make docker-run # It will automatically install dependencies

```

## Test

```bash
# unit tests
$ npm run test

```

## Before merging your PR

Make sure you have runned the Prettier and your tests pass

```bash
# Format your code
$ npm run format

# Docker aliad
$ make docker-format
```

> For your tests, go to [#test](#test) section.

## Docker commands

You can find all the commands used here using the command 

```bash
$ make help
```

## License

Nest is [MIT licensed](LICENSE).
