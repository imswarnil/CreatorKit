import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@creatorkit/core';
import { input } from './input.recipe.js';
import type { RecipeProps } from '../../recipe.js';

type Size = RecipeProps<typeof input>['size'];

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	size?: Size;
	/** Marks the control invalid and lets `Field` wire the error message. */
	invalid?: boolean;
}

/**
 * A single-line text control.
 *
 * **Use it inside a `Field`**, which supplies the label, hint and error and
 * connects them with `aria-describedby`. A bare `Input` has no accessible name
 * unless you give it one — a placeholder is not a label, and disappears the
 * moment someone types.
 *
 * `invalid` sets `aria-invalid`, which is what the recipe styles against, so the
 * error state is never carried by colour alone.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, size, invalid, type = 'text', ...rest },
	ref,
) {
	return (
		<input
			ref={ref}
			type={type}
			className={cn(input({ size }), className)}
			{...(invalid ? { 'aria-invalid': true } : {})}
			{...rest}
		/>
	);
});

export interface TextareaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
	size?: Size;
	invalid?: boolean;
}

/** The same control, multi-line. Resizes vertically only. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
	{ className, size, invalid, ...rest },
	ref,
) {
	return (
		<textarea
			ref={ref}
			className={cn(input({ size, multiline: true }), className)}
			{...(invalid ? { 'aria-invalid': true } : {})}
			{...rest}
		/>
	);
});
