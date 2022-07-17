<script lang="ts" setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { Tab, TabGroup, TabList } from "@headlessui/vue";

const router = useRouter();

const onChangeTab = (index: number) => {
    router.push({ path: tabs.value[index].path })
};

const tabs = ref([
    {
        name: 'General',
        path: '/settings'
    },
    {
        name: 'Profile',
        path: '/settings/profile'
    }
]);

const getRouterIndex = () => tabs.value.findIndex(route => route.path === router.currentRoute.value.path);
</script>

<template>
    <div class="mt-6 mx-8 p-16 space-y-4">
        <div>
            <div class="title font-semibold text-4xl mb-1 tracking-tighter">Settings</div>
            <TabGroup @change="onChangeTab" class="space-x-2 mb-6" :default-index="getRouterIndex()">
                <TabList>
                    <Tab v-for="(tab, index) in tabs" :index="index" v-slot="{ selected }">
                        <div class="tab"
                             :class="selected ? 'underline underline-offset-2 text-violet-500' : 'text-neutral-300'">
                            {{ tab.name }}
                        </div>
                    </Tab>
                </TabList>
            </TabGroup>
        </div>
        <div>
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>
.tab {
    @apply ring-0 outline-none border-none
}
</style>
