type Stat = {
  label: string;
  value: string | number;
  tone?: "green" | "red" | "blue" | "gray";
};

const toneClass = {
  green: "text-green-600 bg-green-50",
  red: "text-red-600 bg-red-50",
  blue: "text-blue-600 bg-blue-50",
  gray: "text-gray-900 bg-gray-50",
};

export const StatGrid = ({ stats }: { stats: Stat[] }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">{stat.label}</p>
        <p className={`mt-2 inline-block rounded-md px-2 py-1 text-2xl font-semibold ${toneClass[stat.tone ?? "gray"]}`}>
          {stat.value}
        </p>
      </div>
    ))}
  </div>
);
