import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';
import App from '../src/App';
import fs from 'fs';
import path from 'path';

async function runAudit() {
  console.log('=== STARTING AUTOMATED ACCESSIBILITY & SEO AUDIT ===');

  // Read index.html
  const indexHtml = fs.readFileSync(path.resolve('./index.html'), 'utf8');

  // Render React App to static HTML string
  const appHtml = renderToString(React.createElement(App));

  // Insert appHtml into indexHtml #root
  const fullHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // Setup JSDOM
  const dom = new JSDOM(fullHtml, {
    url: 'http://localhost:3000/',
    runScripts: 'outside-only',
  });

  const { document } = dom.window;
  const window = dom.window;
  (global as any).window = window;
  (global as any).document = document;

  // 1. LIGHTHOUSE SEO AUDIT CHECKS
  console.log('\n--- LIGHTHOUSE SEO CHECKS ---');
  const seoChecks: { check: string; pass: boolean; details: string }[] = [];

  // Check 1: Document title
  const title = document.querySelector('title');
  const titleText = title?.textContent?.trim() || '';
  seoChecks.push({
    check: 'document-title',
    pass: !!titleText && titleText.length > 10,
    details: `Title: "${titleText}" (${titleText.length} chars)`,
  });

  // Check 2: Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  const descText = metaDesc?.getAttribute('content')?.trim() || '';
  seoChecks.push({
    check: 'meta-description',
    pass: !!descText && descText.length > 50,
    details: `Description: "${descText.substring(0, 70)}..." (${descText.length} chars)`,
  });

  // Check 3: Viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  const viewportContent = viewport?.getAttribute('content') || '';
  seoChecks.push({
    check: 'viewport',
    pass: viewportContent.includes('width=device-width'),
    details: `Viewport: "${viewportContent}"`,
  });

  // Check 4: Charset
  const charset = document.querySelector('meta[charset]');
  seoChecks.push({
    check: 'charset',
    pass: !!charset && (charset.getAttribute('charset')?.toLowerCase() === 'utf-8'),
    details: `Charset: "${charset?.getAttribute('charset')}"`,
  });

  // Check 5: HTML lang attribute
  const htmlLang = document.documentElement.getAttribute('lang');
  seoChecks.push({
    check: 'html-has-lang',
    pass: !!htmlLang && htmlLang.length >= 2,
    details: `Lang: "${htmlLang}"`,
  });

  // Check 6: Crawlable (no noindex)
  const robots = document.querySelector('meta[name="robots"]');
  const robotsContent = robots?.getAttribute('content') || '';
  seoChecks.push({
    check: 'is-crawlable',
    pass: !robotsContent.toLowerCase().includes('noindex'),
    details: `Robots: "${robotsContent || 'none (crawlable)'}"`,
  });

  // Check 7: Descriptive link text
  const links = Array.from(document.querySelectorAll('a'));
  const badLinks = links.filter((a) => {
    const text = (a.textContent || a.getAttribute('aria-label') || '').trim().toLowerCase();
    return !text || ['click here', 'here', 'more', 'link'].includes(text);
  });
  seoChecks.push({
    check: 'link-text',
    pass: badLinks.length === 0,
    details: `All ${links.length} links have descriptive text (${badLinks.length} bad)`,
  });

  // Check 8: Image alt attributes
  const images = Array.from(document.querySelectorAll('img'));
  const missingAlt = images.filter((img) => !img.hasAttribute('alt'));
  seoChecks.push({
    check: 'image-alt',
    pass: missingAlt.length === 0,
    details: `All ${images.length} images have alt attributes (${missingAlt.length} missing)`,
  });

  // Print SEO checks
  let seoPassed = 0;
  for (const c of seoChecks) {
    console.log(`[${c.pass ? 'PASS' : 'FAIL'}] ${c.check}: ${c.details}`);
    if (c.pass) seoPassed++;
  }
  const seoScore = Math.round((seoPassed / seoChecks.length) * 100);
  console.log(`Lighthouse SEO Score Equivalent: ${seoScore}/100 (${seoPassed}/${seoChecks.length} passed)`);

  // 2. LIGHTHOUSE / AXE-CORE ACCESSIBILITY AUDIT
  console.log('\n--- AXE-CORE / LIGHTHOUSE ACCESSIBILITY AUDIT ---');
  
  // Run axe-core inside JSDOM environment
  const axeResults = await axe.run(document.documentElement as any, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
  });

  console.log(`Violations: ${axeResults.violations.length}`);
  console.log(`Passes: ${axeResults.passes.length}`);
  for (const p of axeResults.passes) {
    console.log(`  Passed rule: ${p.id} (${p.description})`);
  }
  console.log(`Inapplicable: ${axeResults.inapplicable.length}`);
  console.log(`Incomplete: ${axeResults.incomplete.length}`);
  for (const inc of axeResults.incomplete) {
    console.log(`  Incomplete rule: ${inc.id} - ${inc.description}`);
    for (const node of inc.nodes) {
      console.log(`    Target: ${node.target.join(', ')}`);
      console.log(`    Summary: ${node.failureSummary}`);
    }
  }

  if (axeResults.violations.length > 0) {
    console.log('\n--- ACCESSIBILITY VIOLATIONS FOUND ---');
    for (const v of axeResults.violations) {
      console.log(`\nRule: ${v.id} (${v.impact}) - ${v.description}`);
      console.log(`Help URL: ${v.helpUrl}`);
      for (const node of v.nodes) {
        console.log(`  Target: ${node.target.join(', ')}`);
        console.log(`  HTML: ${node.html}`);
        console.log(`  Failure summary: ${node.failureSummary}`);
      }
    }
  } else {
    console.log('Zero accessibility violations detected by axe-core!');
  }

  // Calculate Lighthouse-style Accessibility Score
  const totalRules = axeResults.passes.length + axeResults.violations.length;
  const a11yScore = totalRules > 0 ? Math.round((axeResults.passes.length / totalRules) * 100) : 100;
  console.log(`\nLighthouse Accessibility Score: ${a11yScore}/100`);

  // 3. HTML VALIDITY CHECKS
  console.log('\n--- HTML VALIDATION & SEMANTICS CHECK ---');
  
  // Check for duplicate IDs
  const allElements = Array.from(document.querySelectorAll('[id]'));
  const idCounts: Record<string, number> = {};
  const duplicateIds: string[] = [];
  for (const el of allElements) {
    const id = el.getAttribute('id')!;
    idCounts[id] = (idCounts[id] || 0) + 1;
    if (idCounts[id] === 2) {
      duplicateIds.push(id);
    }
  }
  console.log(`Duplicate IDs: ${duplicateIds.length === 0 ? 'None (PASS)' : duplicateIds.join(', ')}`);

  // Check form control labels
  const formControls = Array.from(document.querySelectorAll('input, select, textarea'));
  const unlabeled = formControls.filter((fc) => {
    const id = fc.getAttribute('id');
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = fc.hasAttribute('aria-label') || fc.hasAttribute('aria-labelledby');
    return !hasLabel && !hasAriaLabel;
  });
  console.log(`Unlabeled Form Controls: ${unlabeled.length === 0 ? 'None (PASS)' : unlabeled.map((u) => u.outerHTML).join('\n')}`);

  // Check headings hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  console.log(`Total Headings: ${headings.length}`);
  const h1s = Array.from(document.querySelectorAll('h1'));
  console.log(`H1 count: ${h1s.length} (${h1s.map((h) => h.textContent?.trim()).join(' | ')})`);
  
  headings.forEach((h, idx) => {
    console.log(`  ${h.tagName}: "${h.textContent?.trim()?.substring(0, 50)}"`);
  });

  return {
    seoScore,
    a11yScore,
    violationsCount: axeResults.violations.length,
    passesCount: axeResults.passes.length,
    duplicateIdsCount: duplicateIds.length,
  };
}

runAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
