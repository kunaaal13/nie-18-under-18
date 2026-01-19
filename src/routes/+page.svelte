<script lang="ts">
	import BGImage from "$lib/assets/bg.svg";
	import Logo from "../components/Logo.svelte";
	import Lower from "../components/Lower.svelte";
	import Upper from "../components/Upper.svelte";
</script>


<div class="w-full relative py-20">
    <img src={BGImage} alt="Background" class="w-full h-full object-cover inset-0 absolute" />

    <section class="w-full px-4 md:px-20 relative z-10">
    <div class="rounded-3xl shadow-[0_10px_24px_rgb(87,203,245)]">
        <Upper />

        <Lower />
    </div>
</section>
</div>
