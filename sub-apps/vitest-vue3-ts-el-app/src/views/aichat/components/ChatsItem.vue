<script setup lang="ts">
import { reactive, UnwrapRef, ref, type Ref, toRefs, computed, onUmounted, watchEffect, getCurrentInstance, provide, inject } from 'vue';
import { cloneDeep, isEqual } from 'lodash-es';
import { User, ChatLineRound } from '@element-plus/icons-vue';

interface InfoObj {
	isUser: boolean;
	msg: string;
}
const props = withDefaults(defineProps<{ infos: InfoObj }>(), {
  infos: () => {}
});

const { infos: {isUser, msg} } = props;

const userStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };
const chatbotStyle = { backgroundColor: '#f56a00', verticalAlign: 'middle' };

const conStyles = `message-con ${isUser ? 'user' : 'chatbot'}`;
// const msgTimeStyle = `message-time ${isChatbot ? 'chatbot' : 'user'}`;
const popPlace = isUser ? 'left-start' : 'right-start';

</script>

<template>
		<div :class="['chat-li', isUser ? 'user' : 'chatbot']">
			<el-popover
				ref="popover"
				:placement="popPlace"
				:width="600"
				trigger="focus"
				:content="msg"
			>
				<template #reference>
					<el-avatar :class="isUser ? 'avatar-user' : 'avatar-chatbot'" :size="50" :icon="isUser ? User : ChatLineRound" />
				</template>
			</el-popover>
		</div>
</template>

<style lang="scss" scoped>
	.avatar {
		color: #fff;
		&-user {
			background-color: rgb(8, 91, 185);
		}
		&-chatbot {
			background-color: rgb(34, 251, 255);
		}
	}
</style>

// export default ChatbotItem;
