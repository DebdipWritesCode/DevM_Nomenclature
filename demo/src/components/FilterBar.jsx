import React, { useState } from 'react';

const FilterDropdown = ({ label, options, selected, toggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 capitalize"
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 rounded bg-gray-900 shadow-lg p-2 border border-gray-700">
          <div className="flex flex-col gap-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-sm text-gray-200 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggle(option)}
                  className="accent-blue-500"
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterBar = ({ filters, setFilters }) => {
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(value);
      return {
        ...prev,
        [category]: isSelected ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <FilterDropdown
        label="Stack"
        options={['Ultra', 'Multi', 'Dual', 'Single']}
        selected={filters.stack || []}
        toggle={(value) => toggleFilter('stack', value)}
      />
      <FilterDropdown
        label="DB Type"
        options={['SO', 'NOSO', 'SONSO']}
        selected={filters.db || []}
        toggle={(value) => toggleFilter('db', value)}
      />
      <FilterDropdown
        label="Ultra Type"
        options={['A', 'C', 'D', 'S']}
        selected={filters.ultra || []}
        toggle={(value) => toggleFilter('ultra', value)}
      />
      <FilterDropdown
        label="Tier"
        options={['1', '2', '3']}
        selected={filters.tier || []}
        toggle={(value) => toggleFilter('tier', value)}
      />
    </div>
  );
};

export default FilterBar;