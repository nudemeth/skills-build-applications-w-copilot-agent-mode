import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Users() {
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => {
    fetch('/api/users/')
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load users (${response.status})`)
        return response.json()
      })
      .then((payload) => {
        const items = Array.isArray(payload) ? payload : payload.data ?? payload.items ?? payload.results ?? []
        setState({ items: Array.isArray(items) ? items : [], pagination: payload.pagination ?? payload.meta ?? null, loading: false, error: null })
      })
      .catch((error) => setState((current) => ({ ...current, loading: false, error: error.message })))
  }, [])
  return <ResourcePage title="People" description="The athletes making Octofit their own." state={state} columns={['Name', 'Email', 'Fitness level']} renderRow={(user) => <><td>{displayValue(user.name, 'Unnamed athlete')}</td><td>{displayValue(user.email)}</td><td>{displayValue(user.fitnessLevel)}</td></>} />
}
export default Users