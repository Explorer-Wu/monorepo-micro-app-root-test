<script setup lang="ts">
import { reactive, UnwrapRef, ref, type Ref, toRefs, computed, onUmounted, watchEffect, getCurrentInstance, provide, inject } from 'vue';
import { cloneDeep, isEqual } from 'lodash-es';
import { User, ChatLineRound } from '@element-plus/icons-vue';

defineOptions({
  name: 'ChatbotItem',
})

interface InfoObj {
	role: 'string';
	msg: string;
}
const props = withDefaults(defineProps<{ infos: InfoObj }>(), {
	infos: () => ({
		// role: 'user',
		// msg: ''
	})
});

const { infos: { role, msg } } = props;  // toRefs();

console.log('chatMsgs-props:', props);

const userStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };
const chatbotStyle = { backgroundColor: '#f56a00', verticalAlign: 'middle' };

const conStyles = `message-con ${role === 'user' ? 'user' : 'chatbot'}`;
// const msgTimeStyle = `message-time ${isChatbot ? 'chatbot' : 'user'}`;
const popPlace = role === 'user' ? 'left-start' : 'right-start';

</script>

<template>
		<div :class="['chat-li', role === 'user' ? 'user' : 'chatbot']">
			<el-popover
				ref="chatPopover"
				popper-style="display: inline-block !important; max-width: 600px;"
				:visible="true"
				:placement="popPlace"
				width="auto"
			>
			<!-- trigger="focus" -->
				<template #reference>
					<el-avatar :class="role === 'user' ? 'avatar-user' : 'avatar-chatbot'" :size="50" :icon="role === 'user' ? User : ChatLineRound" />
				</template>
				<template #default>
					<pre>{{ msg }}</pre>
				</template>
			</el-popover>
		</div>
</template>

<style lang="scss" scoped>
	// .popper-wrapper {		
	// }
	 pre {
			@extend %txt-pw-wb;
			border-width: 0 !important;
	 }

	.avatar {
		color: #fff;
		&-user {
			float: right;
			background-color: rgb(8, 91, 185);
		}
		&-chatbot {
			float: left;
			background-color: rgb(34, 251, 255);
		}
	}
</style>
