📰 NewsMania – News Aggregator Web Application

NewsMania is a high-performance, full-stack news aggregator that delivers real-time global headlines through a sleek, responsive interface. Built with the MERN stack (MongoDB, Express, React, Node), it features secure JWT-based authentication and restricted premium features like deep-search functionality.
<hr>

🚀 Features

<ul>
<li>📰 Top Headlines</li>
Displays the latest news headlines from multiple channels.<br></br>

<li>📂 Category-Based News</li>
Users can browse news by categories such as Technology, Business, Sports, Entertainment, etc.<br></br>

<li>🔍 Gated Search Functionality</li>
An advanced search feature restricted to registered users via backend middleware protection.<br></br>

<li>⚡ Real-Time News Fetching</li>
Seamless integration with third-party News APIs to provide the latest breaking news.<br></br>

<li>🧠 Dynamic Rendering</li>
DOM-based dynamic rendering updates news content without reloading the page.<br></br>

<li>🔐 Secure Membership</li>
Complete authentication system using JSON Web Tokens (JWT) and HttpOnly Cookies to protect user sessions.<br></br>

<li>🛡️ Password-Protected Account Actions</li>
High-stakes operations (such as account deletion or profile updates) require secondary password verification using Bcrypt re-authentication to prevent unauthorized changes.

<li>📱 Fully Responsive Design</li>
A fully responsive design featuring Dark Mode, smooth transitions, and mobile-optimized navigation built with Tailwind CSS.
</ul>
<hr>

🛠️ Tech Stack
<ul>
<li>Frontend – React.js, Vite, Tailwind CSS, Lucide Icons / svg</li>
<li>Backend – Node.js, Express.js</li>
<li>Database – MongoDB, Mongoose</li>
<li>Auth – JWT (JSON Web Tokens), Cookie-Parser, Bcrypt.js</li>
</ul>
<hr>

🔑 Environment Variables

Create a .env file in the root directory and add your API key:

    NEWS_API_KEY=your_api_key_here
⚠️ Make sure .env is included in .gitignore to keep your API key secure.
<hr>

📦 Installation

Clone the repository:

    git clone https://github.com/topperguy7/NewsMania.git
Navigate to the project folder:

        cd NewsMania
Install dependencies:

        npm install
Start the development server:

        npm run dev
<hr>

## 🖼️ Preview

![App Screenshot](Screenshot-1.png)
<hr>

📄 License

This project is open-source and available under the MIT License.
