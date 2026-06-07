const notifications = [
    "3 containers are waiting for customs clearance.",
    "Exchange balance updated for Herat.",
    "Truck account needs fare confirmation.",
];

export const NotificationsPanel = () => (
    <div className="space-y-2">
        {notifications.map((note) => (
            <div key={note} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <p className="text-sm font-semibold text-slate-200">{note}</p>
                <p className="mt-1 text-[11px] text-slate-500">Just now</p>
            </div>
        ))}
    </div>
);
