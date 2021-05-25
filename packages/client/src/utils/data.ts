const isImage = (item: DataTransferItem): boolean =>
  item.type.includes('image');

export const getImagefromDataTransfer = (
  items: DataTransferItemList
): File | false => {
  const list = Array.from(items);
  const image = list.find(isImage);

  if (image) return image.getAsFile() as File;

  return false;
};
