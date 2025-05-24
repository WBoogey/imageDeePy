<template>
  <header class="flex items-center justify-between px-8 py-4 bg-white/80 shadow-2xl z-20 backdrop-blur-md rounded-b-2xl border-b border-green-100">
    <div class="flex items-center gap-4">
      <img src="" class="w-10 h-10" />
      <span class="text-3xl font-extrabold text-green-700 tracking-tight drop-shadow-lg">CloudVision</span>
      <span class="ml-3 px-3 py-1 rounded-full bg-green-50 text-green-500 text-xs font-bold shadow">v1.0 BETA</span>
    </div>
    <div class="flex items-center gap-4">
      <button class="relative group">
        <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0019 14.2V11c0-1.1-.9-2-2-2V7a5 5 0 00-10 0v2c-1.1 0-2 .9-2 2v3.2a2 2 0 00.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <span class="absolute -right-2 -top-2 bg-pink-500 text-white text-xs rounded-full px-1 shadow">3</span>
        <span class="absolute left-1/2 bottom-[-2rem] scale-0 group-hover:scale-100 transition-all origin-top bg-white border border-green-200 px-2 py-1 rounded shadow text-green-600 text-xs font-semibold">Notifications</span>
      </button>
      <div class="flex items-center gap-2 pl-4 border-l border-gray-200">
        <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Steve" class="w-9 h-9 rounded-full border-2 border-green-200 shadow" />
        <span class="hidden md:inline font-bold text-green-700">Steve</span>
      </div>
    </div>
  </header>
</template>
