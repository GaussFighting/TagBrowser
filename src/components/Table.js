import * as React from "react";
import { useEffect } from "react";
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

const Pagination = ({ page, onPageChange, className }) => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

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
  return <GridPagination ActionsComponent={Pagination} {...props} />;
};

const Table = ({ loading, items = [] }) => {
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
  if (rows.length > 0) {
    return (
      <div className="data-grid">
        <DataGrid
          className="pagination-top"
          pagination
          slots={{
            pagination: CustomPagination,
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
          autoHeight
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Table;
