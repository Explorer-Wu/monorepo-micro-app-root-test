<script setup lang="ts">
import { reactive, UnwrapRef, ref, type Ref, toRefs, computed, onUmounted, watchEffect, getCurrentInstance, provide, inject } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { cloneDeep, isEqual } from 'lodash-es';

import ChatsItem from './components/ChatsItem.vue';
import { ApiAis } from '@/apis/modules/aichat';

import './styles/index.scss';

import type { FormInstance, FormRules } from 'element-plus';

const loading = ref(false);
const chatMsgs: Ref<any[]> = ref([]);

interface FormSend {
	askQuestion: string
}

const sendFormRef = ref<FormInstance>()
const formSend = reactive<RuleForm>({
	askQuestion: '',
});

const sendRules = reactive<FormRules<FormSend>>({
	askQuestion: [
		{ required: true, message: '请输入要问答内容！', trigger: 'blur' },
		{ min: 2, message: '长度至少2个字符内容', trigger: 'blur' },
	],
});

const sendMsgForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		try {
			if (valid) {
				chatMsgs.value.push({
					id: String(chatMsgs.length),
					model: "llama3.1",
					role: "user",
					content: formSend.askQuestion,
				});
				console.log('chatMsgs:', chatMsgs.value, fields);
				askQuestionFn(formSend.askQuestion);

			} else {
				console.log('error submit!', fields)
				throw new error(`${fields} 验证不通过!`)
			}

		} catch (error) {
			console.log('error submit!', error)
		}

	})
};

const askQuestionFn = async (query: string) => {
	console.log('chatMsgs-askQuestionFn:', chatMsgs.value);
	loading.value = true;
	try {
		const { model, created_at, message: chatData, done, done_reason } = await ApiAis.generateChatApi(
		{
			data: {
				model: "llama3.1",
				messages: [
					{
						role: "user",
						content: query
					}
				],
				stream: false
			},
		},
		'发送信息后获取聊天回复成果',
		'请求失败！',
	);

		console.log('sendChatApi:', model, chatData, done, done_reason);
		loading.value = false;
		chatMsgs.value.push({
			id: String(chatMsgs.length),
			model: "llama3.1",
			role: chatData.role,
			content: chatData.content,
		});
	} catch (error) {
		console.log('sendChatApi-error:', error);
	}
	
};

</script>

<template>
	<div class="chat-container">

		<div id="chatList" class="chat-lists" v-loading="loading">
			<!-- 显示聊天视图， 判断信息来自当前用户还是接受者 -->
			<template v-if="!!chatMsgs.length">
				<chats-item v-for="(item, index) in chatMsgs" :key="item.id || index" :infos="item" />
			</template>
		</div>

		<div class="chat-inputer">
			<el-form ref="sendFormRef" :inline="true" :model="formSend" :rules="sendRules" style="max-width: 800px"
				class="form-send">
				<el-form-item prop="askQuestion">
					<el-input type="textarea" v-model="formSend.askQuestion" placeholder="请输入消息" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="sendMsgForm(sendFormRef)">发送</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- <Row gutter={16}>
						<Col className="gutter-row" span={16}>
							
						</Col>
						<Col className="gutter-row" span={8}>
						</Col>
					</Row> -->
	</div>
</template>

<style lang="scss" scoped></style>