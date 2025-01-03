import type { Person } from "@/app/people";

interface Category {
  name: string;
  color: string;
}

interface TimelineItemProps {
  person: Person;
  startYear: number;
  totalYears: number;
  rowIndex: number;
  categories: { [key: string]: Category };
  selectedCategory: string | null;
}

export default function TimelineItem({
  person,
  startYear,
  totalYears,
  rowIndex,
  categories,
  selectedCategory,
}: TimelineItemProps) {
  const left = ((person.birthYear - startYear) / totalYears) * 100;
  const width = ((person.deathYear - person.birthYear) / totalYears) * 100;

  const isHighlighted =
    !selectedCategory || selectedCategory === person.category;

  return (
    <div
      className={`absolute h-8 cursor-pointer transition-all duration-200 hover:h-10 hover:shadow-lg ${
        isHighlighted ? categories[person.category].color : "bg-gray-300"
      }`}
      style={{
        left: `${left}%`,
        width: `${Math.max(width, 0.5)}%`,
        top: `${rowIndex * 40 + 10}px`,
        opacity: isHighlighted ? 1 : 0.5,
      }}
    >
      <span className="-translate-y-1/2 absolute top-1/2 left-2 transform whitespace-nowrap font-semibold text-sm text-white">
        {person.name}
      </span>
    </div>
  );
}
