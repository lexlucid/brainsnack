import { CalendarIcon, CalendarPlus, HomeIcon, UsersIcon, SettingsIcon, } from "lucide-react"

export default function Sidebar () {
    return (
        <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Brainsnack</h1>
        </div>
        <nav className="mt-6">
          {[
            { icon: HomeIcon, label: "Dashboard", url: "/dashboard" },
            { icon: CalendarPlus, label: "Create Session", url: "/dashboard/create-session"},
            { icon: CalendarIcon, label: "Schedule" },
            { icon: UsersIcon, label: "Members" },
            { icon: SettingsIcon, label: "Settings" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    )
}