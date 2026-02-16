import { ChevronsDownIcon } from "lucide-react";
import React, { useState } from "react";

const HistoryFilter = ({ selected, setSelected }) => {
  const [openFilter, setOpenFilter] = useState(false);

  const options = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "longest", label: "Longest Cycle First" },
    { id: "shortest", label: "Shortest Cycle First" },
  ];

  return (
    <div className="relative">
      <ChevronsDownIcon
        onClick={() => setOpenFilter((prev) => !prev)}
        className="cursor-pointer"
      />

      {openFilter && (
        <div className="bg-white dark:bg-neutral-800 flex flex-col px-3 py-3 w-max gap-2 rounded-lg absolute top-8 right-0 shadow-lg z-50">
          {options.map((opt) => (
            <label
              key={opt.id}
              htmlFor={opt.id}
              className="flex items-center justify-between w-full cursor-pointer gap-4"
            >
              {opt.label}
              <input
                type="radio"
                id={opt.id}
                name="historyFilter"
                checked={selected === opt.id}
                onChange={() => {
                  setSelected(opt.id);
                  setOpenFilter(false);
                }}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryFilter;
