import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { legacyScripts } from '../data/legacyScripts.js';

const INTERNAL_HTML_LINK = /^(?:\.\/)?([A-Za-z0-9_-]+\.html)(.*)?$/;
const INTERNAL_CLEAN_LINK = /^\/(?:[A-Za-z0-9_-]+)?(?:[?#].*)?$/;

function exposeDeclaredFunctions(code) {
  const names = [...code.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(match => match[1]);
  if (!names.length) return '';
  const entries = names.map(name => `${JSON.stringify(name)}: typeof ${name} !== 'undefined' ? ${name} : window[${JSON.stringify(name)}]`);
  return `\nObject.assign(window, { ${entries.join(', ')} });`;
}

function runPageScript(code, label) {
  const wrapped = `\n(function(){\n${code}\n${exposeDeclaredFunctions(code)}\n})();\n//# sourceURL=${label}`;
  try {
    // Keep page-level const/let declarations isolated while exposing onclick handlers.
    // eslint-disable-next-line no-new-func
    new Function(wrapped)();
  } catch (error) {
    console.error(`Error while running ${label}`, error);
  }
}

export default function StaticPage({ page }) {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const styleId = useMemo(() => `page-style-${page.slug}`, [page.slug]);

  useEffect(() => {
    document.title = page.title || 'C360 Innovation Lab';

    document.querySelectorAll('style[data-page-style="true"]').forEach(style => style.remove());
    if (page.styles) {
      const style = document.createElement('style');
      style.id = styleId;
      style.dataset.pageStyle = 'true';
      style.textContent = page.styles;
      document.head.appendChild(style);
    }

    requestAnimationFrame(() => {
      page.scripts.forEach((script, index) => {
        if (script.type === 'external') {
          const code = legacyScripts[script.src];
          if (code) runPageScript(code, `${page.filename}-${script.src}`);
          return;
        }
        runPageScript(script.code, `${page.filename}-inline-${index}.js`);
      });
    });

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, [location.pathname, page, styleId]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    function handleClick(event) {
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;

      const legacyMatch = href.match(INTERNAL_HTML_LINK);
      const cleanPath = legacyMatch
        ? `${legacyMatch[1] === 'index.html' ? '/' : `/${legacyMatch[1].replace(/\.html$/, '')}`}${legacyMatch[2] || ''}`
        : href;

      if (!legacyMatch && !INTERNAL_CLEAN_LINK.test(cleanPath)) return;

      event.preventDefault();
      navigate(cleanPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    root.addEventListener('click', handleClick);
    return () => root.removeEventListener('click', handleClick);
  }, [navigate]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: page.html }} />;
}
