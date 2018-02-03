# Imgur Sauce
[![Build Status](https://travis-ci.org/rarcega/imgur-sauce.svg?branch=master)](https://travis-ci.org/rarcega/imgur-sauce)
[![Coverage Status](https://coveralls.io/repos/github/rarcega/imgur-sauce/badge.svg)](https://coveralls.io/github/rarcega/imgur-sauce)

Finds the original image sources from an [Imgur](https://imgur.com/) album using [SauceNao](https://saucenao.com/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/en/) >= 6.11.0
* [SauceNao API Key](https://saucenao.com/user.php?page=account-upgrades) (requires registration)

### Clone the project

```bash
git clone https://github.com/rarcega/imgur-sauce.git
```


### Installing

Install the project dependencies:

```bash
npm install
```

Add your SauceNao API key to the configuration:

```bash
vi app/config/local.config.js
```

```js
module.exports = {
  sauceNaoApiKey: 'your api key here'
}
```

## Usage

Run the app by passing the imgur album url as the first argument:

```bash
npm start "https://imgur.com/a/YOUR_ALBUM_HASH"
```

```bash
http://www.pixiv.net/member_illust.php?mode=medium&illust_id=123456789
http://test.deviantart.com/art/Test-123456789
https://twitter.com/test/status/123456789
https://www.patreon.com/posts/test-123456789
```

## Running the tests

```bash
npm test
```

```bash
Test Suites: 7 passed, 7 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        2.115s
Ran all test suites.
```


## Built With

* [axios](https://github.com/axios/axios) - Promise-based HTTP client
* [cheerio](https://github.com/cheeriojs/cheerio) - Markup parser and traversal
* [lodash](https://github.com/lodash/lodash) - Utility library
* [jest](https://github.com/facebook/jest) - Testing framework
* [eslint](https://github.com/eslint/eslint) - JavaScript linter
* [travis-ci](https://travis-ci.org/) - Distributed continuous integration
* [coveralls](https://coveralls.io/) - Test coverage history & statistics


## License
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.