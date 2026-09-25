import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Users() {
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => {
    fetchCollection('/api/users')
      .then((result) => setState({ ...result, loading: false, error: null }))
      .catch((error) => setState((current) => ({ ...current, loading: false, error: error.message })))
  }, [])
  return <ResourcePage title="People" description="The athletes making Octofit their own." state={state} columns={['Name', 'Email', 'Fitness level']} renderRow={(user) => <><td>{displayValue(user.name, 'Unnamed athlete')}</td><td>{displayValue(user.email)}</td><td>{displayValue(user.fitnessLevel)}</td></>} />
}
export default Users