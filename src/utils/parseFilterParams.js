export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = typeof type === 'string' ? type : null;
  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : null;

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
