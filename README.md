## Overview

This is a React-based web application that showcases the portfolio of AL-Hassan Sarrar. It includes several components to highlight skills, a banner section, a navigation bar, and a footer. The app utilizes various libraries such as `react-bootstrap`, `react-router-dom`, and `react-multi-carousel` to create a responsive, interactive, and modern user experience.

![image](https://github.com/user-attachments/assets/d951a3d3-6ae7-4bed-bec0-0ebe9991f99c)

## Features

- **Responsive Design**: The website is fully responsive and adjusts to different screen sizes using Bootstrap and custom breakpoints for mobile, tablet, and desktop views.
- **Animated Banner**: The banner features a dynamic text rotation effect that introduces the user as a computer scientist, software engineer, cyber security expert, and data scientist.
- **Skills Carousel**: A carousel component displays various skills in categories like Ethical Hacking, Penetration Testing, and Web Development.
- **Interactive Navigation**: A sticky navigation bar that highlights the active section as users scroll.
- **Social Links**: Links to social profiles like LinkedIn, Facebook, Instagram, and Telegram.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **React-Bootstrap**: A library that combines Bootstrap's front-end framework with React components.
- **React-Router-Dom**: A routing library for handling navigation between pages in React apps.
- **React-Multi-Carousel**: A carousel component to display a collection of items in a responsive way.
- **Animate.css**: A library for adding CSS-based animations.
- **React-On-Screen**: A library that allows elements to trigger animations when they appear on the screen.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/s4rrar/s4rrar-portfolio.git
   cd s4rrar-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` to view the application.

## Components

### 1. **NavBar** (`NavBar.jsx`)

- Contains the navigation menu with links to different sections (Home, Skills, Projects).
- The navigation bar is sticky and changes its appearance when the page is scrolled.

### 2. **Banner** (`Banner.jsx`)

- Displays a dynamic greeting with rotating job titles.
- Includes a "Let's Connect" button that links to the Telegram profile.

### 3. **Skills** (`Skills.jsx`)

- Displays a carousel of skills in different areas like Ethical Hacking, Software Engineering, etc.
- The carousel is responsive and adjusts based on the screen size.

### 4. **Footer** (`Footer.jsx`)

- Displays social media links and a footer note with the developer's name and Telegram contact.

## Libraries Used

- **React**: Core library for building the user interface.
- **React-Bootstrap**: Bootstrap components for responsive design.
- **React-Router-Dom**: For navigation between sections of the portfolio.
- **React-Multi-Carousel**: For creating responsive carousels.
- **Animate.css**: For adding animations to elements when they appear on screen.
- **React-On-Screen**: For triggering animations when elements become visible in the viewport.
