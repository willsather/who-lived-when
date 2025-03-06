"use client";

import { useMemo, useState } from "react";

import { categories } from "@/app/categories";
import Legend from "@/app/legend";
import MobileLegend from "@/app/mobile-legend";
import { type Person, people } from "@/app/people";
import TimelineAxis from "@/app/timeline-axis";
import TimelineItem from "@/app/timeline-item";

export default function TimeLine() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const startYear = 1440;
  const endYear = new Date().getFullYear();
  const totalYears = endYear - startYear;

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
    <div className="relative flex h-[85vh] w-full flex-col">
      {/* Desktop Legend - Only visible on desktop */}
      <div className="hidden md:block">
        <Legend
          categories={categories}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="relative h-full w-[400vw] md:w-[300vw]">
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

      <MobileLegend
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
