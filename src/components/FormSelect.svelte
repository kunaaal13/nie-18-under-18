<script lang="ts">
	import ChevronDown from "./svgs/chevron-down.svelte";

	interface Props {
		id: string;
		label: string;
		value: string;
		options: string[];
		required?: boolean;
		disabled?: boolean;
		placeholder?: string;
		minWidth?: string;
		error?: string;
	}

	let {
		id,
		label,
		value = $bindable(),
		options,
		required = false,
		disabled = false,
		placeholder = "Select an option",
		minWidth = "200px",
		error = ""
	}: Props = $props();
</script>

<div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
	<label
		for={id}
		class="text-[#333333] text-base md:text-lg font-medium w-full md:w-[200px] md:shrink-0"
	>
		{label}
		{#if required}
			<span class="text-red-600">*</span>
		{/if}
	</label>
	<div class="flex-1 relative">
		<select
			id={id}
			name={id}
			bind:value={value}
			{required}
			{disabled}
			class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none text-[#333333] appearance-none bg-white pr-10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors {error
				? 'border-red-500 focus:border-red-500'
				: 'border-gray-300 focus:border-[#EC8622]'}"
		>
			<option value="">{placeholder}</option>
			{#each options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
			<ChevronDown class="w-5 h-5 text-gray-500" />
		</div>
		{#if error}
			<p class="text-red-600 text-sm mt-1">{error}</p>
		{/if}
	</div>
</div>
