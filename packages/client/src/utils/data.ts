const isImage = (item: DataTransferItem): boolean =>
  item.type.includes('image');

export const getImagefromDataTransfer = (
  items: DataTransferItemList
): File | null => {
  const image = Array.from(items).find(isImage);

  return image ? (image.getAsFile() as File) : null;
};
