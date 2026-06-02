import ReactPaginateModule from "react-paginate"
import css from "./Pagination.module.css"

import type { ComponentType } from "react"
import type { ReactPaginateProps } from "react-paginate"

const ReactPaginate = (
  (ReactPaginateModule as unknown as {
    default?: ComponentType<ReactPaginateProps>
  }).default ?? ReactPaginateModule
) as ComponentType<ReactPaginateProps>


interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={(pageData: { selected: number }) => {
        onPageChange(pageData.selected + 1)
      }}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  )
}

export default Pagination
