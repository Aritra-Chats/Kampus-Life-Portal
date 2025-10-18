<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kampus-Life — README</title>

  <style>
    :root {
      --bg: #0e1012;
      --panel: #151617;
      --accent: #60a5fa;
      --accent-2: #7dd3fc;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --shadow: rgba(0, 0, 0, 0.4);
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: "Inter", "Segoe UI", sans-serif;
      background: radial-gradient(circle at 20% 20%, #111317, #0b0c0f);
      color: var(--text);
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      line-height: 1.6;
      animation: fadeIn 0.8s ease-out both;
    }

    header {
      text-align: center;
      padding: 60px 20px 30px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #000;
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 5px var(--shadow);
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    section {
      background: var(--panel);
      margin: 20px auto;
      padding: 25px 30px;
      border-radius: 16px;
      max-width: 950px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
      transform: translateY(20px);
      opacity: 0;
      animation: fadeUp 0.8s ease forwards;
    }

    section:nth-of-type(1) { animation-delay: 0.1s; }
    section:nth-of-type(2) { animation-delay: 0.25s; }
    section:nth-of-type(3) { animation-delay: 0.4s; }
    section:nth-of-type(4) { animation-delay: 0.55s; }

    h2 {
      color: var(--accent-2);
      border-bottom: 1px solid var(--accent);
      padding-bottom: 6px;
      font-size: 1.5rem;
      transition: color 0.3s ease;
    }

    h2:hover {
      color: var(--accent);
    }

    code, pre {
      background: #1b1e22;
      border-radius: 10px;
      color: #93c5fd;
      font-family: "Fira Code", monospace;
    }

    pre {
      padding: 15px;
      overflow-x: auto;
      box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.4);
      transition: transform 0.2s ease;
    }

    pre:hover {
      transform: scale(1.01);
    }

    a {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    a:hover {
      color: var(--accent-2);
      text-decoration: underline;
    }

    details {
      background: rgba(255, 255, 255, 0.04);
      padding: 15px;
      border-radius: 12px;
      margin-top: 10px;
      transition: all 0.3s ease;
    }

    summary {
      cursor: pointer;
      font-weight: 600;
      color: var(--accent);
    }

    details[open] {
      background: rgba(255, 255, 255, 0.08);
    }

    ul li {
      margin-bottom: 6px;
    }

    footer {
      text-align: center;
      padding: 25px;
      color: var(--muted);
      font-size: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 40px;
    }

    .badges img {
      height: 26px;
      margin-right: 8px;
      transition: transform 0.3s ease;
    }

    .badges img:hover {
      transform: scale(1.2);
    }

    .preview-img {
      width: 100%;
      border-radius: 12px;
      margin-top: 15px;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .preview-img:hover {
      transform: scale(1.02);
      box-shadow: 0 0 25px rgba(96, 165, 250, 0.5);
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
</head>

<body>
  <header>🎓 Kampus-Life</header>

  <section>
    <div class="badges">
      <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React" />
      <img src="https://img.shields.io/badge/Express.js-Backend-green?logo=express" alt="Express" />
      <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" alt="MongoDB" />
      <img src="https://img.shields.io/badge/Node.js-Runtime-success?logo=node.js" alt="Node.js" />
    </div>
    <p><strong>Kampus-Life</strong> is a smart campus management dashboard designed for students, teachers, and admins to manage academics, routines, and activities with a modern, dark-themed interface. Built using the MERN stack for speed and scalability.</p>
  </section>

  <section>
    <h2>🚀 Features</h2>
    <ul>
      <li>Responsive dashboard with modular design</li>
      <li>Separate portals for Teachers, Students, and Admins</li>
      <li>Attendance tracking and schedule management</li>
      <li>Data visualization using charts</li>
      <li>RESTful API with JWT authentication</li>
    </ul>
  </section>

  <section>
    <h2>🧭 Setup Guide</h2>
    <details>
      <summary>Show Installation Steps</summary>
      <pre><code># Clone repository
git clone https://github.com/Aritra-Chats/Kampus-Life.git

# Navigate to directory
cd Kampus-Life

# Install dependencies
npm install

# Start local server
npm start
      </code></pre>
    </details>
  </section>

  <section>
    <h2>⚙️ Environment Setup</h2>
    <details>
      <summary>View Example .env File</summary>
      <pre><code>REACT_APP_API_URL=http://localhost:5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
PORT=5000
      </code></pre>
    </details>
  </section>

  <section>
    <h2>🧩 Tech Stack</h2>
    <ul>
      <li><strong>Frontend:</strong> React (Context API, Hooks)</li>
      <li><strong>Backend:</strong> Node.js + Express</li>
      <li><strong>Database:</strong> MongoDB + Mongoose</li>
      <li><strong>Styling:</strong> Tailwind CSS</li>
      <li><strong>Version Control:</strong> Git + GitHub</li>
    </ul>
  </section>

  <section>
    <h2>📸 Preview</h2>
    <img class="preview-img" src="screenshots/dashboard.png" alt="Dashboard Preview">
  </section>

  <footer>Made with ❤️ by Aritra Chatterjee —
    <a href="https://github.com/Aritra-Chats/Kampus-Life">View on GitHub</a>
  </footer>
</body>
</html>
