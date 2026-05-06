/**
 * postbuild-prerender.js
 * 
 * Runs after `vite build` to pre-render the SPA into static HTML.
 * Uses Puppeteer to load the built site in a headless browser,
 * waits for React to fully render, then saves the HTML back to dist/index.html.
 * 
 * Usage: node postbuild-prerender.js
 */

import puppeteer from 'puppeteer'
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

  // 1. Start a static server for the dist output
  const server = await createStaticServer(DIST_DIR, PORT)

  // 2. Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

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

    // Quick sanity check — count characters in the rendered output
    const originalSize = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8').length
    console.log(`  📊 Output size: ${(originalSize / 1024).toFixed(1)} KB`)
  } catch (err) {
    console.error('  ❌ Pre-rendering failed:', err.message)
    process.exit(1)
  } finally {
    await browser.close()
    server.close()
    console.log('\n🎉 Pre-rendering complete!\n')
  }
}

prerender()
