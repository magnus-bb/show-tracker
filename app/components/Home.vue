<template>
	<Page actionBarHidden="true" class="bg-default status-bar">
		<MDBottomNavigation>
			<MDTabStrip class="bg-alt bottom-tab-strip">
				<MDTabStripItem class="bottom-strip-text">
					<!-- film icon -->
					<Label class="fas"></Label>
				</MDTabStripItem>
				<MDTabStripItem class="bottom-strip-text">
					<!-- gear icon -->
					<Label class="fas"></Label>
				</MDTabStripItem>
			</MDTabStrip>
			<MDTabContentItem>
				<Groups />
			</MDTabContentItem>
			<MDTabContentItem>
				<Settings />
			</MDTabContentItem>
		</MDBottomNavigation>
	</Page>
</template>

<script>
import Groups from '@/components/Groups'
import Settings from '@/components/Settings'

export default {
	components: {
		Settings,
		Groups,
	},
	data: () => ({
		selectedIndex: 0,
		message: 'Show Tracker',
	}),
	computed: {
		groups() {
			return this.$store.state.groups
		},
	},
}
</script>

<style scoped lang="scss">
.bottom-strip-text {
	font-size: 20;
}
</style>
