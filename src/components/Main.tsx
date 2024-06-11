import { useEffect } from "react"
import Pagination from "./Pagination"
import Table from "./Table"
import Header from "./Header"
import { useStore } from "../models/RootState"
import { observer } from "mobx-react-lite"

// TODO: prettier

const MainComponent = observer(() => {
  const store = useStore()

  useEffect(() => {
    store.fetchMeters()
  }, [store.currentPage])

  return (
    <div className="container mx-auto p-4">
      <Header />
      <Table />
      <Pagination
        currentPage={store.currentPage}
        totalPages={store.totalPages}
        onPageChange={store.setPage}
      />
    </div>
  )
})

export default MainComponent
