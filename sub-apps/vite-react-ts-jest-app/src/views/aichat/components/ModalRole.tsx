import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, type FormProps } from 'antd';

const ModalRole: React.FC<any> = ({ isOpen, goInterView }) => {
	type FieldType = {
		name: string;
		jobName: string;
	};

	const [modalOpen, setmodalOpen] = useState(false);
	const [form] = Form.useForm();

	// const form = Form.useFormInstance();

	const onEnterInterView: FormProps<FieldType>['onFinish'] = values => {
		console.log('Success:', values);
		// askQuestionFn(values.askQuestion);
		setmodalOpen(false);
		goInterView(values, false);
	};

	const onFaileInterView: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	const onCancelInterView = () => {
		// form.validateFields()
		// 	.then(values => {
		// 	})
		// 	.catch(errorInfo => {
		// 	});
		setmodalOpen(false);
		goInterView(form.getFieldsValue(true), false);
	};

	useEffect(() => {
		setmodalOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			{/* style={{ top: 20 }} */}
			<Modal
				title="角色设置"
				centered
				open={modalOpen}
				footer={
					<Button type="primary" onClick={onCancelInterView}>
						进入面试
					</Button>
				}
				onCancel={() => setmodalOpen(false)}
			>
				<Form
					name="role_select"
					form={form}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					style={{ maxWidth: 800 }}
					initialValues={{ jobName: '前端架构师', name: 'exp' }}
				>
					<Form.Item<FieldType>
						label="职位"
						name="jobName"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="名称"
						name="name"
						rules={[{ required: true, message: '请填写您的名字或花名!' }]}
					>
						<Input />
					</Form.Item>

					{/* <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
						<Button type="primary" htmlType="submit">
							进入面试
						</Button>
					</Form.Item> */}
				</Form>
			</Modal>
		</>
	);
};

export default ModalRole;
