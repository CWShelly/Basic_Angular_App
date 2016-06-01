# Basic_Angular_App

#This is a two resource (mugs and vinyl) CRUD app that uses angular for data binding.

To use: <Enter>
Install the dependencies by running npm install. Gulp, Protractor, and Mocha should be also be installed globally (npm install -g [package]). Note: <Enter>

From the project root directory: <Enter>
1. $ cd client && gulp && gulp start. <Enter>
2. Open your browser, and navigate to localhost:5000. <Enter>

Mugs: <Enter>
3. To POST a new mug record, fill in the fields next to "Place", "City", and "Drink Pref", then click "Create Mug!". <Enter>
4. To edit an existing mug record, click the "Edit" button, and make the desired changes via the provided input fields. Save your changes by clicking "Update Mug!" If you don't want to edit your mug, but you've already clicked "Edit", just click "Cancel". <Enter>
5. To DELETE a mug, click the "Remove Mug" that's next to the record you want to remove. <Enter>

Vinyl: <Enter> <Enter>
3. To POST a new vinyl record, fill in the fields next to "Album", "Artist", and "Purchased At", then click "Create Vinyl!". <Enter>
4. To edit an existing mug record, click the "Edit" button, and make the desired changes via the provided input fields. Save your changes by clicking "Update Vinyl!" If you don't want to edit your vinyl, but you've already clicked "Edit", just click "Cancel". <Enter>
5. To DELETE a vinyl, click the "Remove vinyl" that's next to the record you want to remove. <Enter>

Integration Testing: <Enter>
* $gulp integration:test <Enter>

Unit Testing
* $gulp webpack:resourcetest
* karma start
