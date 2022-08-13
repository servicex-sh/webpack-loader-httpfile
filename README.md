Webpack httpfile loader
==========================

Webpack loader that loads http file as ESM module.

# How to get started?

* Add dev dependency: `npm install -D webpack-loader-httpfile`
* Modify webpack configuration(webpack.config.js) file to add httpfile loader and `experiments.topLevelAwait` as following:

```javascript
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.http$/,
                use: [
                    {
                        loader: path.resolve(__dirname, 'node_modules/webpack-loader-httpfile/index.js'),
                        options: {
                            verbose: true
                        },
                    },
                ],
            },
        ]
    },
    experiments: {
        topLevelAwait: true
    }
};
```

* Create http file: `demo.http`

```
### get my ip
//@name myIp
GET https://httpbin.org/ip

### post test
//@name postTest
POST https://{{host}}/post
User-Agent: curl/7.47.0
Content-Type: application/json

{
  "name": "{{nick}}",
  "age": 42,
  "uuid": "{{$uuid}}",
  "demo": "hi` morning"
}
```

* import http file and call HTTP requests in your code:

```javascript
import {myIp, postTest} from './demo.http';

// simple http request
let response = await myIp();
console.log(await response.json());

// simple http post
response = await postTest({nick: "test", host: "httpbin.org", "uuid": "c8389930-1071-4b88-9676-30b9ba7f2343"});
console.log(await response.json());
```

# References

* Webpack: https://webpack.js.org/
* esbuild-plugin-httpfile: https://github.com/servicex-sh/esbuild-plugin-httpfile
