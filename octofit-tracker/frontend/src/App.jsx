import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit</span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavItem to="/activities">Activities</NavItem>
          <NavItem to="/leaderboard">Leaderboard</NavItem>
          <NavItem to="/teams">Teams</NavItem>
          <NavItem to="/users">People</NavItem>
          <NavItem to="/workouts">Workouts</NavItem>
        </nav>
        <span className="status-dot">Live workspace</span>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function NavItem({ to, children }) {
  return <NavLink to={to}>{children}</NavLink>
}

function Overview() {
  return (
    <section className="overview">
      <div className="page-heading"><div><p className="eyebrow">Friday, September 25, 2026</p><h1>Keep the momentum.</h1><p className="lede">A clear view of your team&apos;s movement, progress, and next session.</p></div><NavLink className="primary-action" to="/workouts">Find a workout <span aria-hidden="true">-&gt;</span></NavLink></div>
      <div className="overview-grid">
        <OverviewCard label="Today&apos;s focus" value="Consistency" detail="Build the habit, one session at a time." accent="coral" />
        <OverviewCard label="Team pulse" value="Ready to move" detail="Check the leaderboard for this week&apos;s pace." accent="teal" />
        <OverviewCard label="Next up" value="Strength + core" detail="A 32 minute workout matched to your goals." accent="yellow" />
      </div>
      <div className="overview-footer"><div><p className="eyebrow">Your training desk</p><h2>Everything in one place.</h2></div><p>Log activity, compare progress, and keep your team moving together.</p></div>
    </section>
  )
}

function OverviewCard({ label, value, detail, accent }) {
  return <article className={`overview-card ${accent}`}><p className="eyebrow">{label}</p><strong>{value}</strong><p>{detail}</p></article>
}

export default App