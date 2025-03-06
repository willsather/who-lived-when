interface TimelineAxisProps {
  startYear: number;
  endYear: number;
}

function getYears(
  startYear: number,
  endYear: number,
  interval: number,
): number[] {
  return Array.from(
    { length: Math.floor((endYear - startYear) / interval) + 1 },
    (_, i) => startYear + i * interval,
  );
}

export default function TimelineAxis({
  startYear,
  endYear,
}: TimelineAxisProps) {
  const desktopYears = getYears(startYear, endYear, 10);
  const mobileYears = getYears(startYear, endYear, 50);

  const totalYears = endYear - startYear;

  return (
    <div className="absolute top-0 right-0 left-0 flex h-8 items-center">
      {/*Desktop*/}
      {desktopYears.map((year) => (
        <div
          key={year}
          className="absolute hidden transform text-gray-600 text-sm md:block"
          style={{
            left: `${((year - desktopYears[0]) / totalYears) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="-translate-x-1/2 absolute bottom-full left-1/2 mb-1 h-2 w-px transform bg-gray-300" />
          <span className="whitespace-nowrap">{year}</span>
        </div>
      ))}

      {/*Mobile*/}
      {mobileYears.map((year) => (
        <div
          key={year}
          className="absolute transform text-gray-600 text-sm md:hidden"
          style={{
            left: `${((year - mobileYears[0]) / totalYears) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="-translate-x-1/2 absolute bottom-full left-1/2 mb-1 h-2 w-px transform bg-gray-300" />
          <span className="whitespace-nowrap">{year}</span>
        </div>
      ))}
    </div>
  );
}
