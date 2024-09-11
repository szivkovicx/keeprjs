![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

![image](./docs/logo.png)

# keepr.js

KeeprJS is a NodeJS service/application plugin which allows developers to configure which files and folders to keep in build directory after compiling/building/bundling. This is useful when dealing with directories and files we generally need inside the build folder. While some features of configurations of some services, applications and frameworks do offer the way of keeping specific file/s inside the build, rarely do they offer the feature of keeping an whole folder within the build and this is where KeeprJS comes into the picture.

## Usage

KeeprJS can be simply installed using:

```
npm install keeprjs
```

And then, set up an simple `keepr.json` configuration file:

```json
{
    "target": "./build-folder",
    "paths": [
        "./folders-to-move"
    ]
}
```

And then, you can manually run `keeprjs` or create an postbuild script that includes running command `keeprjs`.
