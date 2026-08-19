import express      from 'express'
import cors         from 'cors'
import dotenv       from 'dotenv'
import mongoose     from 'mongoose'
import authRoutes   from './routes/auth.js'
import txRoutes     from './routes/transactions.js'

import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

const app = express()

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests from any localhost port (dev) or the configured CLIENT_URL
    const allowed = process.env.CLIENT_URL || 'http://localhost:5173'
    if (!origin || origin === allowed || /^http:\/\/localhost:\d+$/.test(origin)) {
      cb(null, true)
    } else {
      cb(new Error(`CORS: origin ${origin} not allowed`))
    }
  },
  credentials: true,
}))
app.use(express.json())

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes)
app.use('/api/transactions', txRoutes)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    )
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
