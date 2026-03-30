import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import Bookmarks from './pages/Bookmarks'
import PostDetail from './pages/PostDetail'
import SettingsLayout from './pages/settings/SettingsLayout'
import SettingsProfile from './pages/settings/SettingsProfile'
import SettingsAccount from './pages/settings/SettingsAccount'
import SettingsPrivacy from './pages/settings/SettingsPrivacy'
import SettingsNotifs from './pages/settings/SettingsNotifs'
import SettingsDisplay from './pages/settings/SettingsDisplay'
import { ToastProvider } from './context/ToastContext'

export default function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Main feed */}
            <Route index element={<Home />} />

            {/* Explore + search */}
            <Route path="/explore" element={<Explore />} />

            {/* Notifications */}
            <Route path="/notifications" element={<Notifications />} />

            {/* Messages — convoId is optional */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:convoId" element={<Messages />} />

            {/* Bookmarks */}
            <Route path="/bookmarks" element={<Bookmarks />} />

            {/* Post detail / thread view */}
            <Route path="/post/:postId" element={<PostDetail />} />

            {/* Profile — redirect /profile → /profile/jordanblake */}
            <Route path="/profile" element={<Navigate to="/profile/jordanblake" replace />} />
            <Route path="/profile/:handle" element={<Profile />} />

            {/* Settings — nested layout */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<SettingsProfile />} />
              <Route path="account" element={<SettingsAccount />} />
              <Route path="privacy" element={<SettingsPrivacy />} />
              <Route path="notifications" element={<SettingsNotifs />} />
              <Route path="display" element={<SettingsDisplay />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ToastProvider>
  )
}
