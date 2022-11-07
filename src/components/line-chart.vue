<template>
  <LineChart :chartData="testData" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, defineProps, ref, toRefs } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, ChartData, registerables } from "chart.js";
Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  props: {
    labels: Array<any>,
    data: Array<any>,
  },
  components: { LineChart },
  setup(props) {
    const { labels, data } = toRefs(props);

    const testData = computed(() => ({
      labels: labels.value!,
      datasets: [
        {
          data: data.value!,
          borderColor: "rgb(138,43,226)",
          tension: 0.5,
          fill: false,
          label: "kW",
        },
      ],
    }));

    return { testData };
  },
});
</script>
