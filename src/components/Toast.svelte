<script lang="ts">
	interface Props {
		message: string;
		type?: "error" | "success";
		show: boolean;
	}

	let { message, type = "error", show }: Props = $props();
</script>

<style>
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translate(-50%, -20px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
</style>

{#if show}
	<div
		class="fixed top-4 left-1/2 -translate-x-1/2 z-50"
		role="alert"
		style="animation: slideDown 0.3s ease-out;"
	>
		<div
			class="px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 {type === 'error'
				? 'bg-red-600 text-white'
				: 'bg-green-600 text-white'}"
		>
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				{#if type === "error"}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					></path>
				{/if}
			</svg>
			<span class="font-medium">{message}</span>
		</div>
	</div>
{/if}
