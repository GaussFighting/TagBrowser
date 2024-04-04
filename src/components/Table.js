import * as React from "react";
import { useEffect, useState } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiPagination from "@mui/material/Pagination";
import storybookData from "../storybook_data/storybookData";
import "../styles/index.scss";
import PropTypes from 'prop-types';

const Pagination = ({ page, onPageChange, className, total, rowsPerPage }) => {
  const apiRef = useGridApiContext();
  // const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageCount = Math.ceil(total / rowsPerPage)
  
  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (props) => {
console.log(props.total)
const [rowsPerPage, setRowsPerPage] = useState(5);

  return <GridPagination rowsPerPage={rowsPerPage} onRowsPerPageChange={(event) => setRowsPerPage(event.target.value)} ActionsComponent={() => <Pagination total={props.total} rowsPerPage={rowsPerPage} />} {...props} />;
};

const Table = ({ loading, items = [], autoHeight, total }) => {
  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      toastId.current = toast("Results in progress", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [loading]);

  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "tagName", headerName: "Tag name", width: 130 },
    {
      field: "count",
      headerName: "Count",
      type: "number",
      width: 90,
    },
  ];
  let rows = items.map((el, idx) => ({
    id: idx + 1,
    tagName: el.name,
    count: el.count,
  }));
  
  if (window.location.port === "6006") {
    rows = storybookData.items.map((el, idx) => ({
    id: idx + 1,
    tagName: el.name,
    count: el.count,
  }))} 
  if (rows.length === 0) return null 
  return (
    <div className="data-grid">
    <DataGrid
      className="pagination-top"
      pagination
      slots={{
        pagination: () => <CustomPagination total={total} />,
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20, 25, 30]}
      checkboxSelection
      autoHeight={autoHeight}
    />
  </div>
  )
};

export default Table;

Table.propTypes = {
  autoHeight: PropTypes.bool,
}

Table.defaultProps = {
  autoHeight: true,
};