const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const terser = require('terser');

let builds = require('./config').getAllBuilds();
build(builds);

function build(builds) {
    let built = 0;
    const total = builds.length;
    const next = () => {
        buildEntry(builds[built]).then(() => {
            built++;
            if (built < total) {
                next()
            }
        })
    };

    next()
}

function buildEntry(config) {
    const output = config.output;
    const {file, banner} = output;
    const isProd = /\.min\./.test(file);
    return rollup.rollup(config)
        .then(bundle => bundle.generate(output))
        .then(({output: [{code}]}) => {
            if (isProd) {
                const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
                    toplevel: true,
                    output: {
                        ascii_only: true
                    },
                    compress: {
                        pure_funcs: ['makeMap']
                    }
                }).code;
                return write(file, minified, true)
            } else {
                return write(file, code)
            }
        })
}

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve()
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report(' (gzipped: ' + getSize(zipped) + ')')
                })
            } else {
                report()
            }
        })
    })
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb'
}

function logError(e) {
    console.log(e)
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
