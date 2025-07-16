import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

// Replace THEME list here (not from DaisyUI anymore)
const THEMES = [
  { id: "light", label: "Light", colors: ["bg-white", "bg-gray-300", "bg-gray-400", "bg-gray-500"] },
  { id: "dark", label: "Dark", colors: ["bg-gray-800", "bg-gray-700", "bg-gray-600", "bg-gray-500"] },
  { id: "blue", label: "Blue", colors: ["bg-blue-500", "bg-blue-600", "bg-blue-700", "bg-blue-800"] },
  { id: "green", label: "Green", colors: ["bg-green-500", "bg-green-600", "bg-green-700", "bg-green-800"] },
  { id: "pink", label: "Pink", colors: ["bg-pink-500", "bg-pink-600", "bg-pink-700", "bg-pink-800"] },
];

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-gray-500">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg border transition ${
                theme === t.id
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  {t.colors.map((color, idx) => (
                    <div key={idx} className={`rounded ${color}`} />
                  ))}
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold">Preview</h3>
        <div className="rounded-xl border border-gray-300 overflow-hidden bg-bg">
          <div className="p-4 bg-bg">
            <div className="max-w-lg mx-auto">
              <div className="bg-bg shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-accent bg-bg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-text font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-bg">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm text-sm ${
                          message.isSent
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            message.isSent
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="h-10 px-3 rounded-md bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 