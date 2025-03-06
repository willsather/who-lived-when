"use client";

import { categories } from "@/app/categories";
import Legend from "@/app/legend";
import { type Person, people } from "@/app/people";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { type WheelEvent, useEffect, useMemo, useRef, useState } from "react";
import TimelineAxis from "./timeline-axis";
import TimelineItem from "./timeline-item";

export default function TimeLine() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const startYear = 1400;
  const endYear = new Date().getFullYear();
  const totalYears = endYear - startYear;

  // TODO: Refactor, v0 generated this to check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      e.preventDefault();
      timelineRef.current.scrollLeft += e.deltaY * 2;
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );

    // Close drawer after selection on mobile
    if (isMobile) {
      setIsDrawerOpen(false);
    }
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
    <div className="relative flex h-screen w-full flex-col">
      {/* Desktop Legend - Only visible on desktop */}
      <div className="hidden md:block">
        <Legend
          categories={categories}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      <div
        className="flex-1 overflow-x-auto"
        onWheel={handleScroll}
        ref={timelineRef}
      >
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

      {/* Mobile Legend Drawer Toggle - Only visible on mobile */}
      <button
        type="button"
        className="fixed right-0 bottom-0 left-0 z-10 flex items-center justify-center border-gray-200 border-t bg-white p-2 md:hidden"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <span className="mr-2">Filter by Category</span>
        {isDrawerOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>

      {/* Mobile Legend Drawer - Only visible on mobile when open */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-20 border-gray-200 border-t bg-white transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          transform: isDrawerOpen ? "translateY(0)" : "translateY(100%)",
          height: "auto",
          maxHeight: "70vh",
        }}
      >
        <div className="relative p-4">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close filter drawer"
          >
            <X size={24} />
          </button>

          <h3 className="mb-4 font-semibold text-lg">Filter by Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(categories).map((category) => (
              <button
                key={category.name}
                className={`flex cursor-pointer items-center rounded-md p-2 ${
                  selectedCategory === category.name
                    ? "bg-gray-100 opacity-100"
                    : "opacity-70"
                }`}
                type="button"
                onClick={() => handleCategorySelect(category.name)}
              >
                <div className={`size-4 ${category.color} mr-2 rounded`} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
