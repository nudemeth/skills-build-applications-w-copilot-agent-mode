import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Workouts() {
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => { fetchCollection('workouts').then((result) => setState({ ...result, loading: false, error: null })).catch((error) => setState((current) => ({ ...current, loading: false, error: error.message }))) }, [])
  return <ResourcePage title="Workouts" description="A focused menu for your next session." state={state} columns={['Workout', 'Focus', 'Difficulty', 'Duration']} renderRow={(workout) => <><td>{displayValue(workout.name, 'Untitled workout')}</td><td>{displayValue(workout.focus)}</td><td>{displayValue(workout.difficulty)}</td><td>{displayValue(workout.durationMinutes, 0)} min</td></>} />
}
export default Workouts