**BeyondChats Assessment**

This repository contains the complete BeyondChats project, covering all three phases: Article Management (Laravel API), Automated Article Updates (NodeJS + LLM), and a ReactJS frontend to display original and updated articles.

**Phases**

**1\. Phase 1 - Laravel Backend API**

\- Provides REST API endpoints for articles:

\- \`GET /api/articles\` → Fetch all articles

\- \`POST /api/articles\` → Add new article

\- \`PUT /api/articles/:id\` → Update article

\- Stores articles with fields: \`id\`, \`title\`, \`content\`, \`source_url\`, \`references\`, \`created_at\`, \`updated_at\`.

\- Handles storing both original and AI-updated articles.

**2\. Phase 2 - NodeJS Automation**

\- NodeJS scripts to fetch the latest article and enhance it using AI.

\- Workflow:

1\. Fetch latest article from Laravel API.

2\. Search Google for related reference articles.

3\. Scrape reference articles for content.

4\. Rewrite original article using Groq LLM.

5\. Append references at the bottom of the article.

6\. Publish rewritten article back to Laravel API (creates new entry with \`(Updated)\` in the title).

\- Main scripts:

\- \`fetchLatestArticle.js\`

\- \`googleSearch.js\`

\- \`scrapeArticle.js\`

\- \`rewriteWithLLM.js\`

\- \`publishArticle.js\`

**3\. Phase 3 - ReactJS Frontend**

\- Built with ReactJS + Vite + TailwindCSS.

\- Features:

\- Fetch original and updated articles from Laravel API.

\- Display articles in responsive cards.

\- Modal to view full article content, supporting Markdown formatting.

\- Updated articles marked with an "Updated" badge.

**🏗 Architecture / Data Flow**

\[Original Articles - Laravel DB\]  
↓  
(Phase 2 Node Scripts)  
↓  
\[Updated Articles - Laravel DB\]  
↓  
\[Frontend React App\]

\- Node scripts act as a middleware between the backend and AI services to rewrite articles.

\- Frontend fetches both original and updated articles dynamically from Laravel API.

**⚙️ Local Setup Instructions**

### **Prerequisites**

- PHP >= 8.x, Composer
- MySQL or MariaDB
- Node.js >= 18, npm/yarn
- XAMPP or any local Apache + MySQL setup

⚠️ Make sure Apache and MySQL services are running from XAMPP before starting Laravel.

**Phase 1: Backend (Laravel)**

**1\. Clone the repo and navigate to backend folder:**

git clone <https://github.com/Nikunj-52147/BeyondChats-Assessment.git>

cd beyondchats/beyondchats-scraper

**2\. Install dependencies:**

composer install

**3\. Create .env file:**

APP_NAME=BeyondChats

APP_ENV=local

APP_KEY=base64:... // your app key

APP_DEBUG=true

APP_URL=<http://localhost:8000>

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=beyondchats

DB_USERNAME=root

DB_PASSWORD=

**4\. Generate app key and run migrations:**

php artisan key:generate

php artisan migrate

**5\. Serve the Laravel app:**

php artisan serve

**Phase 2: NodeJs Backend**

- **Navigate to phase2 folder**

cd beyondchats/phase2

npm install

- **Create a .env file with:**

LARAVEL_API=<http://127.0.0.1:8000/api>

SERP_API_KEY=your_serp_api

GROQ_API_KEY=your_grok_api

- **Run the backend:**

npm start

**Phase 3: ReactJS Frontend**

**1.Navigate to beyounchats-frontend folder**

cd beyondchats/beyondchats-frontend

npm install

**2\. Create .env with API URL:**

VITE_API_BASE=<http://127.0.0.1:8000/api>

**3\. Start the frontend:**

npm run dev

## **📝 Notes**

- Updated articles include a "References" section citing the scraped reference URLs.
- Original articles remain in the backend; updated articles are stored as new entries with (Updated) in the title.
- Frontend displays both original and updated articles with an "Updated" badge.  

### **🌐 Deployment**

Currently, the live deployment of the project is not available.  
All phases can be run locally following the setup instructions above.