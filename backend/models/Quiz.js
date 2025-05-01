import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: String,
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      questionSource: {
        type: String,
        enum: ['pdf', 'manual', 'mixed'],
        default: 'manual'
      },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Update the updatedAt field before saving
quizSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Quiz', quizSchema);