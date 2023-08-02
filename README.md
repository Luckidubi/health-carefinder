# CareFinder Web App

CareFinder is a web application that allows users to find nearby hospitals based on their current geolocation. The app utilizes the LocationIQ API to fetch hospitals' data and displays them on a map. Users can also search for hospitals by name or address and save their favorite hospitals to their library for quick access.

## Features

1. Hospital Search: Users can search for hospitals based on their names or addresses.

2. Nearby Hospitals: The app fetches and displays nearby hospitals based on the user's current geolocation.

3. Hospital Details: Users can view detailed information about each hospital, including its name, address, and contact information.

4. Sharing Hospital Links: Users can share links to specific hospitals, allowing others to directly access the hospital's details.

5. User Library: Registered users can save hospitals to their library for quick access and future reference.

6. Admin Panel: Admin users have the ability to create and edit hospital entries, ensuring accurate and up-to-date information.

## How to Use CareFinder

### Find Hospitals

1. When you first visit the CareFinder web app, it will prompt you to allow geolocation access. Click "Allow" to enable the app to fetch nearby hospitals based on your current location.

2. Use the search input on the find hospitals page to search for hospitals by name or address. The app will filter and display the matching hospitals. note that the api used is still on beta, so some hospitals may not be displayed.



### Hospital Details

1. Select a hospital from the search results to view its detailed information.

2. The hospital details page will display the hospital's name, address, contact information, and other relevant details.

3. You can copy the hospital's URL from the address bar to share the hospital link with others.

### User Library

1. You can save your favorite hospitals to your library for quick access.

2. Click on the "Save to Library" button on the hospital details page to add the hospital to your library.

3. You can remove hospitals from your library by clicking the "Delete" button.

### Admin Panel

1. Admin users have additional privileges to create and edit hospital entries.

2. To access the admin panel, you need admin credentials provided by the website administrator.

3. In the admin panel, you can add new hospitals or edit existing hospital entries to ensure accurate and up-to-date information for users.

## Technologies Used

- Next.js 13: React framework for server-side rendering and API handling.
- TypeScript: Typed superset of JavaScript for enhanced code quality.
- LocationIQ API: External API for fetching hospital data based on geolocation.
- MongoDB: Database for storing hospital and user data.
- Firebase Authentication: Authentication system for user registration and login.
- Shadcn ui: A collection of beautifully typed components
- Tailwindcss: Tailwind CSS framework for CSS customization.
- Leaflet: Map library for displaying hospitals on a map.
- Tankstack react-table: Table library for displaying hospital data.

## Resources
The following resources were used during the development of CareFinder:

1. Next.js Documentation: https://nextjs.org/docs
2. LocationIQ API Documentation: https://locationiq.com/docs
3. ChatGPT 3.5: https://openai.com/blog/chatgpt
4. Stack Overflow: https://stackoverflow.com

## Setup and Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory and install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Create a `.env.local` file in the project root.
   - Add the necessary environment variables (e.g., `LOCATION_API_KEY`, `MONGODB_URI, FIREBASE_API_KEY`)

4. Start the development server:

```bash
npm run dev
```

5. Access the web app in your browser at `http://localhost:3000`.

## Contributions

Contributions to CareFinder are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
