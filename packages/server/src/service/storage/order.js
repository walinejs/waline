const ORDER_DIRECTIONS = new Set(['asc', 'desc']);
const NULL_ORDERS = new Set(['first', 'last']);

const normalizeOrder = (order, desc, mapField = (field) => field) => {
  const entries = order ?? (desc ? [{ field: desc, direction: 'desc' }] : []);

  return entries.map(({ field, direction = 'asc', nulls }) => {
    const normalizedDirection = direction.toLowerCase();
    const normalizedNulls = nulls?.toLowerCase();

    if (!ORDER_DIRECTIONS.has(normalizedDirection)) {
      throw new TypeError(`Invalid order direction: ${direction}`);
    }

    if (normalizedNulls && !NULL_ORDERS.has(normalizedNulls)) {
      throw new TypeError(`Invalid null order: ${nulls}`);
    }

    return {
      field: mapField(field),
      direction: normalizedDirection,
      nulls: normalizedNulls,
    };
  });
};

const toSqlOrder = (order, { nulls = false } = {}) =>
  Object.fromEntries(
    order.map(({ field, direction, nulls: nullOrder }) => [
      field,
      [direction.toUpperCase(), nulls && nullOrder ? `NULLS ${nullOrder.toUpperCase()}` : '']
        .filter(Boolean)
        .join(' '),
    ]),
  );

const toOrderString = (order) =>
  order.map(({ field, direction }) => `${field} ${direction.toUpperCase()}`).join(', ');

const compareByOrder =
  (order, mapValue = (_field, value) => value) =>
  (left, right) => {
    for (const { field, direction, nulls } of order) {
      const leftRawValue = left[field];
      const rightRawValue = right[field];
      const leftIsNull = leftRawValue == null;
      const rightIsNull = rightRawValue == null;

      if (leftIsNull || rightIsNull) {
        if (leftIsNull && rightIsNull) continue;

        const nullResult = nulls === 'first' ? -1 : 1;

        return leftIsNull ? nullResult : -nullResult;
      }

      const leftValue = mapValue(field, leftRawValue);
      const rightValue = mapValue(field, rightRawValue);

      if (leftValue === rightValue) continue;

      const result = leftValue > rightValue ? 1 : -1;

      return direction === 'desc' ? -result : result;
    }

    return 0;
  };

module.exports = { compareByOrder, normalizeOrder, toOrderString, toSqlOrder };
