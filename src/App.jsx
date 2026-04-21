import { useState, useRef } from 'react'
import { CrossIcon, BookIcon } from './components/Icons.jsx'
import ScriptureCard from './components/ScriptureCard.jsx'
import { searchScriptures } from './api.js'

const POPULAR_TOPICS = [
  'Fear & Anxiety', 'Healing & Restoration', "God's Love", 'Forgiveness',
  'Finding Strength', 'Grief & Loss', 'Marriage', "God's Provision",
  'Identity in Christ', 'Depression', 'Loneliness', 'Purpose & Calling',
  'Trusting God', 'Overcoming Addiction', 'Parenting', 'Salvation',
]

export default function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [submitTopic, setSubmitTopic] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const resultsRef = useRef(null)

  async function handleSearch(topic) {
    const searchTerm = topic || query.trim()
    if (!searchTerm) return
    setQuery(searchTerm)
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const data = await searchScriptures(searchTerm)
      setResults(data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError('Something went wrong searching the scriptures. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!submitTopic.trim()) return
    handleSearch(submitTopic)
    setSubmitTopic('')
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 4000)
  }

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <a className="header-logo" href="/" onClick={() => { setResults(null); setQuery(''); }}>
          <CrossIcon className="header-cross" />
          <span className="header-title">The Soft Life <span>Bible</span> Study</span>
        </a>
        <nav>
          <ul className="header-nav">
            <li><a href="#search">Search</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#submit">Submit Topic</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      {!results && !loading && (
        <section className="hero" id="about">
          <div className="hero-eyebrow">The Word for Every Season</div>
          <h1 className="hero-title">
            What is God<br />saying to you <em>today?</em>
          </h1>
          <p className="hero-subtitle">
            Search any topic you're facing — fear, healing, grief, relationships, purpose —
            and discover the scriptures that speak directly to it, with full study guides
            in five Bible versions.
          </p>
        </section>
      )}

      {/* SEARCH */}
      <div id="search" style={{ maxWidth: 680, margin: '0 auto', padding: '0 2rem' }}>
        <div className="search-container">
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="e.g. I'm struggling with anxiety and fear..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="search-btn"
              onClick={() => handleSearch()}
              disabled={loading || !query.trim()}
            >
              {loading ? 'Searching...' : 'Search the Word'}
            </button>
          </div>
          {error && <div className="error-toast">{error}</div>}
        </div>

        {!results && !loading && (
          <div className="topics-section">
            <div className="topics-label">Search by topic</div>
            <div className="topics-list">
              {POPULAR_TOPICS.map(t => (
                <button key={t} className="topic-pill" onClick={() => handleSearch(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-state">
          <CrossIcon className="loading-cross" />
          <div className="loading-text">Searching the Word...</div>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <section className="results-section" ref={resultsRef}>
          <div className="results-header">
            <h2 className="results-title">
              Scriptures for <span>"{results.topic}"</span>
            </h2>
            <span className="results-count">{results.scriptures.length} verses found</span>
          </div>

          {results.scriptures.map((s, i) => (
            <ScriptureCard key={i} scripture={s} />
          ))}
        </section>
      )}

      {/* EMPTY STATE */}
      {!results && !loading && query === '' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
          {/* already handled by hero + topics */}
        </div>
      )}

      {/* SUBMIT SECTION */}
      <section className="submit-section" id="submit">
        <div className="submit-card">
          <h3>Don't see your topic?</h3>
          <p>
            If you're going through something specific and can't find scriptures for it,
            type your topic below and we'll search the Word for you right now.
          </p>
          {submitSuccess && (
            <p style={{ color: '#5DB09A', fontSize: 13, marginBottom: 12 }}>
              ✓ Searching for your topic now...
            </p>
          )}
          <form className="submit-input-row" onSubmit={handleSubmit}>
            <input
              className="submit-input"
              type="text"
              placeholder="Your topic or life situation..."
              value={submitTopic}
              onChange={e => setSubmitTopic(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              Find Scriptures →
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          The Soft Life Bible Study · Built to bring God's Word closer to everyday life<br />
          Scripture versions: NKJV · AMP · TPT · MSG · NLT<br />
          <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>
            Copyright 2026 · Powered by The SoftLife with Kemi · Always verify scriptures with your own Bible
          </span>
        </p>
      </footer>
    </div>
  )
}
