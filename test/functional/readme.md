# Docs

This document is for the functional test for Hoth project.


## Index

* [Overview](#overview)
* [Support](#support)
* [Quick Start](#quick-start)
* [Resources](#resources)


## Overview

1. The project can be found here [Hoth](https://github.com/ACIT2910-HOTH/hoth)

2. The testcases can be found in the test/functional folder

3. The test requires [mocha](https://mochajs.org/) and [zombie](https://www.npmjs.com/package/zombie)


## Support

For support, please contact email <fan.cbest@gmail.com>. Or comment on our github page [Hoth](https://github.com/ACIT2910-HOTH/hoth)


## Quick Start

1. Clone to local repo

> Get Hoth:

    ```bash
    git clone https://github.com/ACIT2910-HOTH/hoth.git
    ```

2. cd into hoth directory

    ```bash
    cd hoth
    ```

3. Install all other required packages

    ```bash
    npm install bcrypt body-parser bootstrap express express-session jquery pg socket.io webkit webpack --save
    ```

4. Install mocha and zombie:

    > Install mocha:

    ```bash
    npm install mocha –save
    ```

    > Install zombie:

    ```bash
    npm install zombie –save
    ```
5. Run all functional tests:

    > Run test:

    ```bash
    mocha test/functional/pagetest.js
    ```

## Resources <sup>v1</sup>

Place holder