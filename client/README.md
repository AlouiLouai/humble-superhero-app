# Humble Superhero API UI

This project is a modern React UI for the Humble Superhero API, built with Next.js 15 using the App Router. It allows users to view and add superheroes with their respective superpowers and humility scores.

## Features

- View a list of superheroes, sorted by humility score
- Add new superheroes with name, superpower, and humility score
- Responsive design for mobile and desktop
- Real-time updates when adding new superheroes
- Loading indicator while fetching data

## Technologies Used

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Fetch API for data fetching

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later recommended)
- npm or yarn

## Getting Started

2. Install dependencies:
   \`\`\`
   npm install
   # or
   yarn install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add your API URL:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:3000
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- \`src/\`: Contains the main application code
    - \`app/\`: Contains the main application code
        - \`layout/\`: Contains the common layout
        - \`page.tsx/\`: The main page component
    - \`components/superhero/\`: Superhero React components
        - \`SuperheroForm.tsx\`: Form for adding new superheroes
        - \`SuperheroList.tsx\`: List of superhero cards
        - \`SuperheroCard.tsx\`: Individual superhero card component
    - \`hooks/\`: Contains the custom hook useSuperHero
    - \`interfaces/\`: Contains the interfaces needs in out client
    - \`services/\`: Contains the web services consumed
  

## API Integration

This UI is designed to work with a NestJS backend API. Ensure your API is running and accessible at the URL specified in your \`.env.local\` file. The API should support the following endpoints:

- GET /superheroes: Fetch all superheroes
- POST /superheroes: Add a new superhero

## Customization

You can customize the UI by modifying the Tailwind CSS classes in the component files. The project uses Tailwind's default configuration, which can be extended in the \`tailwind.config.js\` file.

## Deployment

This project can be easily deployed on Vercel, which is optimized for Next.js applications. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


