import express     from 'express'
import Transaction  from '../models/Transaction.js'
import { protect }  from '../middleware/auth.js'

const router = express.Router()

// All routes require a valid JWT
router.use(protect)

// ── GET /api/transactions ─────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const txs = await Transaction
      .find({ userId: req.user.id })
      .sort({ date: -1, createdAt: -1 })
    res.json(txs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── POST /api/transactions ────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body
    if (!title || !amount || !type || !category || !date)
      return res.status(400).json({ message: 'All fields are required' })

    const tx = await Transaction.create({
      userId: req.user.id,
      title:  title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    })
    res.status(201).json(tx)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── PUT /api/transactions/:id ─────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body
    const tx = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: title?.trim(), amount: Number(amount), type, category, date },
      { new: true, runValidators: true }
    )
    if (!tx) return res.status(404).json({ message: 'Transaction not found' })
    res.json(tx)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── DELETE /api/transactions/:id ──────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user.id,
    })
    if (!tx) return res.status(404).json({ message: 'Transaction not found' })
    res.json({ message: 'Transaction deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
