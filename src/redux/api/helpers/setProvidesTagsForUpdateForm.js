export const setProvidesTagsForUpdateForm = result => {
  return result
    ? [
        ...(result.firstLocale
          ? [{ type: 'Events', id: result.firstLocale.id }]
          : []),
        ...(result.secundLocale
          ? [{ type: 'Events', id: result.secundLocale.id }]
          : []),
        { type: 'Events', id: 'LIST' },
      ]
    : [{ type: 'Events', id: 'LIST' }];
};
