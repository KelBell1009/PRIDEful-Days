# PRIDEful Days
Why only have PRIDE month during June? We should be able to celebrate Pride year round. Using PRIDEful Days, you can search for any day of the year to see what influential LGBTQIA+ members were born.

## Inspiration
I was inspired by the daily flip/tear off calendars that usually have facts. Also by the fact that there are many LGBTQIA+ members who historically have not been recognized. This web app allows for a small dose of history and pride.

## What it does
The web app uses a date dropdown to allow users to select the Month and Date of interest. The page will then populate with up to 10 of the most referenced people who have stated they align with LGBTQIA+. Along with each person comes a small description about who they are.

## How it's built
By using the Wikidata Query API, I am able to query for humans who have traits for sexuality and gender. Note that this is only sourced from Wikidata where there must be a cited reference to the person self stating this identity. Using HTML, XML parsing, and some JS, I am able to display these in the web app for easy consumption.
