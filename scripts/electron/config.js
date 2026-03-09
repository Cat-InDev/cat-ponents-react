import { exec } from 'child_process';
import { readFile, writeFile } from 'fs/promises';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

const main = async () => {
    
    const content = await readFile(new URL('../../package.json', import.meta.url), 'utf-8');
    const packageJSON = JSON.parse(content);

    const npmID = await execPromise("npm i -D electron electron-builder electron-is-dev wait-on cross-env concurrently copy rimraf");

    console.log(npmID.stdout);

    const npmI = await execPromise("npm i --save auto-launch");

    console.log(npmI.stdout);

    packageJSON["scripts"]["electron:serve"] = "concurrently -k \"cross-env BROWSER=none npm start\" \"npm run electron:start\""
    packageJSON["scripts"]["electron:build"] = "rimraf build && npm run build && copy .\\scripts\\electron\\files\\main.js dist\\ && copy .\\scripts\\electron\\files\\preload.js dist\\ && electron-builder -c.extraMetadata.main=dist/main.js";
    packageJSON["scripts"]["electron:start"] = "wait-on tcp:5173 && npm run electron";
    packageJSON["scripts"]["electron"] = "electron .";
    packageJSON["main"] = "dist/main.js";
    !packageJSON["start"] && (packageJSON["start"] = "npm run dev");
    packageJSON["homepage"] = ".";
    packageJSON["build"] = {
        "extends": null,    
        "appId": "com.example.electron-cra",
        "extraMetadata": {
            "main": "dist/main.js"
        },
        "files": [
            "dist/**/*",
            "node_modules/**/*",
            "package.json"
        ],
        "directories": {
            "buildResources": "dist/assets",
            "output": "build"
        },
        "win": {
            "icon": "public/logo512.ico",
            "target": [
            "nsis",
            "portable"
            ]
        }
    }
    packageJSON["browserslist"] = {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ]
    }

    console.log(packageJSON);

    await writeFile('package.json', JSON.stringify(packageJSON, null, 2), (err) => {
        if (err) throw err;
        console.log('Archivo sobrescrito con éxito.');
    });

    console.log("---> [INFO] Set prop 'base': './' in vite.config.ts");
    console.log("---> [INFO] Add 'build' directory in .gitignore");

    console.log("---> [WARN] Electron cant be use BrowserRouter, use HashRouter instead");
    console.log(`
    --------> Example -- App.tsx

    |    function App() {
    |        const routes = 
    |        <>  
    |            <Routes>    
    |            {
    |                [
    |                <Route path="/" element={<Index />} />,
    |                <Route path="*" element={<Navigate to="/" replace={true} />}  />
    |                ] 
    |            }
    |            </Routes>
    |        </>
    |
    |        return (
    |            <>{
    |            COMPILATION_TO === 'ELECTRON' ? 
    |                <HashRouter>
    |                {routes}
    |                </HashRouter>
    |                :
    |                <BrowserRouter>
    |                {routes}
    |                </BrowserRouter>
    |            
    |            }</>
    |        );
    |    } 
    `)
}

main();
