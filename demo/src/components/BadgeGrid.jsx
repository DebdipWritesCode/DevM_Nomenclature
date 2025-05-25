import { useEffect, useState } from 'react';

const BadgeGrid = ({ filters, setSelectedBadge }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const badgeFilenames = [
      "NOSO_A_Ultra_1.png",
      "NOSO_A_Ultra_2.png",
      "NOSO_A_Ultra_3.png",
      "NOSO_C_Ultra_1.png",
      "NOSO_C_Ultra_2.png",
      "NOSO_C_Ultra_3.png",
      "NOSO_Dual.png",
      "NOSO_D_Ultra_1.png",
      "NOSO_D_Ultra_2.png",
      "NOSO_D_Ultra_3.png",
      "NOSO_Multi.png",
      "NOSO_Single.png",
      "NOSO_S_Ultra_1.png",
      "NOSO_S_Ultra_2.png",
      "NOSO_S_Ultra_3.png",
      "SONSO_A_Ultra_1.png",
      "SONSO_A_Ultra_2.png",
      "SONSO_A_Ultra_3.png",
      "SONSO_C_Ultra_1.png",
      "SONSO_C_Ultra_2.png",
      "SONSO_C_Ultra_3.png",
      "SONSO_Dual.png",
      "SONSO_D_Ultra_1.png",
      "SONSO_D_Ultra_2.png",
      "SONSO_D_Ultra_3.png",
      "SONSO_Multi.png",
      "SONSO_Single.png",
      "SONSO_S_Ultra_1.png",
      "SONSO_S_Ultra_2.png",
      "SONSO_S_Ultra_3.png",
      "SO_A_Ultra_1.png",
      "SO_A_Ultra_2.png",
      "SO_A_Ultra_3.png",
      "SO_C_Ultra_1.png",
      "SO_C_Ultra_2.png",
      "SO_C_Ultra_3.png",
      "SO_Dual.png",
      "SO_D_Ultra_1.png",
      "SO_D_Ultra_2.png",
      "SO_D_Ultra_3.png",
      "SO_Multi.png",
      "SO_Single.png",
      "SO_S_Ultra_1.png",
      "SO_S_Ultra_2.png",
      "SO_S_Ultra_3.png"
    ];

    const stackOrder = ['Ultra', 'Multi', 'Dual', 'Single'];
    const ultraOrder = ['C', 'A', 'D', 'S'];
    const tierOrder = ['3', '2', '1'];
    const dbOrder = ['SO', 'NOSO', 'SONSO'];

    function parseFilename(name) {
      const parts = name.replace('.png', '').split('_');
      const db = parts[0] || '';
      let ultra = '', stack = '', tier = '';

      if (parts.length === 4) {
        [, ultra, stack, tier] = parts;
      } else if (parts.length === 3) {
        if (['1', '2', '3'].includes(parts[2])) {
          [, stack, tier] = parts;
        } else {
          [, ultra, stack] = parts;
        }
      } else if (parts.length === 2) {
        [, stack] = parts;
      }

      return { db, ultra, stack, tier };
    }

    function compareBadges(a, b) {
      const aParts = parseFilename(a);
      const bParts = parseFilename(b);

      const stackCompare = stackOrder.indexOf(aParts.stack) - stackOrder.indexOf(bParts.stack);
      if (stackCompare !== 0) return stackCompare;

      if (aParts.stack === 'Ultra' && bParts.stack === 'Ultra') {
        const ultraCompare = ultraOrder.indexOf(aParts.ultra) - ultraOrder.indexOf(bParts.ultra);
        if (ultraCompare !== 0) return ultraCompare;

        const tierCompare = tierOrder.indexOf(aParts.tier) - tierOrder.indexOf(bParts.tier);
        if (tierCompare !== 0) return tierCompare;
      }

      const dbCompare = dbOrder.indexOf(aParts.db) - dbOrder.indexOf(bParts.db);
      if (dbCompare !== 0) return dbCompare;

      return a.localeCompare(b);
    }

    const sortedFilenames = badgeFilenames.slice().sort(compareBadges);

    const badgeList = sortedFilenames.map(name => ({
      src: `/badges/${name}`,
      name
    }));

    setBadges(badgeList);
  }, []);

  const matchesFilters = (name) => {
    const parts = name.replace('.png', '').split('_');
    const db = parts[0] || '';
    let ultra = '', stack = '', tier = '';

    if (parts.length === 4) {
      [, ultra, stack, tier] = parts;
    } else if (parts.length === 3) {
      if (['1', '2', '3'].includes(parts[2])) {
        [, stack, tier] = parts;
      } else {
        [, ultra, stack] = parts;
      }
    } else if (parts.length === 2) {
      [, stack] = parts;
    }

    const dbMatch = !filters.db?.length || filters.db.includes(db);
    const ultraMatch = !filters.ultra?.length || ultra === '' || filters.ultra.includes(ultra);
    const stackMatch = !filters.stack?.length || filters.stack.includes(stack);
    const tierMatch = !filters.tier?.length || tier === '' || filters.tier.includes(tier);

    return dbMatch && ultraMatch && stackMatch && tierMatch;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
      {badges.filter(b => matchesFilters(b.name)).map((b, i) => (
        <img
          key={i}
          src={b.src}
          alt={b.name}
          className="
          w-full
          cursor-pointer
          rounded-lg
          border-2
          border-gray-300
          shadow-sm
          transition
          transform
          duration-300
          ease-in-out
          hover:scale-105
          hover:border-blue-500
          hover:shadow-lg
          hover:shadow-blue-300
        "
          onClick={() => setSelectedBadge(b.name)}
        />
      ))}
    </div>
  );
};

export default BadgeGrid;
