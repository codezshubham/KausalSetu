# KaushalSetu: AI-Powered Career Guidance Platform

## Description

KaushalSetu is a comprehensive, AI-powered platform designed to provide personalized career guidance to students, primarily focusing on those in Class 10 and 12. It offers a structured approach to career exploration by integrating aptitude, interest, and values assessments with a rich database of career options, higher education pathways, government job opportunities, private sector roles, and scholarships. The platform leverages a conversational AI chatbot to deliver tailored advice and aims to empower students to make informed decisions about their future, promoting enrollment in suitable educational programs and government colleges.

## Features

*   **User Authentication**: Secure user registration and login functionality using NextAuth.js.
*   **Personalized Career Assessment**: In-depth assessments covering:
    *   **Aptitude**: Logical reasoning, verbal ability, numerical aptitude, creative thinking, spatial awareness, interpersonal skills, technical proficiency, organizational skills, entrepreneurial skills, and physical/manual skills.
    *   **Interests**: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional (RIASEC model-like).
    *   **Values**: Work-life balance, achievement, independence, recognition, supportive environment, compensation, and security.
*   **AI Career Chatbot**: An intelligent conversational agent powered by Google GenAI (Gemini) that provides personalized career advice, suggests educational paths, government colleges, and scholarships based on user input and profile.
*   **Mentor Directory**: Browse a diverse list of professional mentors from various domains (Engineering, Medical, Management, Law, Commerce) with detailed profiles, specializations, experience, and reviews.
*   **Higher Education Explorer**: Discover detailed information on postgraduate courses (M.Tech, MBA, MD, M.Sc, LL.M, etc.), including eligibility, admission processes, top institutes, career prospects, and approximate fees.
*   **Government Job Exams Database**: Access comprehensive details about various government examinations (UPSC CSE, IBPS PO, SSC CGL, RBI Grade B, NDA, GATE, CTET, etc.), including conducting bodies, posts, eligibility, and selection processes.
*   **Private Job Opportunities**: Explore a curated list of private sector job titles, companies, experience levels, key responsibilities, required skills, and average salary ranges.
*   **Detailed Career Profiles**: In-depth articles providing a "Day at Work," "Attractions," "Challenges," and preparation guides (minimum qualifications, training, desirable experience) for specific job roles (e.g., Full Stack Developer, Software Application Packager).
*   **Scholarship Finder**: A comprehensive list of scholarships (Reliance Foundation, AICTE Pragati, INSPIRE, HDFC Bank Parivartan, Tata Trusts, PMRF, Kotak Kanya, Amazon Future Engineer, etc.) with provider details, stipends, eligibility, and requirements.
*   **College Directory (Kashmir Focus)**: Browse Government Degree Colleges (GDCs) in the Kashmir region with details like district, email, website, rating, address, type, gender, student/faculty count, campus size, and courses offered.
*   **User Profile Management**: Store and retrieve additional user details like gender, language, grade, school name, interests, higher study plans, state, and locality.
*   **Responsive UI**: Built with Next.js and Tailwind CSS for a modern, mobile-friendly user experience, including custom styling and animations.

## Installation

To set up CareerCompass locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    MONGODB_URI="your_mongodb_connection_string"
    NEXTAUTH_SECRET="a_strong_random_secret_for_nextauth"
    GOOGLE_GENAI_API_KEY="your_google_genai_api_key"
    ```
    *Replace placeholders with your actual values.* For `NEXTAUTH_SECRET`, you can generate one using `openssl rand -base64 32`.

4.  **Database Seeding (Optional):**
    The project uses several data files for its content and database models for the assessment system. To populate your MongoDB with the initial assessment categories, subcategories, and questions, you can use the provided API endpoints:
    *   `POST /api/db/category`
    *   `POST /api/db/subcategory`
    *   `POST /api/db/question`
    The static data (e.g., `mentorsData`, `higherStudiesData`, `privateJobsData`) is directly imported and used in the frontend; it does not require database seeding.

## Usage

Once the installation is complete and environment variables are set, you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will automatically reload as you make edits to the source code.

## Tech Stack

*   **Frontend**: [Next.js](https://nextjs.org/) (React Framework), [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (Node.js)
*   **Database**: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) (ODM)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Credentials Provider
*   **AI Integration**: [Google GenAI](https://ai.google.dev/) (Gemini model)
*   **Styling**: Custom CSS with `oklch` color format, `tw-animate-css` for animations
*   **Utilities**: `bcryptjs` (password hashing), `clsx`, `tailwind-merge` for CSS class management.

## API / Endpoints

The backend is built using Next.js API Routes, providing the following endpoints:

*   **Authentication**
    *   `POST /api/auth/register`: Registers a new user with `firstName`, `lastName`, `phone`, `email`, `password`.
    *   `GET /api/auth/[...nextauth]`: Handles authentication requests for sign-in, sign-out, and session management.
    *   `POST /api/auth/[...nextauth]`: Handles authentication requests for sign-in, sign-out, and session management.

*   **Career Assessment**
    *   `POST /api/db/assessment/save`: Saves a user's completed assessment results. Requires `userId`, `category` (title), and an `answers` array.
    *   `POST /api/db/assessment/get`: Retrieves a user's saved assessment data. Requires `userId`. (Note: Current implementation has a potential issue in retrieving specific answers linked to a user within the nested structure).

*   **Assessment Structure Management**
    *   `POST /api/db/category`: Creates a new top-level assessment category. Requires `title`.
    *   `POST /api/db/subcategory`: Creates a new sub-category and links it to an existing `Category`. Requires `categoryTitle`, `subCategoryTitle`.
    *   `POST /api/db/question`: Creates a new question and links it to an existing `SubCategory`. Requires `questionTitle`, `subCategoryTitle`.

*   **AI Chatbot**
    *   `POST /api/chatbot`: Interacts with the AI career guidance chatbot. Requires `userQuery`.

*   **Health Check**
    *   `GET /api/test`: A simple endpoint to test database connectivity.

## Contributing

We welcome contributions to CareerCompass! If you'd like to contribute, please follow these steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your forked repository to your local machine.
3.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
    or
    ```bash
    git checkout -b bugfix/issue-description
    ```
4.  **Make your changes**, ensuring they adhere to the project's coding style.
5.  **Test your changes** thoroughly.
6.  **Commit your changes** with a clear and descriptive message:
    ```bash
    git commit -m "feat: Add new feature X"
    # or
    git commit -m "fix: Resolve bug Y"
    ```
7.  **Push your branch** to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
8.  **Open a Pull Request** against the `main` branch of the original repository, describing your changes and their purpose.

## License

This project is licensed under the MIT License. A `LICENSE` file is not provided in the given project files, but typically accompanies open-source projects.
