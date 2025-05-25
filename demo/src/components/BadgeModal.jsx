const BadgeModal = ({ badge, setSelectedBadge }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg relative">
        <button
          onClick={() => setSelectedBadge(null)}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✕
        </button>
        <img src={`/badges/${badge}`} alt={badge} className="max-w-full max-h-[80vh]" />
        <a
          href={`/badges/${badge}`}
          download
          className="block mt-4 px-4 py-2 bg-blue-600 text-white text-center rounded"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default BadgeModal;
