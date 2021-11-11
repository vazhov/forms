import { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
const { TextArea } = Input;

interface PeopleFormProps {
    /** Функция добавление пользователя */
    createUser: (user: object) => void
}

const PeopleForm = ({ createUser } : PeopleFormProps) => {
    const [form] = Form.useForm();
    const [value, setValue] = useState<number>(0);
    const [gender] = useState([
        {label: 'M', value: 0, disabled: false},
        {label: 'Ж', value: 1, disabled: false}
    ]);
    const [social] = useState([
        { label: 'Вконтакте', value: 'vk' },
        { label: 'Telegram', value: 'tg' },
        { label: 'Facebook', value: 'fb' },
    ]);

    const successMessage = () => {
        message.success('Пользователь добавлен!');
    };
    const errorMessage = () => {
        message.error('Произошла ошибка!');
    };

    const onChange = (event: any) => {
        const num = Number(event.target.value);
        setValue(num);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values: any) => {
        createUser(values)
        onReset()
        successMessage()
    };

    const onFinishFailed = (errorInfo: any) => {
        errorMessage()
    };

    const passwordValidator = (rule: any, value: any, callback: (error?: string) => void) => {
        const clearString = value.replace(/\s/g, '')
        return (clearString.length >= 9)
            ? Promise.resolve()
            : Promise.reject("Минимальное описание: 10 символов")
    }
    return (
        <div>
            <h1>Добавить пользователя</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                >
                <Form.Item
                    label="Имя"
                    name="username"
                    rules={[{ required: true, message: 'Заполните поле!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Почта"
                    name="email"    
                    rules={[
                        { required: true, message: 'Заполните поле!' },
                        { whitespace: true, message: 'Поле не может содержать пробелы!' },
                        {
                            pattern: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                            message: 'Почта написанна неправильно!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="desription"
                    rules={[
                        { validator: passwordValidator }
                    ]}
                >
                    <TextArea
                        placeholder="Текст о пользователе"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>

                <Form.Item
                    label="Пол"
                    name="gender"
                >
                    <Radio.Group onChange={onChange} options={gender} value={value}></Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Социальные сети"
                    name="social"
                    rules={[
                        { required: true, message: 'Выберите хотя бы одно значение!' },
                    ]}
                >
                    <Checkbox.Group options={social} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Сохранить пользователя
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Отчистить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PeopleForm;