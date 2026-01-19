<script lang="ts">
    import LeftLogo from "$lib/assets/left.svg";
    import RightLogo from "$lib/assets/right.svg";
    import EighteenUnderEighteen from "$lib/assets/18-under-18.svg";
</script>

<div class="w-full absolute top-[-30%] md:top-[-58%] flex items-center justify-center px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
    <!-- Hero section with foxes and sign - always horizontal, responsive sizes -->
    <div class="w-full flex flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-12">
        <!-- Left Fox -->
        <div class="shrink-0 flex justify-end">
            <div class="max-w-[120px] sm:max-w-[120px] md:max-w-[180px] lg:max-w-[250px] xl:max-w-[300px]">
                <img 
                    src={LeftLogo} 
                    alt="Left Fox Character" 
                    class="w-full h-auto object-contain"
                />
            </div>
        </div>
        
        <!-- Central 18 Under 18 Sign -->
        <div class="shrink-0 flex justify-center z-10">
            <div class="max-w-[150px] sm:max-w-[150px] md:max-w-[220px] lg:max-w-[320px] xl:max-w-[400px]">
                <img 
                    src={EighteenUnderEighteen} 
                    alt="18 Under 18 Marquee Sign" 
                    class="w-full h-auto object-contain"
                />
            </div>
        </div>
        
        <!-- Right Fox -->
        <div class="shrink-0 flex justify-start">
            <div class="max-w-[120px] sm:max-w-[120px] md:max-w-[180px] lg:max-w-[250px] xl:max-w-[300px]">
                <img 
                    src={RightLogo} 
                    alt="Right Fox Character" 
                    class="w-full h-auto object-contain"
                />
            </div>
        </div>
    </div>
</div>