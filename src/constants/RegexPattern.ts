// Original Credits: https://regex101.com/library/wZ4uU6
export const PHONE_NUMBER_PATTERN =
  /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

export const PHONE_NUMBER_REGEX = new RegExp(PHONE_NUMBER_PATTERN);
