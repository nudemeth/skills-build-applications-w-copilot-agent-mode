import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Teams() {
  const teamsEndpoint = 'https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams'
  const resourcePath = teamsEndpoint.endsWith('/teams') ? '/api/teams' : '/api/teams'
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => { fetchCollection(resourcePath).then((result) => setState({ ...result, loading: false, error: null })).catch((error) => setState((current) => ({ ...current, loading: false, error: error.message }))) }, [])
  return <ResourcePage title="Teams" description="Small groups, shared goals, better follow-through." state={state} columns={['Team', 'Captain', 'Members']} renderRow={(team) => <><td>{displayValue(team.name, 'Unnamed team')}</td><td>{displayValue(team.captain)}</td><td>{Array.isArray(team.members) ? team.members.length : 0}</td></>} />
}
export default Teams