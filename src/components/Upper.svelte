<script lang="ts">
	import Logo from './Logo.svelte';
	import Star from './svgs/star.svelte';
</script>

<div
	class="relative mt-[250px] flex flex-col items-center justify-center gap-8 rounded-t-3xl rounded-b-none bg-[#EC8622] pb-6 sm:mt-[370px] sm:gap-12 sm:pb-8 md:mt-[420px] md:gap-16 md:pb-10 lg:mt-[480px] lg:gap-20 xl:mt-[540px]"
>
	<Logo />

	<div
		class="flex flex-col items-center justify-center gap-6 px-4 pt-20 sm:gap-8 sm:px-6 sm:pt-28 md:gap-10 md:px-8 md:pt-32 lg:pt-36 xl:pt-40"
	>
		<h1
			class="text-stroke-white max-w-[95%] text-center font-dina-chaumont text-4xl font-extrabold text-[#CA3328] sm:text-5xl md:text-6xl lg:text-7xl"
		>
			India's brightest young trailblazers step into the spotlight!
		</h1>

		<h2
			class="text-center font-epilogue text-2xl font-semibold text-white sm:text-3xl md:text-4xl lg:text-5xl"
		>
			About 18 under 18
		</h2>

		<h3
			class="max-w-[90%] text-center font-epilogue text-base font-medium text-white sm:max-w-[80%] sm:text-lg md:max-w-[75%] md:text-xl lg:max-w-[70%] lg:text-2xl"
		>
			18 Under 18 is a Times NIE initiative celebrating school students who lead, innovate, create,
			and drive real impact far beyond academics. <br /> Schools across India are invited to nominate
			students who are shaping change through ideas, action, creativity, or courage.
		</h3>
	</div>

	<ol
		class="relative mx-4 flex max-w-[85%] list-decimal flex-col gap-2 rounded-[20px] border-3 border-dashed border-white px-4 py-8 text-sm font-medium text-white sm:mx-auto sm:gap-3 sm:rounded-[30px] sm:px-6 sm:py-10 sm:text-base md:gap-4 md:rounded-[40px] md:px-8 md:py-12 md:text-lg lg:rounded-[50px] lg:px-10 lg:py-14 lg:text-xl"
	>
		<Star
			class="absolute bottom-0 -left-8 hidden size-12 sm:-left-10 sm:block sm:size-16 md:-left-12 md:size-20 lg:-left-14"
		/>
		<Star
			class="absolute top-0 -right-8 hidden size-12 sm:-right-10 sm:block sm:size-16 md:-right-12 md:size-20 lg:-right-14"
		/>

		<h2
			class="text-stroke-white absolute top-[-7%] left-1/2 w-full -translate-x-1/2 px-2 text-center font-dina-chaumont text-2xl font-extrabold text-[#CA3328] sm:top-[-13%] sm:text-3xl md:top-[-14%] md:text-4xl lg:top-[-15%] lg:text-5xl xl:text-6xl"
		>
			Here's How It Works
		</h2>

		<li class="pl-4 sm:pl-6 md:pl-8">
			Schools identify standout students across 18 categories of excellence.
		</li>
		<li class="pl-4 sm:pl-6 md:pl-8">Nominations are open from January 27 to February 10.</li>
		<li class="pl-4 sm:pl-6 md:pl-8">
			Entries are assessed by the jury based on impact, originality, effort, and future potential.
		</li>
	</ol>
</div>
