import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout, { useToast } from './DashboardLayout.jsx';

const sources = [
  { title: 'Design Thinking Notes', type: 'PDF', meta: '12 highlights' },
  { title: 'Digital Skills Bootcamp', type: 'Course', meta: '6 modules' },
  { title: 'Pitch Deck Checklist', type: 'Guide', meta: '8 key ideas' },
  { title: 'Mentorship Session Recap', type: 'Transcript', meta: '14 insights' },
];

const suggestedQuestions = [
  'Summarize my current learning progress',
  'What should I study next?',
  'Create a pitch practice checklist',
];

const studyActions = ['Summarize', 'Quiz me', 'Make a study plan'];

const notes = [
  'Strong problem framing improves every solution discussion.',
  'Prototype tests should focus on one risky assumption at a time.',
  'A good pitch connects user pain, product value, and proof of traction.',
];

export default function LearnPage() {
  const navigate = useNavigate();
  const addToast = useToast();
  const [activeSource, setActiveSource] = useState(sources[0].title);
  const [activeAction, setActiveAction] = useState(studyActions[0]);
  const [lastQuestion, setLastQuestion] = useState('What should I study next?');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Learn - C360 Innovation Lab';
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  function submitPrompt(event) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setLastQuestion(prompt.trim());
    setPrompt('');
    addToast('Question submitted');
  }

  return (
    <DashboardLayout activePage="learn">
      {loading ? (
        <section className="learn-workspace" aria-label="Learning workspace skeleton">
          <aside className="learn-panel learn-sources-panel">
            <div className="learn-panel-header">
              <div className="skeleton" style={{ height: 20, width: '60%' }} />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="learn-source-card" style={{ border: 'none' }}>
                <div className="skeleton" style={{ width: 32, height: 32, borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 14, width: '70%', marginBottom: 4 }} />
                  <div className="skeleton" style={{ height: 11, width: '40%' }} />
                </div>
              </div>
            ))}
          </aside>
          <section className="learn-chat-panel">
            <div className="learn-hero-card" style={{ border: 'none' }}>
              <div className="skeleton" style={{ height: 28, width: '80%', marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '50%' }} />
            </div>
            <div className="learn-selected-source" style={{ border: 'none' }}>
              <div className="skeleton" style={{ height: 16, width: '40%' }} />
            </div>
            <div className="skeleton" style={{ height: 100, width: '100%', borderRadius: 12, marginTop: 16 }} />
          </section>
          <aside className="learn-panel learn-studio-panel">
            <div className="learn-panel-header">
              <div className="skeleton" style={{ height: 20, width: '50%' }} />
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="learn-studio-card" style={{ border: 'none' }}>
                <div className="skeleton" style={{ height: 16, width: '50%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '80%' }} />
              </div>
            ))}
          </aside>
        </section>
      ) : (
        <section className="learn-workspace" aria-label="Learning workspace">
          <aside className="learn-panel learn-sources-panel">
            <div className="learn-panel-header">
              <div>
                <span>Sources</span>
                <small>{sources.length} connected materials</small>
              </div>
              <button type="button" onClick={() => addToast('Upload feature coming soon')}>Add</button>
            </div>
            <div className="learn-upload-dropzone">
              <strong>Add source</strong>
              <p>Upload notes, links, PDFs, or transcripts.</p>
            </div>
            <div className="learn-source-list">
              {sources.map(({ title, type, meta }) => (
                <button
                  key={title}
                  type="button"
                  className={`learn-source-card${activeSource === title ? ' active' : ''}`}
                  onClick={() => setActiveSource(title)}
                >
                  <span>{type.slice(0, 1)}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{meta}</small>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="learn-chat-panel">
            <div className="learn-hero-card">
              <h1>Ask anything about your learning sources.</h1>
              <p>Select a source, ask a question, or generate summaries from your saved learning materials.</p>
            </div>

            <div className="learn-selected-source">
              <div>
                <span>Current Source</span>
                <strong>{activeSource}</strong>
              </div>
              <div className="learn-action-pills">
                {studyActions.map(action => (
                  <button
                    key={action}
                    type="button"
                    className={activeAction === action ? 'active' : undefined}
                    onClick={() => setActiveAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="learn-question-grid">
              {suggestedQuestions.map(question => (
                <button
                  key={question}
                  type="button"
                  onClick={() => {
                    setPrompt(question);
                    setLastQuestion(question);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="learn-chat-answer">
              <span>AI Study Partner</span>
              <strong>{lastQuestion}</strong>
              <p>
                Based on <em>{activeSource}</em>, I would start with a short summary, then turn
                the main points into practice questions. Your selected mode is <em>{activeAction}</em>,
                so the next response will be shaped for that task.
              </p>
            </div>

            <form className="learn-prompt-box" onSubmit={submitPrompt}>
              <input
                type="text"
                value={prompt}
                onChange={event => setPrompt(event.target.value)}
                placeholder="Ask about your sources..."
                aria-label="Ask about your sources"
              />
              <button type="submit">Ask</button>
            </form>
          </section>

          <aside className="learn-panel learn-studio-panel">
            <div className="learn-panel-header">
              <div>
                <span>Studio</span>
                <small>Create from selected source</small>
              </div>
              <button type="button" onClick={() => addToast('Create feature coming soon')}>Create</button>
            </div>
            <button type="button" className={`learn-studio-card${activeAction === 'Make a study plan' ? ' active' : ''}`} onClick={() => setActiveAction('Make a study plan')}>
              <strong>Study Guide</strong>
              <p>Generate a structured guide from the selected source.</p>
            </button>
            <button type="button" className={`learn-studio-card${activeAction === 'Summarize' ? ' active' : ''}`} onClick={() => setActiveAction('Summarize')}>
              <strong>Briefing Doc</strong>
              <p>Turn your notes into a concise summary.</p>
            </button>
            <button type="button" className={`learn-studio-card${activeAction === 'Quiz me' ? ' active' : ''}`} onClick={() => setActiveAction('Quiz me')}>
              <strong>Practice Quiz</strong>
              <p>Create quick questions from your current source.</p>
            </button>
            <div className="learn-note-stack">
              <span>Saved Notes</span>
              {notes.map(note => <p key={note}>{note}</p>)}
            </div>
          </aside>
        </section>
      )}
    </DashboardLayout>
  );
}
