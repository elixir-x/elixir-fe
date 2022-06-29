<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useSecurityStore } from "../stores/security";
import { storeToRefs } from "pinia";
import { ChevronDownIcon } from "@heroicons/vue/solid";

const { user } = storeToRefs(useSecurityStore());

</script>

<template>
  <Menu>
    <MenuButton>
      <span class="">{{ user?.username }}</span>
      <img :src="user?.profile_url" />
      <ChevronDownIcon />
    </MenuButton>
    <MenuItems>
      <MenuItem>
        Sex
      </MenuItem>
    </MenuItems>
  </Menu>
</template>