import { Box, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { MetaData } from "../interfaces/Pagination";

interface Props {
  metaData: MetaData;
  onChange: (page: number) => void;
}

const PaginationBar = ({ metaData, onChange }: Props) => {
  const { currentPage, pageSize, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onChange(page);
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>{`Displaying ${(currentPage - 1) * pageSize + 1}-${
        currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize
      } of ${totalCount} items`}</Typography>
      <Pagination
        color="primary"
        size="large"
        page={pageNumber}
        count={totalPages}
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
};

export default PaginationBar;
