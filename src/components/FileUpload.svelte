<script lang="ts">
	import ImageIcon from "./svgs/image-icon.svelte";
	import UploadIcon from "./svgs/upload-icon.svelte";

	interface Props {
		id: string;
		label: string;
		file: File | null;
		accept?: string;
		required?: boolean;
		disabled?: boolean;
		helperText?: string;
		iconType?: "image" | "upload";
		minWidth?: string;
		error?: string;
	}

	let {
		id,
		label,
		file = $bindable(),
		accept = "*/*",
		required = false,
		disabled = false,
		helperText = "",
		iconType = "upload",
		minWidth = "200px",
		error = ""
	}: Props = $props();

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			file = target.files[0];
		} else {
			file = null;
		}
	}
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
		<div
			class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-2 border-dashed rounded-lg bg-white transition-colors {error
				? 'border-red-500'
				: 'border-gray-300'}"
		>
			<div class="flex items-center gap-3">
				{#if iconType === "image"}
					<ImageIcon class="w-8 h-8 text-gray-400" />
				{:else}
					<UploadIcon class="w-8 h-8 text-gray-400" />
				{/if}
				<div class="flex flex-col">
					<span class="text-sm text-gray-600">
						{#if file}
							{file.name}
						{:else}
							No file selected
						{/if}
					</span>
				</div>
			</div>
			<label
				for={id}
				class="px-4 py-2 bg-[#EC8622] text-white rounded-lg cursor-pointer hover:bg-[#d6771f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<input
					id={id}
					name={id}
					type="file"
					{accept}
					{required}
					{disabled}
					onchange={handleFileChange}
					class="hidden"
				/>
				Upload
			</label>
		</div>
		{#if error}
			<p class="text-red-600 text-sm mt-1">{error}</p>
		{/if}
		{#if helperText && !error}
			<p class="text-sm text-gray-600 mt-2">{helperText}</p>
		{/if}
	</div>
</div>
