[![Stories in Ready](https://badge.waffle.io/IEEE-UH-Manoa/ieeeatuhm-api.png?label=ready&title=Ready)](https://waffle.io/IEEE-UH-Manoa/ieeeatuhm-api) [ ![Codeship Status for IEEE-UH-Manoa/ieeeatuhm-api](https://codeship.com/projects/7a48aa30-6d14-0132-5053-326df4eb838b/status?branch=master)](https://codeship.com/projects/54163)

ieeeatuhm-api
=============

IEEE Student Branch API. Currently hosted at http://api.ieeeatuhm.com


# Description

The initial purpose of the IEEE API is to help facilitate the 
development of the IEEE Student Branch at UHM android application.

Currently, it provides:

* An API for basic events handling
* A cache for the Google Spreadsheet hosting all of the IEEE @ UHM events.

# Features (In order of importance)

- [x] Allows users to access generic IEEE student branch information
- [x] Provides IEEE at UHM Event Information (Who, when where, etc.)
- [ ] Allows users to access a list of Board Agenda and Minutes 
- [ ] Provides a log of IEEE General Board Activities
- [ ] Gives transparent access to IEEE financial logs
- [ ] Integrates IEEE at UHM user accounts
- [ ] Integrates IEEE Points/Rewards System
- [ ] Provides an aggregated news feed of IEEE-related events
- [ ] Allows users and applications to participate in elections and polling


# Contributing 

Since this is an open source project for the community, contributions are more than welcome! If you
have any comments, please open up an issue. If you wish to contribute, fork the repository make 
your changes and submit a merge request. 

If you're new to web development but you've taken a programming course before (EE 160 perhaps?), here
are some concepts that you should be familiar with before getting involved with this particular project:

* Javascript
* Asynchronous Callbacks
* Node.js
* Git
* GitHub
* Git Flow 

If you're completely new to development or you're looking to learn some of the concepts above, stop
by the IEEE chatroom (chat.ieeeatuhm.com) and ping me (Kenny Luong) for some help. I'll be more than
happy to point you in the right direction.


# Reference

## GET /

__Description:__

Default route. 

## GET /events

__Description:__

Returns all of the events in the IEEE @ UHM database. 

## GET /events-upcoming

__Description:__

Returns the next two week's worth of events in the IEEE @ UHM database


## GET /sync-events

__Description:__

Sync the events sheet with the mongodb backend.

## GET /about

__Description:__

Returns something about.

## GET /tasks

__Description:__

Returns current active tasks (via trello).

## GET /boards

__Description:__

Returns IEEE trello boards.

## GET /eat

__Description:__

Returns a string containing a random place to eat. Data is scraped from https://wiki.ieeeatuhm.com/doku.php?id=good_eats:start 
and is cached in memory for api access.

    "Mcdonalds"

## GET /eats

__Description:__

Returns an array containing an N amount of random places to eat. Data is scraped from https://wiki.ieeeatuhm.com/doku.php?id=good_eats:start 
and is cached in memory for api access. 

If parmeter n is not specified in the query then the route returns an array with one result. 

    ["Mcdonalds", "Jack in the Box"]


