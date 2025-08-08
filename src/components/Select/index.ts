export { default } from './Select';
export { default as Select } from './Select';
export type { SelectProps, SelectOption } from './Select.types';

// Переэкспортируем подкомпоненты для возможности кастомизации
export { ArrowDropDownIcon } from './icons';
export { Chip } from './Chip';
export { SelectMenu } from './SelectMenu';
export { SelectInput } from './SelectInput';

// Переэкспортируем хуки для продвинутого использования
export {
  useSelectState,
  useSelectValue,
  useSelectOptions,
  useClickOutside,
  useSelectClasses,
} from './hooks';
