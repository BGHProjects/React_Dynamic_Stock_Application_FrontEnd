# NO LONGER FUNCTIONAL
This application was dependent on an API that was housed behind a firewall only available through a VPN provided by my university, which is no longer accessible

# React_Dynamic_Stock_Application_FrontEnd
A web application primarily using React.js that queries a stocks API to dynamically display information for authenticated and unauthenticated users

# Application description
The purpose of this React-based web application is to allow users to view and analyse stock market statistics from a specifically created database, exposed via a REST API. From an initial Landing Page, the user can either navigate directly to a list of available stocks drawn from an American stock market exchange called Stock Search as a guest, log into an account or register a new one. When using Stock Search as a guest, users can filter through the list stocks by industry, and clicking on a listed stock navigates the user to a Stock Details page, where they can view the latest stock market entry for that company. Following a successful log in from either an already existing account or a newly registered one, an authenticated user can navigate to an authenticated Stock Details page from Stock Search, where the user can view all the entries for the company, and search the entries via dates, and view a graphical representation of the closing prices of that company’s stocks. 

# Uses the following technologies/libraries:
- AG-Grid-React to display stocks information
- React-Chartjs-2 to visual display stocks information
- React-router-dom to navigate between different pages of the application
- Jsonwebtoken to provide web token functionality for user authentication
