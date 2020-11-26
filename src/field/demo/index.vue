<template>
    <demo-section>
        <demo-block title="基础用法">
            <h5-cell-group>
                <h5-field
                    v-model="value"
                    placeholder="请输入用户名"
                />
            </h5-cell-group>
        </demo-block>

        <demo-block title="自定义类型">
            <h5-cell-group>
                <h5-field
                    v-model="username"
                    label="用户名"
                    placeholder="请输入用户名"
                    clearable
                    right-icon="question-o"
                    required
                    @click-right-icon="$toast('question')"
                />

                <h5-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </h5-cell-group>
        </demo-block>

        <demo-block title="禁用输入框">
            <h5-cell-group>
                <h5-field
                    value="输入框已禁用"
                    label="用户名"
                    left-icon="contact"
                    disabled
                />
            </h5-cell-group>
        </demo-block>

        <demo-block title="错误提示">
            <h5-cell-group>
                <h5-field
                    v-model="username2"
                    label="用户名"
                    placeholder="请输入用户名"
                    error
                />
                <h5-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    error-message="手机号格式错误"
                />
            </h5-cell-group>
        </demo-block>

        <demo-block title="高度自适应">
            <h5-cell-group>
                <h5-field
                    v-model="message"
                    label="留言"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />
            </h5-cell-group>
        </demo-block>

        <demo-block title="插入按钮">
            <h5-cell-group>
                <h5-field
                    center
                    clearable
                    v-model="sms"
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <h5-button
                        slot="button"
                        size="small"
                        type="primary"
                    >
                        发送验证码
                    </h5-button>
                </h5-field>
            </h5-cell-group>
        </demo-block>
    </demo-section>
</template>

<script>
export default {
    i18n: {
        'zh-CN': {
            title2: '自定义类型',
            title3: '禁用输入框',
            title4: '错误提示',
            title5: '高度自适应',
            title6: '插入按钮',
            message: '留言',
            phone: '手机号',
            sms: '短信验证码',
            sendSMS: '发送验证码',
            smsPlaceholder: '请输入短信验证码',
            phonePlaceholder: '请输入手机号',
            messagePlaceholder: '请输入留言',
            inputDisabled: '输入框已禁用',
            phoneError: '手机号格式错误'
        },
        'en-US': {
            title2: 'Custom type',
            title3: 'Disabled',
            title4: 'Error info',
            title5: 'Auto resize',
            title6: 'Insert button',
            message: 'Message',
            phone: 'Phone',
            sms: 'SMS',
            sendSMS: 'Send SMS',
            smsPlaceholder: 'SMS',
            phonePlaceholder: 'Phone',
            messagePlaceholder: 'Message',
            inputDisabled: 'Disabled',
            phoneError: 'Invalid phone'
        }
    },

    data() {
        return {
            sms: '',
            value: '',
            password: '',
            username: '',
            username2: '',
            message: '',
            phone: '1365577'
        };
    }
};
</script>

<style lang="less">
@import '../../src/style/var';

.demo-field {
    padding-bottom: 30px;

    .h5-field__right-icon .h5-icon {
        color: @blue;
    }
}
</style>
