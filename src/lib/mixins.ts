import Vue from 'vue';

export const Title = Vue.extend({
    props: {
        /** 标题内容，允许没有 */
        title: {
            type: String,
        },
        /** 是否显示星号 */
        required: {
            type: Boolean,
        },
    },
});

export const Placeholder = Vue.extend({
    props: {
        /** 文本对齐 */
        textAlign: {
            type: String,
            default: 'right',
        },
        placeholder: {
            type: String,
        },
    },
    data() {
        return {
            /** popup是否显示 */
            visible: false,
        };
    },
    methods: {
        onClickPlaceholder() {
            this.visible = true;
        },
    },
});

export const Validate = Vue.extend({
    props: {
        /** 数据是否有效 */
        isValidate: {
            type: Boolean,
            default: true,
        },
    },
});
