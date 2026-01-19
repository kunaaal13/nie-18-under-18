<script lang="ts">
	import Logo from "./Logo.svelte";
	import Star from "./svgs/star.svelte";

</script>

<div class="bg-[#EC8622] rounded-b-none rounded-t-3xl pb-6 sm:pb-8 md:pb-10 flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 relative mt-[200px] sm:mt-[250px] md:mt-[300px] lg:mt-[350px] xl:mt-[400px]">
    <Logo />

    <div class="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 pt-20 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 px-4 sm:px-6 md:px-8">
        <h1 class="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-epilogue font-semibold text-center">About 18 under 18?</h1>

        <h2 class="font-epilogue text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-center max-w-[90%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]">
            18 Under 18 is a Times NIE initiative that recognises exceptional school students who demonstrate talent, leadership, creativity, and impact beyond academics. 
            <br class="my-1" />
            Schools across India can nominate students who are making a difference through innovation, performance, social impact, sports, communication, or creative excellence.
        </h2>
    </div>
    
    <ol class="border-3 border-white border-dashed max-w-[85%] mx-4 sm:mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14 flex flex-col gap-2 sm:gap-3 md:gap-4 text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] list-decimal relative">
        <Star class="absolute bottom-0 -left-8 sm:-left-10 md:-left-12 lg:-left-14 size-12 sm:size-16 md:size-20 hidden sm:block" />
        <Star class="absolute top-0 -right-8 sm:-right-10 md:-right-12 lg:-right-14 size-12 sm:size-16 md:size-20 hidden sm:block" />

        <h2 class="absolute top-[-12%] sm:top-[-13%] md:top-[-14%] lg:top-[-15%] left-1/2 -translate-x-1/2 font-dina-chaumont text-[#CA3328] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold w-full text-center text-stroke-white px-2">
            Here's How It Works
        </h2>

        <li class="pl-4 sm:pl-6 md:pl-8">Schools identify and shortlist students under the announced 18 categories.</li>
        <li class="pl-4 sm:pl-6 md:pl-8">Schools submit nominations from January 27 to February 10.</li>
        <li class="pl-4 sm:pl-6 md:pl-8">A jury evaluates all entries based on impact, originality, effort, and future promise.</li>
        <li class="pl-4 sm:pl-6 md:pl-8">The 18 Under 18 winners are announced in Times NIE on February 16.</li>
    </ol>
</div>