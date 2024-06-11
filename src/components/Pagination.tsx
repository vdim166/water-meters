import { ReactNode } from "react"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const generatePagination = () => {
    const pagination: ReactNode[] = []

    if (totalPages <= 1) return pagination

    pagination.push(
      <button
        key="first"
        onClick={() => handlePageClick(1)}
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1 ? "bg-gray-300" : "bg-white"
        }`}
        disabled={currentPage === 1}
      >
        1
      </button>
    )

    if (currentPage > 3) {
      pagination.push(
        <span key="start-dots" className="px-3 py-1">
          ...
        </span>
      )
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pagination.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === i ? "bg-gray-300 text-black" : "bg-white text-black"
          }`}
        >
          {i}
        </button>
      )
    }

    if (currentPage < totalPages - 2) {
      pagination.push(
        <span key="end-dots" className="px-3 py-1">
          ...
        </span>
      )
    }

    pagination.push(
      <button
        key="last"
        onClick={() => handlePageClick(totalPages)}
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages ? "bg-gray-300" : "bg-white"
        }`}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </button>
    )

    return pagination
  }

  return (
    <div className="flex justify-end space-x-2 p-2 rounded-b-lg border-x border-b">
      {generatePagination()}
    </div>
  )
}

export default Pagination
