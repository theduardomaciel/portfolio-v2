import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import styles from "./select.module.css";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

import Chevron from "@/icons/chevron_left.svg?react";

interface SelectTriggerProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
	icon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	SelectTriggerProps
>(({ className, children, icon, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={`${className} ${styles.trigger}`}
		{...props}
	>
		{icon && icon}
		{children}
		{/* <ChevronDown className="h-4 w-4" /> */}
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={`${className} ${styles.content}`}
			{...props}
		>
			<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={`${className} ${styles.label}`}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectScrollUp = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.SelectScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={styles.scroll}
		{...props}
	>
		<Chevron
			style={{
				transform: "rotate(90deg)",
			}}
			fill="var(--primary-01)"
			width={20}
			height={20}
		/>
	</SelectPrimitive.ScrollUpButton>
));
SelectScrollUp.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDown = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.SelectScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={styles.scroll}
		{...props}
	>
		<Chevron
			style={{
				transform: "rotate(-90deg)",
			}}
			fill="var(--primary-01)"
			width={20}
			height={20}
		/>
	</SelectPrimitive.ScrollDownButton>
));
SelectScrollDown.displayName = SelectPrimitive.ScrollDownButton.displayName;

interface SelectItemProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
	icon?: React.ReactNode;
}

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	SelectItemProps
>(({ className, children, icon, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={`${className} ${styles.item}`}
		{...props}
	>
		{icon && icon}
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		<span className={styles.item_span}>
			<SelectPrimitive.ItemIndicator>
				{/* <Check className="h-4 w-4" /> */}
			</SelectPrimitive.ItemIndicator>
		</span>
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={`${className} ${styles.separator}`}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

interface SelectWithLabelProps
	extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
	label: string;
	options: { label: string; value: string }[];
}

const SelectWithLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	SelectWithLabelProps
>(({ children, label, options, ...rest }, ref) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			width: "100%",
			rowGap: "0.875rem",
		}}
	>
		<label
			style={{
				fontSize: "1rem",
				lineHeight: "1.5rem",
				textAlign: "left",
				color: "var(--neutral)",
			}}
		>
			{label}
		</label>
		<Select {...rest}>
			<SelectTrigger
				style={{
					paddingTop: "0.75rem",
					paddingBottom: "0.75rem",
					backgroundColor: "#D1D5DB",
					width: "100%",
				}}
			>
				<SelectValue placeholder="-" />
			</SelectTrigger>
			<SelectContent
				style={{ width: "var(--radix-select-trigger-width)" }}
				position="popper"
				sideOffset={5}
			>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
));
SelectWithLabel.displayName = "SelectWithLabel";

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUp,
	SelectScrollDown,
	SelectWithLabel,
};
