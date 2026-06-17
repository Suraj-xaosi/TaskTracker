import "./App.css"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import useAuthToken from "./hooks/useAuthToken"

function App() {
  const { isAuthenticated } = useAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
  }, [isAuthenticated])

  const loginWithGoogle = async () => {
    window.location.href = `http://localhost:3000/auth/google`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0f0f0f] rounded-2xl border border-[#1e1e1e] p-10">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 bg-[#1a2d0a] text-[#a3e635] text-xs font-medium px-3 py-1.5 rounded-full border border-[#2d4d0f]">
            ⚡ Execution-first productivity
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-[#f0f0f0] leading-tight mb-3">
            Work in <span className="text-[#a3e635]">cycles.</span><br />
            Ship with intention.
          </h1>
          <p className="text-[#666] text-base leading-relaxed max-w-sm mx-auto">
            Set goals, track daily tasks, and measure your execution score — all in one focused workspace built for builders.
          </p>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-2.5 bg-[#a3e635] hover:bg-[#bef264] text-[#0a1a00] font-medium text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <hr className="border-[#1e1e1e] mb-8" />

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: "🔁", title: "Work cycles", desc: "Define sprints with goals and deadlines" },
            { icon: "🎯", title: "Goal tracking", desc: "Move goals through todo → done" },
            { icon: "📈", title: "Execution score", desc: "Daily & weekly performance metrics" },
            { icon: "🖼️", title: "Vision board", desc: "Stay motivated with your why" },
          ].map((f) => (
            <div key={f.title} className="bg-[#181818] border border-[#252525] rounded-xl p-4">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="text-[#e5e5e5] text-xs font-medium mb-1">{f.title}</div>
              <div className="text-[#555] text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#333]">
          No account needed · Sign in with Google to get started · Free to use
        </p>
      </div>
    </div>
  )
}

export default App