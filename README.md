# Labo v0.0.1

Labo is a Browser Extensions Tester. LaboPerformance uses the Puppeteer.metrics API and the Web API to run its performance tests.

## Puppeteer

Labo uses Puppeteer v2.1.1

Links to the documentation: https://pptr.dev/
Puppeteer.metrics API: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagemetrics

## Web API

Labo uses Performance.timing: https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing
Attention Performane.timing is deprecated:

> This feature is no longer recommended. Though some browsers might still support it, it may have already been removed from the relevant web standards[...]

The Web API documentation is suggesting to use Performnce.timeOrigin, but is an experimental technology: https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin
