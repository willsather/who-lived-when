interface TimelineAxisProps {
  startYear: number;
  endYear: number;
}

export default function TimelineAxis({
  startYear,
  endYear,
}: TimelineAxisProps) {
  const decades = [];
  const startDecade = Math.floor(startYear / 10) * 10;
  const endDecade = Math.ceil(endYear / 10) * 10;

  for (let year = startDecade; year <= endDecade; year += 10) {
    decades.push(year);
  }

  const totalYears = endDecade - startDecade;

  return (
    <div className="absolute top-0 right-0 left-0 flex h-8 items-center">
      {decades.map((year) => (
        <div
          key={year}
          className="-translate-x-1/2 absolute transform text-gray-600 text-sm"
          style={{ left: `${((year - startDecade) / totalYears) * 100}%` }}
        >
          <div className="-translate-x-1/2 absolute bottom-full left-1/2 mb-1 h-2 w-px bg-gray-300" />
          {year}
        </div>
      ))}
    </div>
  );
}
