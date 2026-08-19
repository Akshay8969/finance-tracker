import express from 'express'
import jwt     from 'jsonwebtoken'
import User    from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

/** Sign a JWT for 7 days */
const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

/** Serialize user for API responses */
const toPublic = (user) => ({
  id:          user._id,
  name:        user.name,
  email:       user.email,
  createdAt:   user.createdAt,
})

// ── POST /api/auth/signup ─────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(409).json({ message: 'An account with this email already exists.' })

    const user  = await User.create({ name: name.trim(), email, password })
    const token = signToken(user)
    res.status(201).json({ token, user: toPublic(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' })

    const token = signToken(user)
    res.json({ token, user: toPublic(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── GET /api/auth/me ──────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(toPublic(user))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
