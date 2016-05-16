# Basic_Angular_App

This is a two resource CRUD app that uses angular for data binding.

To use:
Install the dependencies by running npm install.

1. Navigate to the client folder and run $ gulp. Gulp should be installed globally as well as locally.
2. In a new terminal window, open a mongo shell via mongod.
3. In a new terminal window, run the client server by entering $node server.
4. In a new terminal window, navigate to the project root directory, then to the server folder. Run $node server.
5. Launch your browser. In the address bar, enter "localhost:5000".
6. To POST, enter corresponding input information in the input boxes provided, then click on either the 'Create Mug' or 'Create Vinyl' depending on what record you want to create.
7. To PUT, click the 'Edit' button, and edit the information. Save and update by clicking 'Update Mug'.
8. To Delete, click either "Remove Vinyl" or "Remove Mug" depending on which record you want to delete.
9. GET occurs when you refresh the page.

Running e2e tests. Protractor should be installed globally as well as locally.
1. Navigate to the client folder. In the terminal window, run gulp:protractor:tests.

Running unit tests. Karma should be installed globally as well as locally.
1. Mugs: Navigate to the client folder. In the terminal window, run gulp:weback:mugstest. Then run karma start.
2. Vinyl: Navigate to the client folder. In the terminal window, run gulp: webpack:vinyltest. Then run karma start.
