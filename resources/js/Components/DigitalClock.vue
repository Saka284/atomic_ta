<template>
    <p>{{ formattedTime }}</p>
</template>

<script>
export default {
    data() {
        return {
            currentTime: new Date(),
        };
    },
    computed: {
        formattedTime() {
            return this.currentTime
                .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
                .replace(",", "");
        },
    },
    mounted() {
        setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    },
};
</script>

<style scoped></style>
