import { useState } from 'react'
import { ChevronIcon } from './Icons.jsx'

const VERSIONS = ['NKJV', 'AMP', 'TPT', 'MSG', 'NLT']
const VERSION_KEY = { NKJV: 'nkjv', AMP: 'amp', TPT: 'tpt', MSG: 'msg', NLT: 'nlt' }

const STUDY_TABS = [
  { key: 'breakdown', label: 'Breakdown' },
  { key: 'context', label: 'Context' },
  { key: 'truth', label: 'Teaching Truth' },
  { key: 'reflect', label: '5 Reflections' },
  { key: 'exercise', label: 'Exercise' },
  { key: 'prayer', label: 'Prayer' },
]

export default function ScriptureCard({ scripture }) {
  const [activeVersion, setActiveVersion] = useState('NKJV')
  const [studyOpen, setStudyOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('breakdown')

  const verseText = scripture[VERSION_KEY[activeVersion]]

  return (
    <div className="scripture-card">
      <div className="card-header">
        <div className="card-reference">{scripture.reference}</div>
        <div className="card-verse">{verseText}</div>
        <div className="version-bar">
          {VERSIONS.map(v => (
            <button
              key={v}
              className={`version-tab ${activeVersion === v ? 'active' : ''}`}
              onClick={() => setActiveVersion(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="study-guide">
        <button
          className={`study-open-btn ${studyOpen ? 'open' : ''}`}
          onClick={() => setStudyOpen(!studyOpen)}
        >
          <span>Open Study Guide</span>
          <ChevronIcon className="chevron" style={{ width: 16, height: 16 }} />
        </button>

        <div className={`study-body ${studyOpen ? 'open' : ''}`}>
          <div className="study-nav">
            {STUDY_TABS.map(tab => (
              <button
                key={tab.key}
                className={`study-nav-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="study-panel">
            {activeTab === 'breakdown' && (
              <>
                <h3>Simple Breakdown</h3>
                <p>{scripture.breakdown}</p>
              </>
            )}

            {activeTab === 'context' && (
              <>
                <h3>Historical Context</h3>
                <p>{scripture.context}</p>
              </>
            )}

            {activeTab === 'truth' && (
              <>
                <h3>Teaching Truth</h3>
                <div className="truth-box">{scripture.teaching_truth}</div>
              </>
            )}

            {activeTab === 'reflect' && (
              <>
                <h3>5 Reflection Questions</h3>
                <ol>
                  {scripture.reflection_questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </>
            )}

            {activeTab === 'exercise' && (
              <>
                <h3>Practical Exercise</h3>
                <div className="exercise-box">
                  <strong>This Week's Practice</strong>
                  {scripture.practical_exercise}
                </div>
              </>
            )}

            {activeTab === 'prayer' && (
              <>
                <h3>Prayer</h3>
                <div className="prayer-box">{scripture.prayer}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
