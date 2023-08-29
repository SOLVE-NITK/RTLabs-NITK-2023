# RTLabs-NITK-2023
# CSV Data Plotter

This simple web application allows you to visualize data from a CSV file using Plotly.js. It fetches data from a CSV file and generates a line plot based on the data.

## Getting Started
1. Ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official [Node.js website](https://nodejs.org/).

2. Clone this repository to your local machine using:
   ```shell
   git clone git@github.com:SOLVE-NITK/RTLabs-NITK-2023.git
3. Navigate to the project directory:
   ```shell
   cd csv-data-plotter
4. Install the project dependencies:
   ```shell
   npm install
5. Start the local server:
   ```shell
    nodemon app.js
6. Open your web browser and navigate to http://localhost:3000.
7. Click the "Load" button to fetch and visualize the data from the trial_1.csv file.
8. The plot will be displayed on the page using Plotly.js.

## File Structure
1. app.js: Node.js server script that serves the web application and handles data visualization.
2. index.html: HTML file containing the button to trigger the plot generation.
3. plotPage.html: HTML file containing the script to fetch and plot data from the CSV file using Plotly.js.
4. trial_1.csv: Sample CSV file containing data to be visualized.

## Notes
1. Make sure the trial_1.csv file is located in the same directory as the app.js file.
2. This application requires Node.js and npm to be installed to run the local server.
3. This is a simple example and can be extended with additional features, error handling, and UI improvements.



  



