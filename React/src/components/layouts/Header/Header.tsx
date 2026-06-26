export default function Header() {
  return (
    <header className="w-full h-14 bg-slate-800 text-yellow-100 flex items-center justify-between px-4 border-b border-slate-700">
      <h1 className="text-lg font-bold">Dashboard</h1>

      <div className="text-sm opacity-80">
        Admin
      </div>
    </header>
  );
}