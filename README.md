# JSON VIEW GENERATOR
#### Video Demo:  https://youtu.be/PUc_3JxBoiI

## Stack
This project was developed with Vanilla JavaScript, Bootstrap 5.2, and Flask.

## Description
My final project is a fullstack web app that fetches and displays data to the user and provides a database to save data for viewing later. The app generates most of the web page dynamically based on the users input and based on the data retrieved. It is built to be responsive and viewable on mobile devices without losing any functionality.

### Folders
The app contains 2 files in the root folder:
1. static<br>
Contains JavaScript files
2. templates<br>
Contains HTML files

Within `static`, there is:
1. components<br>
This folder contains the files that contain the UI components and their logic
2. generators<br>
This contains files that generate the table headers, the data table, and the collision table
3. Launch<br>
This contains the files called when an HTML page loads

## Purpose
The goal of the app is to fetch JSON data from an API and display it to the user. The app gives the user the option to view it as a basic table list or to hash the data. The app also lets you "tunnel" into iterable data contained within the retreived data.

### Hashing
As stated previously, the retreived data can be hashed. If the retrieved data is an array of JSON data, the app will detect this and then provide a list of indices to organize the data. After hashing the data, the app detects any collisions and displays the collisions along with the data.

Upon detecting a collision, the app generates a table that provides data on the effectiveness of the key chosen based on data it collects on the collisions.

### Saving Tables
After data is displayed in either a list or hash table, the table can then be saved to a MySQLite database. The data saved is based on how far into the data the user has tunneled. For instance, if the JSON data contains an array or object and the user selects that data to be displayed, they can then save that data to the database. Upon submitting the table, the user will select a username for the table. Any errors will be caught and displayed to the user, preventing the submission. Otherwise, the data will be saved and the page reloaded.

### Retrieving Saved Tables
After saving a table, that data can be immediately retrieved by the user and displayed exactly as it was saved. The app then provides meta data regarding the table, inlcuding the original URL, timestamp, and name.

## Overall Thoughts
This app was developed as an attempt to make hash tables more accessible and less abstract. Initially, the app was designed as a sandbox where a table with linked lists could be created. But, I could not grasp the viability and efficiency of this as an app. This sandbox is still accessible via the SANDBOX link in the navbar. Though scrapped, I still imagined creating something centered on hash tables and linked lists and decided that the user should retrieve the data and have it displayed to them. Since I am most familiar with fetching data from APIs, I built the app to focus on JSON data that a user requested from an API. While I wanted to include the option to get a CSV file from the user's computer as another option, I worried this would require double the effort and time. Ultimately, I went with quality over quantity and focused on one type of data and source. 

The idea quickly evolved to allow the option to view the data as a list or a hash, which was not significantly different from a UI standpoint (except in the case of collisions). But from a coding standpoint, these required a lot of navigating data types with logic.

Initially, the collision table that displayed data about the hash table was more of a main focus. And the initial goal was for the table to give the user an intelligent approximation of how viable a key was as a hash key. But, as I explored the idea more, I realized collisions were only going to be present if the data retrieved was an array of data. And, as this might not be a common occurence, I realized the collision table may be a secondary or tertiary feature. It's output then changed from viability to just data about collisions and only appeared when a collision was present.

Another point of contention was how to save the data. At first, I wanted to be creative and save the data IN A HASH FORMAT. But, then, after setting up the logic on the backend, I realize there was no real value in saving the data this way. So I focused on setting up the database to save the data as a long string.

After editing and re-editing this overall framework, the rest of energy was focused on developing an enjoyable, consistent, RESPONSIVE, logical, and stateful UI. Through this process, the app seemed to become more of a way to view and save fetched JSON data.

## Final Thoughts
This would have been a lot quicker and easier to develop with the React library. It would have been less tedious and a lot less repetitive.

Also, my personal goal was to develop a hash table or linked lists more fluidly and even code more with recursion. I ultimately feel like I achieved this goal, and while I am not entirely sure how valuable this project will be to others, it was very valuable to me in my coding journey.

