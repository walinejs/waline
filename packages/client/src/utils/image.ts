export const getImageFromDataTransfer = (items: DataTransferItemList): File | null => {
  const image = [...items].find((item) => item.type.includes('image'));

  return image ? image.getAsFile() : null;
};
