import React, { useMemo, useState } from 'react';
import { c360Labs, c360Projects, networkCategories } from '../data/pillars.js';
import './directoryPanel.css';

function matchesQuery(text, query) {
  return text.toLowerCase().includes(query.trim().toLowerCase());
}

export default function DirectoryPanel({ config }) {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const labs = useMemo(() => {
    if (config.kind !== 'labs') return [];
    return c360Labs.filter((lab) =>
      !query.trim()
      || matchesQuery(`${lab.name} ${lab.type} ${lab.region} ${lab.focus}`, query),
    );
  }, [config.kind, query]);

  const projects = useMemo(() => {
    if (config.kind !== 'projects') return [];
    if (!query.trim()) return c360Projects;
    return c360Projects
      .map((project) => ({
        ...project,
        items: project.items.filter((item) =>
          matchesQuery(`${project.title} ${project.summary} ${item.name} ${item.body}`, query),
        ),
      }))
      .filter(
        (project) =>
          project.items.length > 0 || matchesQuery(`${project.title} ${project.summary}`, query),
      )
      .map((project) => ({
        ...project,
        items:
          project.items.length > 0
            ? project.items
            : c360Projects.find((entry) => entry.id === project.id)?.items || [],
      }));
  }, [config.kind, query]);

  const network = useMemo(() => {
    if (config.kind !== 'network') return [];
    return networkCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            !query.trim()
            || matchesQuery(`${category.label} ${item.name} ${item.detail}`, query),
        ),
      }))
      .filter((category) => category.items.length > 0 || !query.trim());
  }, [config.kind, query]);

  return (
    <section className="directory-panel" aria-label={config.title}>
      <div className="directory-panel-head">
        <div>
          <p className="directory-panel-kicker">Search</p>
          <h2>{config.title}</h2>
        </div>
        <label className="directory-panel-search">
          <span className="sr-only">{config.placeholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={config.placeholder}
            autoComplete="off"
          />
        </label>
      </div>

      {config.kind === 'labs' && (
        <ul className="directory-list">
          {labs.length === 0 && <li className="directory-empty">No labs match that search.</li>}
          {labs.map((lab) => (
            <li key={lab.name}>
              <article className="directory-card">
                <header>
                  <h3>{lab.name}</h3>
                  <span>{lab.type}</span>
                </header>
                <p className="directory-meta">{lab.region}</p>
                <p>{lab.focus}</p>
              </article>
            </li>
          ))}
        </ul>
      )}

      {config.kind === 'projects' && (
        <div className="directory-accordions">
          {projects.length === 0 && <p className="directory-empty">No projects match that search.</p>}
          {projects.map((project) => {
            const isOpen = openId === project.id || Boolean(query.trim());
            return (
              <div className={`directory-accordion${isOpen ? ' is-open' : ''}`} key={project.id}>
                <button
                  type="button"
                  className="directory-accordion-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId((current) => (current === project.id ? null : project.id))}
                >
                  <span>{project.title}</span>
                  <em>{project.items.length}</em>
                </button>
                {isOpen && (
                  <div className="directory-accordion-body">
                    <p className="directory-summary">{project.summary}</p>
                    <ul>
                      {(project.items.length
                        ? project.items
                        : c360Projects.find((p) => p.id === project.id)?.items || []
                      ).map((item) => (
                        <li key={item.name}>
                          <strong>{item.name}</strong>
                          <p>{item.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {config.kind === 'network' && (
        <div className="directory-accordions">
          {network.length === 0 && <p className="directory-empty">No network entries match that search.</p>}
          {network.map((category) => {
            const isOpen = openId === category.id || Boolean(query.trim());
            return (
              <div className={`directory-accordion${isOpen ? ' is-open' : ''}`} key={category.id}>
                <button
                  type="button"
                  className="directory-accordion-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId((current) => (current === category.id ? null : category.id))}
                >
                  <span>{category.label}</span>
                  <em>{category.items.length}</em>
                </button>
                {isOpen && (
                  <div className="directory-accordion-body">
                    <ul>
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <strong>{item.name}</strong>
                          <p>{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
