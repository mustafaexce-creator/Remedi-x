/**
 * postbuild-prerender.js
 * 
 * Runs after `vite build` to pre-render the SPA into static HTML.
 * Uses Puppeteer to load the built site in a headless browser,
 * waits for React to fully render, then saves the HTML back to dist/index.html.
 * 
 * Gracefully skips if Chrome is not available (e.g., on Vercel CI).
 * In that case, the semantic HTML fallback in index.html is served instead.
 * 
 * Usage: node postbuild-prerender.js
 */

import { createServer } from 'http'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const DIST_DIR = resolve(__dirname, 'dist')
const PORT = 4567

// Simple static file server for the dist directory
function createStaticServer(dir, port) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
  }

  const server = createServer((req, res) => {
    let filePath = join(dir, req.url === '/' ? 'index.html' : req.url)
    const ext = extname(filePath)
    const contentType = mimeTypes[ext] || 'application/octet-stream'

    try {
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
    } catch {
      // SPA fallback — serve index.html for any unmatched route
      try {
        const content = readFileSync(join(dir, 'index.html'))
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    }
  })

  return new Promise((resolvePromise) => {
    server.listen(port, () => {
      console.log(`  📦 Static server running on http://localhost:${port}`)
      resolvePromise(server)
    })
  })
}

async function prerender() {
  console.log('\n✨ Post-build pre-rendering started...\n')

  // Try to import puppeteer — gracefully skip if Chrome is not installed
  let puppeteer
  try {
    puppeteer = (await import('puppeteer')).default
  } catch (err) {
    console.log('  ⚠️  Puppeteer not available — skipping pre-render.')
    console.log('  ℹ️  The semantic HTML fallback will be served instead.\n')
    process.exit(0)
  }

  // 1. Start a static server for the dist output
  const server = await createStaticServer(DIST_DIR, PORT)

  let browser
  try {
    // 2. Launch headless browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  } catch (err) {
    // Chrome binary not found (CI environments like Vercel)
    console.log(`  ⚠️  Could not launch Chrome: ${err.message.split('\n')[0]}`)
    console.log('  ℹ️  Skipping pre-render — semantic HTML fallback will be served instead.\n')
    server.close()
    process.exit(0)
  }

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })

    // 3. Navigate and wait for the app to fully render
    console.log('  🌐 Loading page and waiting for React to render...')
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // Extra wait to ensure animations and lazy content settle
    await new Promise((r) => setTimeout(r, 2000))

    // 4. Extract the rendered HTML
    const html = await page.content()

    // 5. Write back to dist/index.html
    const outputPath = join(DIST_DIR, 'index.html')
    writeFileSync(outputPath, html, 'utf-8')
    console.log(`  ✅ Pre-rendered HTML saved to ${outputPath}`)

    // Quick sanity check
    const outputSize = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8').length
    console.log(`  📊 Output size: ${(outputSize / 1024).toFixed(1)} KB`)
  } catch (err) {
    console.error('  ❌ Pre-rendering failed:', err.message)
    console.log('  ℹ️  Continuing with semantic HTML fallback.\n')
    // Don't exit(1) — let the build succeed with the fallback HTML
  } finally {
    await browser.close()
    server.close()
    console.log('\n🎉 Pre-rendering complete!\n')
  }
}

prerender()
