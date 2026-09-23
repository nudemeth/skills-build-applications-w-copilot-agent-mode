import mongoose from 'mongoose'
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')
    console.log('Seed the octofit_db database with test data')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const trailBlazers = await Team.create({
      name: 'Trail Blazers',
      captain: 'Alice Johnson',
      members: [],
    })

    const peakPerformers = await Team.create({
      name: 'Peak Performers',
      captain: 'Marcus Lee',
      members: [],
    })

    const alice = await User.create({
      name: 'Alice Johnson',
      email: 'alice.johnson@octofit.edu',
      fitnessLevel: 'advanced',
      teamId: trailBlazers._id,
    })

    const marcus = await User.create({
      name: 'Marcus Lee',
      email: 'marcus.lee@octofit.edu',
      fitnessLevel: 'intermediate',
      teamId: peakPerformers._id,
    })

    const sophia = await User.create({
      name: 'Sophia Patel',
      email: 'sophia.patel@octofit.edu',
      fitnessLevel: 'advanced',
      teamId: trailBlazers._id,
    })

    await Team.findByIdAndUpdate(trailBlazers._id, {
      members: [alice._id, sophia._id],
    })

    await Team.findByIdAndUpdate(peakPerformers._id, {
      members: [marcus._id],
    })

    await Activity.insertMany([
      {
        userId: alice._id,
        type: 'run',
        durationMinutes: 42,
        date: '2026-09-20',
      },
      {
        userId: marcus._id,
        type: 'strength',
        durationMinutes: 50,
        date: '2026-09-21',
      },
      {
        userId: sophia._id,
        type: 'cycling',
        durationMinutes: 35,
        date: '2026-09-22',
      },
    ])

    await LeaderboardEntry.insertMany([
      {
        userId: alice._id,
        rank: 1,
        name: 'Alice Johnson',
        points: 980,
      },
      {
        userId: marcus._id,
        rank: 2,
        name: 'Marcus Lee',
        points: 935,
      },
      {
        userId: sophia._id,
        rank: 3,
        name: 'Sophia Patel',
        points: 912,
      },
    ])

    await Workout.insertMany([
      {
        name: 'HIIT Cardio Blast',
        durationMinutes: 25,
        difficulty: 'advanced',
        focus: 'cardio',
      },
      {
        name: 'Strength Foundations',
        durationMinutes: 40,
        difficulty: 'intermediate',
        focus: 'strength',
      },
      {
        name: 'Mobility Recovery Flow',
        durationMinutes: 20,
        difficulty: 'beginner',
        focus: 'recovery',
      },
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
