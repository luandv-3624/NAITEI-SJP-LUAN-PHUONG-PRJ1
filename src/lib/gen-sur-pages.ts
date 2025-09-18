export const getSurroundingPages = (totalPages: number, page: number) => {
  if (page < 1 || page > totalPages) {
    return [];
  }

  const leftPage = Math.max(1, page - 2);
  const rightPage = Math.min(totalPages, page + 2);

  const surroundingPages: number[] = [];

  if (leftPage !== 1) {
    surroundingPages.push(1);
  }

  if (leftPage - 1 > 1) {
    surroundingPages.push(0);
  }

  for (let i = leftPage; i <= rightPage; ++i) {
    surroundingPages.push(i);
  }

  if (totalPages - rightPage > 1) {
    surroundingPages.push(0);
  }

  if (rightPage !== totalPages) {
    surroundingPages.push(totalPages);
  }

  return surroundingPages;
};
