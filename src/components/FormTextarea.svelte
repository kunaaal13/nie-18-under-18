<script lang="ts">
	interface Props {
		id: string;
		label: string;
		value: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		rows?: number;
		minWidth?: string;
		error?: string;
		description?: string;
	}

	let {
		id,
		label,
		value = $bindable(),
		placeholder = '',
		required = false,
		disabled = false,
		rows = 3,
		minWidth = '200px',
		error = '',
		description = ''
	}: Props = $props();
</script>

<div class="mb-6 flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
	<label
		for={id}
		class="w-full pt-2 text-base font-medium text-[#333333] md:w-[200px] md:shrink-0 md:text-lg"
	>
		{label}
		{#if required}
			<span class="text-red-600">*</span>
		{/if}
	</label>
	<div class="flex-1">
		{#if description}
			<p class="mb-2 text-sm text-[#666666]">{description}</p>
		{/if}
		<textarea
			{id}
			name={id}
			bind:value
			{rows}
			{placeholder}
			{required}
			{disabled}
			class="w-full resize-none rounded-lg border-2 bg-white px-4 py-2 text-[#333333] transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {error
				? 'border-red-500 focus:border-red-500'
				: 'border-gray-300 focus:border-[#EC8622]'}"
		></textarea>
		{#if error}
			<p class="mt-1 text-sm text-red-600">{error}</p>
		{/if}
	</div>
</div>
