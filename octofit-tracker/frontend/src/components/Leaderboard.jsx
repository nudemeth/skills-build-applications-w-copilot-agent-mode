import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Leaderboard() {
  const leaderboardEndpoint = 'https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard'
  const resourcePath = leaderboardEndpoint.endsWith('/leaderboard') ? '/api/leaderboard' : '/api/leaderboard'
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => { fetchCollection(resourcePath).then((result) => setState({ ...result, loading: false, error: null })).catch((error) => setState((current) => ({ ...current, loading: false, error: error.message }))) }, [])
  return <ResourcePage title="Leaderboard" description="The people setting the pace this week." state={state} columns={['Rank', 'Athlete', 'Points']} renderRow={(entry) => <><td className="rank">#{displayValue(entry.rank)}</td><td>{displayValue(entry.name, 'Unknown athlete')}</td><td>{displayValue(entry.points, 0)} pts</td></>} />
}
export default Leaderboard