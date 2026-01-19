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
	}

	let {
		id,
		label,
		value = $bindable(),
		placeholder = "",
		required = false,
		disabled = false,
		rows = 3,
		minWidth = "200px",
		error = ""
	}: Props = $props();
</script>

<div class="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-6">
	<label
		for={id}
		class="text-[#333333] text-base md:text-lg font-medium w-full md:w-[200px] md:shrink-0 pt-2"
	>
		{label}
		{#if required}
			<span class="text-red-600">*</span>
		{/if}
	</label>
	<div class="flex-1">
		<textarea
			id={id}
			name={id}
			bind:value={value}
			{rows}
			{placeholder}
			{required}
			{disabled}
			class="w-full px-4 py-2 rounded-lg border-2 focus:outline-none text-[#333333] resize-none bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors {error
				? 'border-red-500 focus:border-red-500'
				: 'border-gray-300 focus:border-[#EC8622]'}"
		></textarea>
		{#if error}
			<p class="text-red-600 text-sm mt-1">{error}</p>
		{/if}
	</div>
</div>
