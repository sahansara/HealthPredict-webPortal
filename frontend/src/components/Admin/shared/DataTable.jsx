const DataTable = ({ data, columns, loading, onEdit, onDelete, emptyMessage }) => {
  // Normalize data into an array so we can safely call .map even if data is an object
  const dataArray = Array.isArray(data) ? data : data ? Object.values(data) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B69D4]"></div>
      </div>
    );
  }

  if (!data || dataArray.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">{emptyMessage || 'No data found'}</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding new records.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dataArray.map((row, rowIndex) => (
            <tr key={row?.id ?? rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {column.render ? column.render(row) : row?.[column.key]}
                </td>
              ))}
              
              {/* Actions Column */}
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(row?.id ?? rowIndex)}
                    className="px-4 py-2 bg-[#3B69D4] text-white text-sm font-medium rounded-lg hover:bg-[#2d54b8] transition-all hover:shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row?.id ?? rowIndex)}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all hover:shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;