# Seths Network

Proof-of-concept of [Scalability Issues in the Blockchain] () final grade project by SergioRoldan

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

Tested in Windows 10 with Ganache

## Requirements

[Node] () 9.7.1 or inferior

Nmp 5.6.0 or inferior (new versions of node crash installing the modules, working to fix this)

[Truffle] () 4.0.0 (not tested with other versions)

[Angular] () CLI 1.2 or superior (otherwise change angular.json for angular-cli.json)

[Ganache] () prefered, Geth, Testrpc or similar (use port 7545, Ganache default port, or modify truffle-config.js file to point to another port)

[Electron Packager] () 12.0.1 (not tested with other versions) necessary to pack electron app

## Installation

Clone project using: "#git clone https://github.com/SergioRoldan/Angular6-Truffle-Electron-Dapp-Box.git"

Install modules in the root of the project using: #npm install

Include/modify the next line in the following file, otherwise angular won't compile correctly:

'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js':
    
    - node: {},

    + node: {crypto:true, stream:true},

This solves Angular 6 strip of crypto and stream libraries, which are truffle-contracts library dependencies

If typings.d.ts is not in the project include it with the following code under the src folder:

    + declare var require: NodeRequire;

This allows node to generate ts typings for js libraries that doesn't provide them

## Configuration

Run under: "#npm run "name""

| Name  | Usage | Script|
| --- | --- | --- |
| ng  | - | "ng" |
| start  | Serve app in localhost:4200 | "ng serve" |
| build  | Build app | "ng build" |
| test  | Run tests | "ng test" |
| lint  | - | "ng lint" |
| e2e  | - | "ng e2e" |
| truffle  | Truffle dev console | "truffle" |
| compile-eth  | Compile smart contracts using Truffle generating build in the process | "truffle compile" |
| migrate-eth  | Compile and deploy smart contract using Truffle to the network specified in truffle-config.js | "truffle migrate" |
| electron  | Start electron | "electron ." |
| electron-build  | Build angular app and serve it with electorn | "ng build --prod && electron ." |
| package-mac  | Package App targeting Mac OS | "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=dist/angular-truffle-dapp/favicon.ico --prune=true --out=release-builds" |
| package-win  | Package App targeting Windows | "electron-packager . seths-network --overwrite --asar=true --platform=win32 --arch=ia32 --icon=dist/angular-truffle-dapp/favicon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Seths Network\"" |
| create-win-installer | Generate Windows installer | "node installers/windows/createinstaller.js" |
| create-installer-mac | Generate Mac OS installer | "electron-installer-dmg ./release-builds/Seths\\ Network-darwin-x64/Seths\\ Network.app seths-network-app --out=release-builds --overwrite" |
| create-debian-installer | Generate Debian installer | "electron-installer-debian --src release-builds/seths-network-linux-x64/ --arch amd64 --config debian.json" | 

!! create-debian-installer and create-installer-mac doesn't work on Windows distros because electron-installer-debian and electron-installer-dmg can't be installed in not unix OS !!

All the following json files are configuration files and are considered self explanatory:

Revise package.json to check node dependencies and other details

Revise angular.json to check angular cli properties

Revise truffle-config.js to check truffle configuration

Revise debian.json if you want to create an installer for the packaged app for Debian systems

Note: main.js is the entry point for Electron, revise and modify it commenting or uncommenting line according to your requirements

Feel free of revise and modify any configuration file under src folder, most of them remain as default

## Run

In root dir of the project, in order to create build and dist folders and run the app:

- Run Ganache (prefered) or similar (TestRPC, Geth, Parity... allowing RPC calls on port 7545 by default)

- I. To compile and deploy contracts use: "#npm run migrate-eth" or "#truffle migrate" (each time Ganache is relaunched)

- II. Alternatively run: "#npm run compile-eth" or "#truffle compile" and then the previous command (to force contracts compilation and build)


- I. To start the client: "#npm run electron-build"

- II. Alternatively to start the client use "#ng serve", point index.html to localhost:4200 (currently pointing to "./") and then "#npm run electron"

- III. Alternatively run "#npm run electron" once the project is built

- IV.1 Alternatively package the app for your distro using "#npm run package-win", "#npm run package-mac" or "#npm run package-linux"
- IV.1 (Optional) Create the installer for your distro using "#npm run create-installer-mac", "#npm run create-debian-installer" or "#npm run create-win-installer" once the app is packages according to your distro
- IV.2 Use the .exe, .dmg or .pak packaged app in release-builds folder according to your distribution 
(release-builds is created once app is packaged. You can pack the app for any distro using any distro, but the installer creation only will work for your distribution and probably won't for the others, e.g. You must create the Windows installer in a Windows OS, trying to create a macOS installer or Linux installer in a Windows OS fails)

IMPORTANT ! App must be repackaged each time Ganache is restarted because build folder changes. Installer must be also recreated once the app is repackaged. Otherwise, app won't work because is packaged and installed using non currently existent smart contracts. This should be solved when the smart contracts are deployed in Ropsten testnet or Ethereum mainnet.

## Definitions

Services: Angular services are substitutable objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app.

Angular services are:

    Lazily instantiated – Angular only instantiates a service when an application component depends on it.
    Singletons – Each component dependent on a service gets a reference to the single instance generated by the service factory.

Angular offers several useful services, but for most applications you'll also want to create your own.

Components: Component decorator allows you to mark a class as an Angular component and provide additional metadata that determines how the component should be processed, instantiated and used at runtime.

Components are the most basic building block of an UI in an Angular application. An Angular application is a tree of Angular components. Angular components are a subset of directives. Unlike directives, components always have a template and only one component can be instantiated per an element in a template.

Modules: Angular defines the NgModule, which differs from and complements the JavaScript (ES2015) module. An NgModule declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities. An NgModule can associate its components with related code, such as services, to form functional units.

Every Angular app has a root module, conventionally named AppModule, which provides the bootstrap mechanism that launches the application. An app typically contains many functional modules.

## Project folder distribution

All important files are selfexplanatory or are commented otherwise.

/build: Folder where Truffle creates artifacts for smart contracs once they are compiled and deployed (Doesn't exist before migration)
    - /contracts/nameOfTheContract.json: Each of the artifacts of a smart contract including abi, bytecode and abstraction of its

/contracts: Contains smart contracts for the Seths Network
    - /libraries/CryptoHandler.sol: Library to handle some cryptographical functions required by the other smart contracts
    - Migrations.sol: Migrations smart contract used by Truffle to keep the version of the rest of the contracts
    - Factory.sol: Includes Factory, ChannelFinal, Modifiers, Multiownable and Expirable smart contracts
        - Expirable: Defines channel live cycle and time restrictions
        - Multiownable: Defines channel two owners and restrict the access to the channel
        - Modifiers: Defines requirements and events related with the close, accept and dispute of a channel
        - ChannelFinal: Defines the operation of a state channel and inherits from the previous 3 smart contracts
        - Factory: Defines the main and public contract of the Seths Network capable of creating channels

/discarted_contracts: Contains smart contracts discarted during the development of the network
    - Channel.sol: Non-forwarding channel, first step of the ChannelFinal contract
    - ChannelExtension.sol: Extension to the previous channel to make it able to forward transactions, previous to ChannelFinal
    - Test.sol: Used to test the two previous contracts for security, efficieny and correct operation

/dist: Contains angular-electron app build using production flag (Doens't exist before build)
    - angular-truffle-dapp/: includes an html index, a styles page and some js files compiled for the ts

/e2e: Folder created by angular to contain e2e definitions, end2end automatic testing

/installers: Contains the files required to create windows installer
    - windows/createinstaller.js: js file used to create a windows installer once the app is packaged for windows
    - setupEvents.js: Define squirrel events for windows in case of install, uninstall, obsolete or update

/migrations: Contains the files required to deploy smart contracts using truffle migrate
    - 1_initial_migration.js: Deploys the Migration smart contract to the blockchain
    - 2_deploy_contracts.js: Deploys the CryptoHandler library, links it with the Factory and deploys the Factory

/node_modules: Contains node modules (Doesn't exist before npm install)
    - Should be modified as told at the begining of this file to solve inconsistencies between Angular 6 and Truffle

/release-build: Contains executables of the app packages for Windows, Linux and MacOS & an installer for Windows (Doesn't exist before package targeting any distro)
    - Seths Network-darwin-x64: Packaged app for MacOS x64
    - seths-network-linux-x64: Packaged app for Debian x64
    - seths-network-win32-ia32: Packaged app for Windows x32
    - windows-installer: Installer for the packaged app for Windows
    - mac-installer: Installer for the packaged app for MacOS
    - debian-installer: Installer for the packaged app for Debian

/src: Contains the source and configuration files of the application
    - typings.d.ts: Required to create the typings of the js libraries that doesn't include them by default
    - index.html: Entry point of the application, needs to be modified if the app is served using ng-serve instead of built
    - The rest of .json, .ts and other files under this folder remain untouched
    - /util: Contains ts classes necessary for other components of the app
        - account.ts: Ts class of an account including address, balance and last block scrutinized (channels remains unused in this version of the app)
        - channel.ts: Ts class of a channel including functions to generate hashes and check that R hashes in H
        - error.ts: Ts class to notificate errors and warnings
        - filter.pipi.ts: Ts pipe to filter an array by address used in search bars (for accounts and channels)
        - notification.ts: Ts class to notificate new events and successful blockchain calls
        - updateParams.ts: Ts class of the parameters necessary to update or dispute a channel, including the signature generation
        - validation.ts: Ts class defining validation functions for app forms
    - /environment & /assets: Not modified
    - /app: Contains all the classes the app needs to operate. Each component has a html, css and ts file according to Angular data structure. Each ts file has his .spec.ts file for test purposes using Jasmine through Karma when ng test is executed, because tests are not defined this files are superfluous
        - web3.service.ts: Ts service to provide the whole app of a common and unique way to retrieve and send information asynchronouly to the Blockchain using web3. This service also interacts with NeDB service.
        - notifications.service.ts: Ts service to provide the whole app of a common and unique way to send and read notifications emitted by other services or component during the execution of the application.
        - nedb.service.ts: Ts service to provide the whole app of a common and unique way to store and retrieve data from the NeDB indexedDB.
        - app.module.ts: Root module of the app includings declarations of components and pipes, imports of modules used by the app, providers if any and bootstraps in this case the app component.
        - app.component.ts: Root component of the application. In charge of initialize the events provided by web3 service.
        - app-routing.module.ts: Ts module that defines the routing of the application throug router-outlets to define which components should be displayed according to different paths. Specify which routes are available, how should be contructed, which paramets can be added and which components are link to which paths. 

Also:
- Readme & License
- Configuration files for truffle, debian-installer, angular, typescript, electron and node

## Usage

You will see the address/es of your node, click on any of them to see its contracts (empty if any has been created) or to create a new one. Click on a contract to interact with it.

Contracts should point one of your other accounts to work as expected due to smart contract requirements.

Contracts should be accepted, by the receiver account, to work with them. You can accept, update state, dispute state, request close or unlock funds depending on contract live cycle explained in the TFG paper: [Scalability Issues in the Blockchain] ().

Further features on development.
