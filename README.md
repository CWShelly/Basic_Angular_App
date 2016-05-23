# Basic_Angular_App

#This is a two resource (mugs and vinyl) CRUD app that uses angular for data binding.

To use:
Install the dependencies by running npm install. Gulp, Protractor, and Mocha should be also be installed globally (npm install -g [package]). Note:

From the project root directory:
1. $ cd client && gulp && gulp start.
2. Open your browser, and navigate to localhost:5000.

Mugs:
3. To POST a new mug record, fill in the fields next to "Place", "City", and "Drink Pref", then click "Create Mug!".
4. To edit an existing mug record, click the "Edit" button, and make the desired changes via the provided input fields. Save your changes by clicking "Update Mug!" If you don't want to edit your mug, but you've already clicked "Edit", just click "Cancel".
5. To DELETE a mug, click the "Remove Mug" that's next to the record you want to remove.

Vinyl:
3. To POST a new vinyl record, fill in the fields next to "Abum", "Artist", and "Purchased At", then click "Create Vinyl!".
4. To edit an existing mug record, click the "Edit" button, and make the desired changes via the provided input fields. Save your changes by clicking "Update Vinyl!" If you don't want to edit your vinyl, but you've already clicked "Edit", just click "Cancel".
5. To DELETE a vinyl, click the "Remove vinyl" that's next to the record you want to remove.

Integration Testing:
* $gulp integration:test

Mocha Testing:
1. $cd .. && cd server
2. gulp mugs
3. gulp vinyl
