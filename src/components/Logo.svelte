<script lang="ts">
	import LeftLogo from '$lib/assets/left.svg';
	import RightLogo from '$lib/assets/right.svg';
	import EighteenUnderEighteen from '$lib/assets/18-under-18.svg';
	import NIELogo from '$lib/assets/nie-logo.svg';
</script>

<div
	class="absolute top-[-40%] flex w-full flex-col items-center justify-center gap-4 px-2 py-4 sm:px-4 sm:py-6 md:top-[-58%] md:px-8 md:py-8 lg:py-12"
>
	<img src={NIELogo} alt="NIE Logo" class="h-16 object-contain sm:h-20 md:h-24 lg:h-28 xl:h-32" />

	<div class="flex w-full items-center justify-center">
		<!-- Hero section with foxes and sign - always horizontal, responsive sizes -->
		<div
			class="flex w-full flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-12"
		>
			<!-- Left Fox -->
			<div class="flex shrink-0 justify-end">
				<div
					class="max-w-[120px] sm:max-w-[120px] md:max-w-[180px] lg:max-w-[250px] xl:max-w-[300px]"
				>
					<img src={LeftLogo} alt="Left Fox Character" class="h-auto w-full object-contain" />
				</div>
			</div>

			<!-- Central 18 Under 18 Sign -->
			<div class="z-10 flex shrink-0 justify-center">
				<div
					class="max-w-[150px] sm:max-w-[150px] md:max-w-[220px] lg:max-w-[320px] xl:max-w-[400px]"
				>
					<img
						src={EighteenUnderEighteen}
						alt="18 Under 18 Marquee Sign"
						class="h-auto w-full object-contain"
					/>
				</div>
			</div>

			<!-- Right Fox -->
			<div class="flex shrink-0 justify-start">
				<div
					class="max-w-[150px] sm:max-w-[120px] md:max-w-[220px] lg:max-w-[290px] xl:max-w-[340px]"
				>
					<img src={RightLogo} alt="Right Fox Character" class="h-auto w-full object-contain" />
				</div>
			</div>
		</div>
	</div>
</div>
