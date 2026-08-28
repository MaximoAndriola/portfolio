export default function BrowserFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl bg-surface shadow-lg ${className}`}>
      {/* Barra superior con puntitos decorativos, para que hasta el
          placeholder se lea intencional y no como una caja vacía. */}
      <div className="flex items-center gap-1.5 border-b border-bg px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-bg" />
        <span className="h-2.5 w-2.5 rounded-full bg-bg" />
        <span className="h-2.5 w-2.5 rounded-full bg-bg" />
      </div>
      {children}
    </div>
  );
}
