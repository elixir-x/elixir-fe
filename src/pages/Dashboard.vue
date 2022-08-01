<template>
	<div class="mx-8 mt-6 space-y-4 p-16">
		<h1 class="title mb-1 text-4xl font-semibold tracking-tighter">
			Dashboard
			<VChart class="h-96" :option="option" />
		</h1>
	</div>
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
	GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

use([
	CanvasRenderer,
	LineChart,
	TooltipComponent,
	GridComponent
])

const option = ref({
	color: [
		'#7c3aed'
	],
	dark: true,
	tooltip: {
		trigger: 'axis',
		rich: true
	},
	xAxis: {
		data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		type: 'category',
		splitLine: false,
		axisLabel: {
		//	fontFamily: 'Arial',
		//	fontSize: 18
		}
	},
	yAxis: {
		type: 'value',
		splitLine: false
	},
	series: [
		{
			data: [100, 1900, 200, 1200, 800, 1000, 700],
			name: 'Daily Visitors',
			type: 'line',
			smooth: true,
			areaStyle: {
				color: '#7c3aed'
			}
		}
	]
})
</script>
