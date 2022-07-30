// TODO: test
export const parseStreet = (data: string) => {
  const streetItems = data.split(' ');
  const lengthOfStreetItems = streetItems.length;

  const street = streetItems
    .map((item, index) => {
      if (index === lengthOfStreetItems - 1) {
        return undefined;
      }

      return item;
    })
    .join(' ')
    .trim();

  return {
    street,
    streetNo: streetItems[lengthOfStreetItems - 1]
  };
};
