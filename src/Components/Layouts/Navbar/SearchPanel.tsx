export const SearchPanel = () => (
    <div className="space-y-3">
        <input
            autoFocus
            placeholder="Search container, customer, route..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-green-500"
        />
        <div className="space-y-2 text-xs text-slate-400">
            <p className="rounded-lg bg-slate-900 p-2">Try: CONT-84729</p>
            <p className="rounded-lg bg-slate-900 p-2">Try: Islam Qala</p>
            <p className="rounded-lg bg-slate-900 p-2">Try: Customer account</p>
        </div>
    </div>
);
