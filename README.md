# Seven segment activity

An activity for CMPT 328 (Computer Architecture) that has students go through the process of programming a seven-segment display (that is, determine what Boolean functions to connect to each of the seven segment inputs) to show the digits 0–9.

## Frameworks and tools
* Yarn — package management
* Antlr4 — parsing engine used for Boolean expressions
* React — user interface

## Usage
### `yarn start`
Starts development server

### `yarn build`
Runs webpack to build static HTML into `build/` subdirectory, suitable for including in a web page

(Note that the `homepage` key in `package.json` should be adjusted to point to where the app will be deployed.)
