[![Build Status](https://travis-ci.org/alexbepple/parse-event-js.svg?branch=master)](https://travis-ci.org/alexbepple/parse-event-js)
[![Dependency Status](https://gemnasium.com/alexbepple/parse-event-js.svg)](https://gemnasium.com/alexbepple/parse-event-js)
[![Test Coverage](https://codeclimate.com/github/alexbepple/parse-event-js/badges/coverage.svg)](https://codeclimate.com/github/alexbepple/parse-event-js)


## What is this?

A small lib/utility that parses calendar events specified in compact text form and formats them into something unambiguous. The goal is to speed up and ease entry of calendar events.

So far _parse-event-js_ serves only my personal purposes. If you would like to use it, I am open to any suggestions on how to proceed with development. One obvious step is to extract the lib part into an NPM module. So far, this was not a priority. Contact me to make it one.


### Usage examples

Feature                  | Example
-------------------------|----------------------
shorthand for 'today'    | "tod 19:00 Dinner"
similarly for 'tomorrow' | "tom 19:00 Dinner"
all-day events           | "tom Mom’s birthday"
days of week             | "tue 19:00 Dinner"
times without colon      | "tue 1900 Dinner"
durations                | "tue 1900 2h Dinner"


### Why did I write this?

I prefer the keyboard to the mouse. The OS X Calendar app is kinda the opposite. 

When I got annoyed by creating events in the Calendar app, I started using [QuickCal](http://quickcalapp.com/). 

Then I got annoyed by QuickCal’s limitations. So I built a preparser ([QuickCalify](https://github.com/alexbepple/quickcalify)) that worked around some of the quibbles I had with QuickCal, used QuickCal’s API and integrated the two in an [Alfred](http://www.alfredapp.com/) workflow. 

I could not get rid of all the issues and got annoyed trying. It was time to vertically integrate event creation. Thus I wrote _add-event-oc,_ a tiny Objective-C tool that does nothing but exercise the EventKit API, and _parse-event-js,_ which does all the heavy lifting of parsing and formats the result in a form that can be easily passed on to _add-event-oc._

While the functionality may seem similar to other libs/utilities like [Sherlock](https://github.com/Tabule/Sherlock) and [event-parse](https://github.com/ryhan/event-parse) the purpose is much more narrow: speed up entry of events.


## Try it

    npm install
    ./node_modules/.bin/lsc src/parseEvent.ls 'tom 1200 1h Lunch'


## Work with the code

    npm install
    make tdd

