<script lang="ts" setup>
</script>

<template>
  <div
    class="min-h-screen flex flex-col text-gray-950 fill-gray-600 relative antialiased"
    :style="{ backgroundImage: 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIAEAAQAMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQn/2gAIAQEAAAAA09AsAAsABUBYCoFgH//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/aAAgBAxAAAACAAB//xAAbEAADAAMBAQAAAAAAAAAAAAAAARIiUWERkf/aAAgBAQABPwCeolmS2UymZPZLPNtE9RLMlsplMyeyWedRPUSzJbKZTMnslk9RPUSzJbKZT2ZPZLJ6ieolmS2U9lMyeyWT1E9RLMulMpmT2SyeonqJZktlMpmT2Syeonq+kvRktlMpmT2Syeo//8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAgEBPwAH/8QAFBEBAAAAAAAAAAAAAAAAAAAAQP/aAAgBAwEBPwAH/9k=)' }"
  >
    <header class="sticky w-full top-0 z-20 bg-white border-b border-accent-200 h-24 flex items-center">
      <div class="@container">
        <slot name="header" />
      </div>
    </header>

    <main class="grow flex flex-col justify-between @container">
      <slot />
    </main>

    <footer class="@container w-full top-0 bg-white border-t border-accent-200">
      <slot name="footer" />
    </footer>
  </div>

  <slot name="modal" />
</template>
