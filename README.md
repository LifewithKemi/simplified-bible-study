# ✝ Simplified Bible Study

A beautiful, AI-powered Bible study website that lets anyone search any life topic and instantly receive:
- **4 relevant scriptures** from across the entire Bible
- **5 Bible translations** per verse: NKJV, AMP, TPT, MSG, NLT
- **Full study guide** per scripture:
  - Simple Breakdown (plain-language explanation)
  - Historical Context
  - Teaching Truth (pastoral insight)
  - 5 Reflection Questions
  - Practical Exercise
  - Personal Prayer (always ends: *In Jesus' Name, Amen*)

---

## Project Structure

```
simplified-bible-study/
├── index.html              # Entry point
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel deployment config
├── public/
│   └── cross.svg           # Favicon
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── api.js              # Anthropic API calls
    ├── index.css           # All styles
    └── components/
        ├── ScriptureCard.jsx   # Scripture display card
        └── Icons.jsx           # SVG icon components
```

---

## Step-by-Step: How to Launch This Website

### STEP 1 — Get Your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up or log in
3. Click **"API Keys"** in the left menu
4. Click **"Create Key"** — give it a name like "Bible Study App"
5. **Copy the key** (starts with `sk-ant-...`) — you only see it once!

> ⚠️ Keep your API key secret. Never share it publicly.

---

### STEP 2 — Set Up the Project on Your Computer

You'll need **Node.js** installed. Download it at https://nodejs.org (choose the LTS version).

Once Node.js is installed:

1. **Open a terminal** (Mac: search "Terminal", Windows: search "Command Prompt" or use Git Bash)
2. **Navigate to this project folder:**
   ```bash
   cd path/to/simplified-bible-study
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

---

### STEP 3 — Add Your API Key

Open the file `src/api.js` in a text editor (like VS Code, Notepad++, or even Notepad).

Find this line near the top:
```javascript
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
```

Add your API key like this:
```javascript
const ANTHROPIC_API_KEY = 'sk-ant-YOUR-KEY-HERE'
```

Then update the fetch call headers to include:
```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-calls': 'true'
},
```

> **Note:** The current setup works when deployed on a platform that handles CORS. For local development, you may need to add these headers.

---

### STEP 4 — Test Locally

```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

The website should load and you can test a search!

---

### STEP 5 — Deploy to GitHub Pages (Free)

GitHub Pages hosts your site for free at `https://YOUR-USERNAME.github.io/simplified-bible-study/`

#### 5a — Create a GitHub account
Go to https://github.com and sign up for a free account if you don't have one.

#### 5b — Create a new repository
1. Click the **"+"** icon in the top right → **"New repository"**
2. Name it exactly: `simplified-bible-study`
3. Set it to **Public**
4. Do NOT check "Add a README" (you already have one)
5. Click **"Create repository"**

#### 5c — Install Git on your computer
Download from https://git-scm.com/downloads and install it.

#### 5d — Push your code to GitHub
Open a terminal in your project folder and run these commands one at a time:
```bash
git init
git add .
git commit -m "Launch Simplified Bible Study"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/simplified-bible-study.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your actual GitHub username.

#### 5e — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** (tab at the top)
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. Click **Save**

#### 5f — Watch it deploy automatically
1. Click the **"Actions"** tab in your repository
2. You'll see a workflow called **"Deploy to GitHub Pages"** running
3. Wait about 2 minutes for it to finish (green checkmark = done!)
4. Your site is now live at:
   **`https://YOUR-USERNAME.github.io/simplified-bible-study/`**

#### Every future update
Whenever you change any code, just run:
```bash
git add .
git commit -m "Update description here"
git push
```
GitHub automatically rebuilds and redeploys your site within 2 minutes.

---

### STEP 6 — Secure Your API Key with GitHub Secrets

You should NOT leave your API key written directly in `src/api.js` — anyone can view your source code. GitHub Secrets keeps it hidden and injects it only during the build.

#### 6a — Add your key as a GitHub Secret
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `VITE_ANTHROPIC_API_KEY`
5. Value: your `sk-ant-...` key
6. Click **"Add secret"**

#### 6b — Update `src/api.js` to read from environment
Replace your hardcoded key with:
```javascript
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY
```

#### 6c — Update `.github/workflows/deploy.yml` to inject it
Find the `Build site` step and change it to:
```yaml
      - name: Build site
        run: npm run build
        env:
          VITE_ANTHROPIC_API_KEY: ${{ secrets.VITE_ANTHROPIC_API_KEY }}
```

Now your key is never in your code — GitHub injects it securely at build time only.

---

## Getting a Custom Domain

1. Buy a domain at:
   - **Namecheap** (https://namecheap.com) — affordable
   - **Google Domains** (https://domains.google)
   - **GoDaddy** (https://godaddy.com)

2. Common name ideas:
   - simplifiedbiblestudy.com
   - thesimplifiedword.com
   - searchtheword.org
   - mybiblesearch.com

3. After purchase, follow your hosting platform's DNS instructions (Netlify and Vercel both have guides).

---

## Customizing the Website

### Change the color scheme
Open `src/index.css` and edit the `:root` variables at the top:
```css
:root {
  --gold: #C9A84C;      /* Main accent color */
  --deep: #0F0D0A;      /* Background */
  --text: #F5EDD8;      /* Main text color */
}
```

### Add more popular topics
Open `src/App.jsx` and find the `POPULAR_TOPICS` array — add any topic you want.

### Change the site name
Edit `index.html` (the `<title>` tag) and update the header in `src/App.jsx`.

---

## Questions?

This site was built with:
- **React** (frontend framework)
- **Vite** (build tool)
- **Claude AI** (Anthropic) for scripture search and study guides
- **Google Fonts** (Cormorant Garamond + DM Sans)

For help, visit https://docs.anthropic.com or search YouTube for "deploy React Vite Netlify" for video walkthroughs.

---

*"Your word is a lamp to my feet and a light to my path." — Psalm 119:105 (NKJV)*
