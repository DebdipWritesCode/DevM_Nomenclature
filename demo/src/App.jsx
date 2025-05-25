import { useState } from "react";
import FilterBar from "./components/FilterBar";
import BadgeGrid from "./components/BadgeGrid";
import BadgeModal from "./components/BadgeModal";

function App() {
  const [filters, setFilters] = useState({
    stack: null,
    db: null,
    ultra: null,
    tier: null,
  });

  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-6 font-heading">DevM Nomenclature</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      <BadgeGrid filters={filters} setSelectedBadge={setSelectedBadge} />
      {selectedBadge && <BadgeModal badge={selectedBadge} setSelectedBadge={setSelectedBadge} />}
    </div>
  );
}

export default App;
