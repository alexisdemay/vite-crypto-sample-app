<template>
  <Disclosure as="nav" class="bg-gray-800 sticky top-0" v-slot="{ open }">
    <div class="mx-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-6 w-auto" src="@/assets/logo.svg" alt="Cryptoapp" />
            <img class="hidden lg:block h-6 w-auto" src="@/assets/logo.svg" alt="Cryptoapp" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <button
                v-for="item in menus"
                :key="item.name"
                :class="[
                  item.selected ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition duration-500 ease-in-out',
                ]"
                :aria-current="item.selected ? 'page' : undefined"
                @click="navigateTo(item.name)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          v-for="item in menus"
          :key="item.name"
          :class="[
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
          ]"
          :aria-current="item.selected ? 'page' : undefined"
          @click="navigateTo(item.name)"
        >
          {{ item.label }}
        </button>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import { NavigationMenu } from '@/constants/navigation';
import { RouteNames, routerPush } from '@/router';

export default defineComponent({
  name: 'NavBar',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);
    const menus = ref([
      { name: NavigationMenu.DASHBOARD, label: 'Dashboard', selected: true },
      { name: NavigationMenu.ACTUALITY, label: 'Actualités', selected: false },
    ]);
    return {
      open,
      menus,
    };
  },
  methods: {
    navigateTo(selectedMenuName: NavigationMenu): void {
      this.selectActiveMenu(selectedMenuName);
      switch (selectedMenuName) {
        case NavigationMenu.DASHBOARD:
          routerPush(RouteNames.DASHBOARD);
          break;
        case NavigationMenu.ACTUALITY:
          routerPush(RouteNames.ACTUALITY);
          break;
      }
    },
    selectActiveMenu(selectedMenuName: NavigationMenu): void {
      this.menus.forEach(menu => (menu.selected = menu.name === selectedMenuName));
    },
  },
});
</script>
