<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Kampus-Life — README</title>
<style>
  :root{
    --bg:#0f1113;
    --panel:#151617;
    --muted:#9aa0a6;
    --accent:#7dd3fc;
    --accent-2:#60a5fa;
    --glass: rgba(255,255,255,0.03);
    --card: #0b0c0d;
    --success: #16a34a;
    --danger: #ef4444;
    --white: #ffffff;
  }
  html,body{height:100%}
  body{
    margin:0;
    font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial;
    background: linear-gradient(180deg,#070708 0%, #0f1113 100%);
    color:var(--white);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    line-height:1.5;
    padding:32px;
  }
  .container{max-width:1000px;margin:0 auto;}
  header{display:flex;gap:18px;align-items:center;margin-bottom:18px}
  .logo{
    width:72px;height:72px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent-2));
    display:flex;align-items:center;justify-content:center;font-weight:700;color:#05263a;font-size:20px;
    box-shadow: 0 8px 30px rgba(3,7,18,0.6), inset 0 -6px 30px rgba(255,255,255,0.03);
  }
  h1{font-size:22px;margin:0}
  p.lead{color:var(--muted);margin:6px 0 0 0}
  .badges{margin-left:auto;display:flex;gap:8px;align-items:center}
  .badge{background:var(--glass);padding:6px 10px;border-radius:8px;font-size:12px;color:var(--muted)}
  nav.toc{display:flex;gap:8px;flex-wrap:wrap;margin:20px 0}
  nav.toc a{color:var(--accent);text-decoration:none;font-size:13px;padding:6px 10px;border-radius:8px;background:rgba(125,211,252,0.04)}
  section.card{background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);border-radius:12px;padding:18px;margin:18px 0;box-shadow: 0 6px 18px rgba(1,2,3,0.6)}
  .muted{color:var(--muted);font-size:14px}
  .grid{display:grid;grid-template-columns:1fr 320px;gap:18px}
  .screenshot{height:220px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#060606;border:1px solid rgba(255,255,255,0.03)}
  .screenshot img{max-width:100%;max-height:100%;display:block}
  .carousel{position:relative}
  .carousel-controls{display:flex;gap:8px;justify-content:center;margin-top:10px}
  .btn{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:8px;color:var(--white);cursor:pointer}
  .btn:hover{transform:translateY(-2px)}
  pre.env{background:#060607;padding:12px;border-radius:8px;color:#cbd5e1;overflow:auto;border:1px solid rgba(255,255,255,0.03)}
  .copy-row{display:flex;align-items:center;gap:10px;margin-top:8px}
  .copy-btn{background:linear-gradient(90deg,var(--accent),var(--accent-2));border:none;color:#042a37;padding:8px 12px;border-radius:8px;cursor:pointer}
  details{background:transparent;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.02);margin-top:10px}
  summary{cursor:pointer;font-weight:600}
  ul.checklist{list-style:none;padding:0;margin:8px 0}
  ul.checklist li{padding:8px 0;border-bottom:1px dashed rgba(255,255,255,0.02);display:flex;justify-content:space-between;align-items:center}
  .chip{background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:999px;font-size:13px;color:var(--muted)}
  code.inline{background:rgba(255,255,255,0.03);padding:3px 6px;border-radius:6px;font-size:13px}
  .footer{display:flex;justify-content:space-between;align-items:center;margin-top:20px;color:var(--muted);font-size:13px}
  .side-panel{position:sticky;top:28px}
  .file-tree{font-family:monospace;white-space:pre;font-size:13px;color:var(--muted);background:rgba(255,255,255,0.01);padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.02)}
  .link{color:var(--accent);text-decoration:none}
  .kbd{background:rgba(255,255,255,0.03);padding:6px 8px;border-radius:6px;font-weight:600}
  .pill{background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:8px}
  .actions{display:flex;gap:10px}
  .small{font-size:13px;color:var(--muted)}
  @media (max-width:900px){
    .grid{grid-template-columns:1fr; }
    .side-panel{position:static;margin-top:14px}
  }
</style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">KL</div>
      <div>
        <h1>Kampus-Life</h1>
        <p class="lead">A campus management dashboard — teachers, students & routines. Dark theme, responsive UI.</p>
      </div>
      <div class="badges">
        <div class="badge">frontend: React</div>
        <div class="badge">backend: Node/Express</div>
        <div class="badge">db: MongoDB</div>
      </div>
    </header>

    <nav class="toc" aria-label="Table of contents">
      <a href="#about">About</a>
      <a href="#demo">Demo</a>
      <a href="#built-with">Built With</a>
      <a href="#getting-started">Getting Started</a>
      <a href="#env">Environment</a>
      <a href="#structure">Folder Structure</a>
      <a href="#features">Features</a>
      <a href="#roadmap">Roadmap</a>
      <a href="#contributing">Contributing</a>
      <a href="#license">License</a>
      <a href="#contact">Contact</a>
    </nav>

    <section id="about" class="card">
      <h2>About</h2>
      <p class="muted">Kampus-Life is a management dashboard for campus activities. It provides CRUD operations for teachers, students and class routines, quick search by roll number, and a responsive dark UI optimized for desktop.</p>
      <div style="margin-top:12px" class="small">Repo: <a class="link" href="https://github.com/Aritra-Chats/Kampus-Life.git">github.com/Aritra-Chats/Kampus-Life</a></div>
    </section>

    <div class="grid">
      <main>
        <section id="demo" class="card">
          <h2>Demo & Screenshots</h2>
          <div class="carousel">
            <div class="screenshot" id="screenshot">
              <!-- Replace src with your real screenshots -->
              <img id="carousel-image" src="https://via.placeholder.com/800x400?text=Screenshot+1" alt="screenshot 1">
            </div>
            <div class="carousel-controls">
              <button class="btn" id="prev">Prev</button>
              <button class="btn" id="next">Next</button>
            </div>
          </div>
          <p class="muted" style="margin-top:10px">Tip: replace placeholder images with your actual screenshots under <code class="inline">/frontend/public/screenshots</code> or update the image URLs below in the HTML.</p>
        </section>

        <section id="built-with" class="card">
          <h2>Built With</h2>
          <ul class="small">
            <li>React + Context API</li>
            <li>Node.js + Express</li>
            <li>MongoDB / Mongoose</li>
            <li>Plain CSS (dark theme)</li>
            <li>Material Icons</li>
          </ul>
        </section>

        <section id="getting-started" class="card">
          <h2>Getting Started</h2>
          <h3 class="small">Prerequisites</h3>
          <ul class="small">
            <li>Node.js (v14+)</li>
            <li>npm or yarn</li>
            <li>MongoDB running (local or Atlas)</li>
          </ul>

          <h3 class="small" style="margin-top:12px">Installation</h3>
          <pre class="env"># clone
git clone https://github.com/Aritra-Chats/Kampus-Life.git
cd Kampus-Life

# install frontend
cd frontend && npm install

# install backend
cd ../backend && npm install
          </pre>

          <details>
            <summary>Run locally (development)</summary>
            <div style="margin-top:8px" class="small">
              Backend:
              <pre class="small">cd backend
npm run dev</pre>
              Frontend:
              <pre class="small">cd frontend
npm start</pre>
            </div>
          </details>
        </section>

        <section id="env" class="card">
          <h2>Environment Variables</h2>
          <p class="small muted">Create a <code class="inline">.env</code> at the project root (or separate for frontend/backend) and add:</p>
          <pre class="env" id="env-snippet">
REACT_APP_API_URL=http://localhost:4000
MONGO_URI=mongodb://localhost:27017/kampus-life
JWT_SECRET=replace_this_secret
PORT=4000
          </pre>
          <div class="copy-row">
            <button class="copy-btn" data-copy-target="env-snippet">Copy .env snippet</button>
            <div class="small muted">Remember: do <strong>NOT</strong> commit secrets to public repos.</div>
          </div>
        </section>

        <section id="structure" class="card">
          <h2>Folder Structure</h2>
          <div class="file-tree">
/backend
  /controllers
  /models
  /routes
  server.js

/frontend
  /public
  /src
    /components
    /context
    /styles
    App.js

README.html
          </div>
        </section>

        <section id="features" class="card">
          <h2>Features</h2>
          <ul class="checklist">
            <li>Navigate tabs — Teacher/Student/Routines <span class="chip">Done</span></li>
            <li>Search by roll number <span class="chip">Done</span></li>
            <li>Delete records from UI <span class="chip">Done</span></li>
            <li>Upload CSV (planned) <span class="chip">Planned</span></li>
          </ul>
        </section>

        <section id="roadmap" class="card">
          <h2>Roadmap</h2>
          <ul class="small">
            <li>Authentication & roles (admin)</li>
            <li>Bulk import via CSV/Excel</li>
            <li>Export lists (CSV / PDF)</li>
            <li>Light / dark theme toggle</li>
            <li>Unit & integration tests</li>
          </ul>
        </section>

        <section id="contributing" class="card">
          <h2>Contributing</h2>
          <p class="small">Contributions welcome. Suggested workflow:</p>
          <ol class="small">
            <li>Fork the repository</li>
            <li>Create a feature branch <code class="inline">git checkout -b feature/your-feature</code></li>
            <li>Commit changes & push</li>
            <li>Open a Pull Request</li>
          </ol>
          <details>
            <summary>PR template (click to copy)</summary>
            <pre class="env" id="pr-template">
## Summary
What does this change do?

## Related issue / PR
Link:

## Changes
- List of changes

## Notes
Anything reviewers should know
            </pre>
            <div style="margin-top:8px">
              <button class="copy-btn" data-copy-target="pr-template">Copy PR template</button>
            </div>
          </details>
        </section>

        <section id="license" class="card">
          <h2>License</h2>
          <p class="small">Distributed under the MIT License. See <code class="inline">LICENSE</code> for details.</p>
        </section>

        <section id="contact" class="card">
          <h2>Contact</h2>
          <div class="small">
            Maintainer: <strong>Aritra Chatterjee</strong><br>
            Email: <a class="link" href="mailto:your_email@example.com">your_email@example.com</a><br>
            Repo: <a class="link" href="https://github.com/Aritra-Chats/Kampus-Life.git">github.com/Aritra-Chats/Kampus-Life</a>
          </div>
        </section>

        <div class="footer">
          <div>Made with ❤️ • <span class="small muted">Kampus-Life</span></div>
          <div class="small muted">Last updated: <span id="updated">—</span></div>
        </div>
      </main>

      <aside class="side-panel">
        <section class="card">
          <h3>Quick actions</h3>
          <div style="margin-top:8px" class="actions">
            <a class="btn" href="https://github.com/Aritra-Chats/Kampus-Life.git" target="_blank">Open repo</a>
            <button class="btn" id="open-issues">Issues</button>
          </div>
          <div style="margin-top:12px" class="small muted">Useful commands</div>
          <pre class="small" style="margin-top:8px">npm run dev (backend)
npm start (frontend)</pre>
        </section>

        <section class="card" style="margin-top:16px">
          <h3>Quick file tree</h3>
          <div class="file-tree">
/frontend
  /src/components/Search.js
  /src/components/currentDetails.js
  /src/context/functionsContext.js
  /src/styles/activities.css
          </div>
        </section>
      </aside>
    </div>
  </div>

<script>
  // small utils
  const images = [
    "https://via.placeholder.com/800x400?text=Screenshot+1",
    "https://via.placeholder.com/800x400?text=Screenshot+2",
    "https://via.placeholder.com/800x400?text=Screenshot+3"
  ];
  let idx = 0;
  const imgEl = document.getElementById("carousel-image");
  document.getElementById("prev").addEventListener("click", ()=> {
    idx = (idx - 1 + images.length) % images.length;
    imgEl.src = images[idx];
  });
  document.getElementById("next").addEventListener("click", ()=> {
    idx = (idx + 1) % images.length;
    imgEl.src = images[idx];
  });

  // copy to clipboard for code blocks
  document.querySelectorAll(".copy-btn").forEach(btn=>{
    btn.addEventListener("click", async ()=> {
      const target = document.getElementById(btn.dataset.copyTarget);
      if(!target) return;
      try {
        const text = target.innerText;
        await navigator.clipboard.writeText(text);
        btn.innerText = "Copied ✓";
        setTimeout(()=> btn.innerText = "Copy .env snippet", 1500);
      } catch(e){
        btn.innerText = "Copy failed";
        setTimeout(()=> btn.innerText = "Copy .env snippet", 1500);
      }
    });
  });

  // "Issues" quick open
  document.getElementById("open-issues").addEventListener("click", ()=> {
    window.open("https://github.com/Aritra-Chats/Kampus-Life/issues", "_blank");
  });

  // show updated date
  document.getElementById("updated").innerText = new Date().toLocaleDateString();

  // enable internal anchor smooth scrolling
  document.querySelectorAll('nav.toc a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
</script>
</body>
</html>
