import express from 'express'
import compression from 'compression'
import { expressStaticGzip } from 'express-static-gzip'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(compression())

app.use(
  '/',
  expressStaticGzip(path.join(__dirname, 'dist'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders(res, path) {
      if (path.endsWith('.br')) {
        res.setHeader('Content-Encoding', 'br')
      }
      if (path.endsWith('.gz')) {
        res.setHeader('Content-Encoding', 'gzip')
      }
    }
  })
)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
