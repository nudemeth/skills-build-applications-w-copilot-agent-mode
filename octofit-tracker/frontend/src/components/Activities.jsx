import { useEffect, useState } from 'react'
import { displayValue, fetchCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

function Activities() {
  const [state, setState] = useState({ items: [], pagination: null, loading: true, error: null })
  useEffect(() => {
    fetchCollection('/api/activities')
      .then((result) => setState({ ...result, loading: false, error: null }))
      .catch((error) => setState((current) => ({ ...current, loading: false, error: error.message })))
  }, [])
  return <ResourcePage title="Activities" description="Recent movement logged by your community." state={state} columns={['Activity', 'Duration', 'Date']} renderRow={(activity) => <><td>{displayValue(activity.type, 'Training')}</td><td>{displayValue(activity.durationMinutes, 0)} min</td><td>{displayValue(activity.date)}</td></>} />
}
export default Activities