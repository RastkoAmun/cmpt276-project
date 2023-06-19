# CMPT 276 - Group 10 Project Proposal

## Introduction

HealthTrackr is an online application that allows users to plan and track the most important factors of health, all packaged in a single application. Users will be able to sign up and create their own profile. From there, the user will be able to use various trackers to maintain their well being. Categories such as sleep, nutrition, and exercise can all be tracked from within the application, along with a todo list so that users can have a clear picture of their daily routine. Additionally, we want to include a social aspect in our app, things like being able to share your goals and allowing other users to congratulate you for achieving it.

Currently, there are many applications that track sleep, nutrition, and exercise. However, they are usually focused on just that one aspect of health. Our project proposal is to group up all of the mentioned features into one application to provide an improvement to the quality of life for anybody seeking to track their health.

## Feature List

Sleep Tracker → Users will be able to add new date and specify the quality of sleep
(when the user went to bed, when the user woke up, and to specify overall how he/she was satisfied with the quality of sleep). All dates will be kept in a list and the user will be able to compare his sleeping schedule between days or between weeks. User is also able to set the goal for how many hours to sleep per night, so depending on the day, he/she will get messages if they didn't achieve enough sleep for that day (or for that week).

Calories Intake Tracker → Users will be able to track what they eat every day. Users will be able to see the whole list of all days where they kept track of eating records. Each day will have a button where users will be able to see details for that day (e.g. how many calories per meal, what meal they ate and so on). Users will also be able to keep track of nutrients they want to eat for that week and set goals for eating habits. 

Exercise Tracker → Users will be able to track their workouts and organize them by the dates in the table. Type of exercises will be sorted in the categories and the users will be able to filter the categories and then compare their progress throughout the weeks. They will also be able to keep a record of what exercises they do in a particular workout session, how many sets for each exercise and how many repetitions for each set.

Water Intake Reminder → Users will be able to set an optimistic goal of how much water they need to drink per day. Then according to the specified number, the algorithm will divide it by the number of glasses of water that cover the daily goal, and it will send reminders accordingly and other details if necessary.

Login Page & User Profile → Personal data is recorded and saved for each user. Such personal data includes: weight, height, age, and gender. If the user's goal is to lose weight, they would be able to keep track of their progress.

Todo List → Users can add and keep track of their daily goals and reminders.

## Competitive Analysis

One application that is popular on iOS is called Streaks. Streaks allows their users to track up to 24 tasks that they want to complete each day, with the goal of building up a streak of consecutive days. With over 600 task icons available, users are able to track almost anything they need to track, whether it be brushing teeth, quitting smoking, or eating a healthy meal. On the main screen, a grid of circular icons that show progress is neatly displayed, and clicking the icon will bring you to another page that shows detailed information about that specific task, including charts and graphs regarding that task. The app is simple to use, and the pages are professionally designed; it’s no wonder that their app has a 4.7 star rating with over 2,500 reviews. However, as an iOS-exclusive app, they do not have a web application, so not everybody is able to install and use the app. Additionally, their app costs $7, which also dissuades people from using it. Lastly, Streaks is focused on habit building and tracking, so it will not have as many features beyond simple tracking and reminding. Though our group is not made up of experienced UI/UX designers and software engineers, we can take design inspiration from the things that Streaks does very well. If we are able to create a beautifully designed all-in-one web application and release it for free, the application would do very well, especially if we could eventually adapt it for mobile use.

## Our Team

Rastko Salvarica has development experience in React with Material UI, along with React-Router for routing between pages.

Banveet Kaur Johal has experience coding in Java along with development using Spring. Additionally,Database design.

Anson Chan has development experience with React, Java, and PostgreSQL.

Edmund Lee has full stack development experience using React, Spring, and SQL.

Sean Shen has front-end development experience with HTML, CSS, and JavaScript.

## Techstack

For the frontend, we will be using React paired with the MUI component library.

For the backend, we will be using Spring.

For the database, we will most likely be going with an SQL database like Postgres as it currently seems like a lot of relationships between various data tables.

## Group meetings

Our first meeting was on June 14, 2023 at 8pm that lasted 40 minutes.

Future weekly meetings will take place on Wednesdays at 8pm. We will have additional meetings if necessary and it will be brought up and discussed during this Wednesday meeting. We believe that frequent standups are not needed as not everybody will be working on the project everyday. However, we will maintain good communication on development progress and issues on the Discord.

## APIs

One feature that will need an API is nutrition tracking. We would need a list of a lot of food along with their respective calories and macronutrient information. We found three APIs regarding this that we can potentially use: Food & Grocery API by Edamam (https://developer.edamam.com/food-database-api), CalorieNinjas (https://calorieninjas.com/api), and Canadian Nutrient File API by the Government of Canada (https://hc-sc.api.canada.ca/en/detail?api=cnfp)


 

