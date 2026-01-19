<script lang="ts">
	import Spinner from "./svgs/spinner.svelte";
	import CheckIcon from "./svgs/check-icon.svelte";

	interface Props {
		isSubmitting?: boolean;
		isSuccess?: boolean;
		disabled?: boolean;
	}

	let { isSubmitting = false, isSuccess = false, disabled = false }: Props = $props();
</script>

<button
	type="submit"
	disabled={disabled || isSubmitting || isSuccess}
	class="cursor-pointer px-8 py-4 text-white text-lg md:text-xl font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 min-w-[280px] justify-center {isSuccess
		? 'bg-green-600 hover:bg-green-700'
		: 'bg-[#EC8622] hover:bg-[#d6771f]'}"
>
	{#if isSubmitting}
		<Spinner class="animate-spin h-5 w-5 text-white" />
		Submitting...
	{:else if isSuccess}
		<CheckIcon class="h-5 w-5 text-white animate-in fade-in zoom-in duration-300" />
		Submitted Successfully!
	{:else}
		Submit & Nominate for 18 Under 18
	{/if}
</button>
