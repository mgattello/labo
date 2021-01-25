![image](./src/assets/labo.png)

# Labo v1.1.1

Labo is a Browser Extensions Tester. LaboPerformance uses the Puppeteer.metrics API and the Web API to run its performance tests.

## Puppeteer

Labo uses Puppeteer v2.1.1. The Browser used is Chromium.

Links to the documentation: https://pptr.dev/
Puppeteer.metrics API: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagemetrics

## Web API

Labo uses Performance.timing: https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing

Attention Performane.timing is deprecated:

> This feature is no longer recommended. Though some browsers might still support it, it may have already been removed from the relevant web standards[...]

The Web API documentation is suggesting to use Performnce.timeOrigin, but is an experimental technology: https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin

## Get Started

clone the repo: `git clone git@github.com:mgattello/labo.git`

run `npm install`

Download the CRX of the extension to test and save it in a folder inside the Directory.

*** Make sure to disable redirect events in the extension. Opening new pages, will affects the tests ***

The output will be saved in the reports directory







