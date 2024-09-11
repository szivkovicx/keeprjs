#!/usr/bin/env node

/* ***** Imports ***** */
const { accessSync, cpSync, existsSync, mkdirSync, readFileSync } = require('fs');
const { basename, join } = require('path');

/* ***** Constants ***** */
const DEFAULT_PATH = "./keepr.json";
const REQUIRED_PROPERTIES = [
    ['target', 'string'],
    ['paths', 'array']
]

/* ***** Functions ***** */
function getConfiguration() {
    const args = process.argv;
    let path = DEFAULT_PATH;

    // Way of definining configuration path via command line
    if (args.length > 2) {
        path = process.argv[2];
    }

    try {
        accessSync(path);
        const data = readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(" [ ERROR ] There was an error with loading Keepr configuration.");
        console.error(" [ INFO ] Make sure you created keepr.json or at least provide an path towards an configuration as an argument.");
        process.exit(0);
    }
}

function validateConfiguration(config) {
    const keys = Object.keys(config);
    for (let i = 0; i < REQUIRED_PROPERTIES.length; i++) {
        const key = REQUIRED_PROPERTIES[i][0];
        const type = REQUIRED_PROPERTIES[i][1];
        if (!keys.includes(key)) {
            console.error(` [ ERROR ] Configuration requires ${key} of type ${type}.`);
            process.exit(0);
        }
        const value = config[key];
        if (type === 'array') {
            if (!Array.isArray(value)) {
                console.error(` [ ERROR ] Key ${key} in configuration is not of type array.`);
                process.exit(0);
            }
            // Child value is by default string for array types
            for (let y = 0; y < value.length; y++) {
                const childValue = value[y];
                if (typeof childValue !== 'string') {
                    console.error(` [ ERROR ] Child value in ${key} array of index ${y+1} in configuration is not of type string.`);
                    process.exit(0);    
                }
            }
        }
        if (type === 'string') {
            if (typeof value !== 'string') {
                console.error(` [ ERROR ] Key ${key} in configuration is not of type string.`);
                process.exit(0);
            }
        }
    }
}

function copy(target, paths) {
    try {
        if (!existsSync(target)) {
            mkdirSync(target, { recursive: true });
        }
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const name = basename(path);
            cpSync(path, join(target, name), { recursive: true });
            console.log(
                ` [ LOG ] ${path} -> ${join(target, name)}`
            )
        }
    } catch (err) {

    }
}

/* ***** Execution ***** */

console.log("\n")
/* Get Keepr configuration */
const config = getConfiguration();
/* Validate given configuration */
validateConfiguration(config);
/* Get Keepr configuration */
copy(
    config['target'], config['paths']
)
