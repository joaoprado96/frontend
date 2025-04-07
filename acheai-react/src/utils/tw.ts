import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS classnames utility function
 * @param {string[]} classNames - Tailwind CSS classnames
 */
export const tw = (classNames: TemplateStringsArray) => twMerge(...classNames);
