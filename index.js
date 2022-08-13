const {resolve, basename} = require('path');
const {parseHttpfile} = require('./httpfile.js');

function httpFileLoader(httpfileText) {
    const options = this.getOptions();
    const originalPath = this.resourcePath;
    const loggingVerbose = options.verbose || false;
    const targets = parseHttpfile(httpfileText);
    // generate javascript stub code
    let contents = targets.map(target => {
        return target.toCode();
    }).join("\n\n");
    if (loggingVerbose) {
        // generate typescript declaration file
        let declareFileName = basename(originalPath);
        let declaredApiList = targets.map(target => {
            return target.toApiDeclare();
        }).join("\n    ");
        let moduleDeclareCode = `declare module '*${declareFileName}' {\n    ${declaredApiList}\n}`;
        // logging
        let declaredFileName = declareFileName.replace(".http", "-http.d.ts");
        console.log("=====================" + declaredFileName + "==========================================");
        console.log(moduleDeclareCode);
        console.log("=====================" + declareFileName + ".js========================================");
        console.log(contents);
        console.log("=======================================================================================");

    }
    return contents;
}

module.exports = httpFileLoader;
