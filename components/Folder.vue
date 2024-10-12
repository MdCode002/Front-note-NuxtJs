<template>
 <div class="w-1/4 h-full bg-white dark:bg-[#202023] flex flex-col justify-between border-r dark:border-[rgb(0,0,0)] border-neutral-300 overflow-y-auto px-5 pt-6">
        <div class="flex flex-row items-center gap-2 dark:bg-[#3f3f44] bg-[#dddddd] cursor-pointer  dark:hover:bg-[#4b4b51]  p-2 rounded-lg">
          <Icon name="ion:folder-outline" class="text-[#ebb800] text-xl " />
          <h2 class="dark:text-white font-semibold text-black text-sm">Notes</h2>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center gap-2 py-2 cursor-pointer hover:bg-[#4b4b51] transition-colors duration-300 p-2 rounded-lg">
            <Icon name="i-ei:plus" class="text-[#ebb800] text-2xl" />
            <h2 class="text-[#ebb800] text-lg font-bold">Nouvelle Dossier</h2>
          </div>
        </div>
      </div>
</template>