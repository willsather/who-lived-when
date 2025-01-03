"use client";

import { type Category, categories } from "@/app/categories";
import { type Person, people } from "@/app/people";
import { type WheelEvent, useMemo, useRef, useState } from "react";
import TimelineAxis from "./timeline-axis";
import TimelineItem from "./timeline-item";

export default function TimeLine() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const startYear = 1400;
  const endYear = new Date().getFullYear();
  const totalYears = endYear - startYear;

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  const rowAssignments = useMemo(() => {
    const sortedPeople = [...people].sort((a, b) => a.birthYear - b.birthYear);
    const rows: Person[][] = [];

    for (const person of sortedPeople) {
      let assigned = false;

      for (const row of rows) {
        const lastPersonInRow = row[row.length - 1];
        if (person.birthYear > lastPersonInRow.deathYear + 10) {
          row.push(person);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        rows.push([person]);
      }
    }

    return rows;
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      <Legend
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <div
        className="flex-1 overflow-x-auto"
        onWheel={handleScroll}
        ref={timelineRef}
      >
        <div className="relative h-full w-[400vw]">
          <TimelineAxis startYear={startYear} endYear={endYear} />
          <div className="absolute top-8 right-0 bottom-0 left-0">
            {rowAssignments.map((row, rowIndex) =>
              row.map((person) => (
                <TimelineItem
                  key={person.name}
                  person={person}
                  startYear={startYear}
                  totalYears={totalYears}
                  rowIndex={rowIndex}
                  categories={categories}
                  selectedCategory={selectedCategory}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface LegendProps {
  categories: { [key: string]: Category };
  onCategorySelect: (category: string) => void;
  selectedCategory: string | null;
}

function Legend({
  categories,
  onCategorySelect,
  selectedCategory,
}: LegendProps) {
  return (
    <div className="mb-4 flex justify-center space-x-8">
      {Object.values(categories).map((category) => (
        <button
          key={category.name}
          className={`flex cursor-pointer items-center ${selectedCategory === category.name ? "opacity-100" : "opacity-50"}`}
          type="button"
          onClick={() => onCategorySelect(category.name)}
        >
          <div className={`size-4 ${category.color} mr-2 rounded`} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
