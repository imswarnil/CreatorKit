import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge needs to be told about the scales the token preset added, or it
 * will not know that `rounded-card` and `rounded-md` conflict, and a caller's
 * `className` will lose to the component's own class.
 */
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [{ text: ['2xs', 'md'] }],
			rounded: [{ rounded: ['control', 'card', 'media', 'sheet', 'pill'] }],
			shadow: [{ shadow: ['0', '1', '2', '3', '4', '5', 'inset', 'ring'] }],
		},
	},
});

/**
 * Join class names and let the last conflicting Tailwind utility win.
 *
 * Every component runs its own classes through this together with the caller's
 * `className`, so `<Button className="rounded-pill">` actually overrides the
 * variant's radius instead of depending on stylesheet order.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
