# SQL Query Simulator

## Overview
The SQL Query Simulator is a web-based application that allows users to write and execute SQL queries while displaying predefined results. This project is entirely front-end and focuses on usability, performance, and scalability. It features an interactive UI, query execution simulation, and a structured approach to handling SQL queries efficiently.

## Tech Stack
- **JavaScript Framework**: React+vite
- **CSS Framework**: Vanilla CSS
- **Major Packages Used**:
  - **PapaParse**: To enable CSV downloads of query results.
  - **React-Window**: For efficient rendering of large datasets.

## Key Features
- **Database Schema Panel**: Displays available tables and their columns.
- **SQL Query Editor**: Users can write SQL queries and execute them with a 'Run' button.
- **Query Execution & Results**: Simulates query execution and displays predefined results.
- **Query History**: Users can revisit and re-run past queries.
- **Click-to-Query Feature**: Clicking on a column auto-generates a query for fetching that column.
- **Pagination & Infinite Scroll**: Users can switch between paginated results or infinite scrolling.
- **Download CSV**: Users can download query results in CSV format.

## Performance & Optimization
- **Dataset Storage**: The dataset is placed in the `public` folder instead of `src` to prevent browser crashes at build time. This allows data to be fetched dynamically via an API request.
- **Optimized Query Results Display**: Implemented efficient rendering techniques to handle large datasets smoothly.
- **Page Load Time Measurement**:
  - I used the Chrome DevTools Performance tab to measure the load time.
- **Optimizations Implemented**:
  - Reduced bundle size by using fewer dependencies.
  - Minimized re-renders of UI components to enhance responsiveness.
  - Implemented query results pagination for handling large data sets efficiently.

## Deployment
- **Platform**: Deployed on Netlify for easy access and sharing.
- **Live Demo**: [Query Playground](https://boisterous-horse-319573.netlify.app/)

## Setup Instructions
```sh
# Clone the repository
git clone https://github.com/Kartik-106/Atlan-Frontend-Engineer-Task/

# Navigate to the project directory
cd Atlan-Frontend-Engineer-Task

# Install dependencies
npm install

#generate Possible Queries
node generateQueryMap.CJS

# Start the development server
npm run dev
