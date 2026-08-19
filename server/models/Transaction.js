import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:    { type: String, required: true, trim: true },
    amount:   { type: Number, required: true },
    type:     { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    date:     { type: String, required: true }, // ISO date string: "2025-08-19"
  },
  { timestamps: true }
)

// Index to speed up per-user queries sorted by date
transactionSchema.index({ userId: 1, date: -1 })

export default mongoose.model('Transaction', transactionSchema)
