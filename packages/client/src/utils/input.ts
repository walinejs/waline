export const insertAtCursor = (
  textArea: HTMLTextAreaElement,
  content: string
): void => {
  // For browsers like Firefox and Webkit based
  if (textArea.selectionStart || textArea.selectionStart === 0) {
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd || 0;
    const scrollTop = textArea.scrollTop;

    textArea.value =
      textArea.value.substring(0, startPos) +
      content +
      textArea.value.substring(endPos, textArea.value.length);
    textArea.focus();
    textArea.selectionStart = startPos + content.length;
    textArea.selectionEnd = startPos + content.length;
    textArea.scrollTop = scrollTop;
  } else {
    textArea.focus();
    textArea.value += content;
  }
};
