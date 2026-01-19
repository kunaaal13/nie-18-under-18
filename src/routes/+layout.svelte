<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon-16x16.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} />
<link rel="apple-touch-icon" sizes="180x180" href={favicon} />
<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
<link rel="icon" type="image/png" sizes="16x16" href={favicon} />
</svelte:head>


<main class="min-h-screen w-full font-epilogue">{@render children()}</main>

