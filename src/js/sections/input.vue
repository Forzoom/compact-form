<template>

    <ListItem class="compact-input" :class="clazz">
        <label v-if="title" slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <input v-if="type == 'text'" v-model="v" class="list-input block" :class="[textAlign]" :disabled="disabled" type="text" :placeholder="placeholder" @blur="onBlur" />
            <input v-if="type == 'tel'" v-model="v" class="list-input block" :class="[textAlign]" :disabled="disabled" type="tel" :placeholder="placeholder" @blur="onBlur" />
        </div>
    </ListItem>

</template>
<script lang="js">
import ListItem from './listItem.vue';

export default {
    name: 'CompactInput',

    components: {
        ListItem,
    },

    props: {
        /** 标题 */
        title: { type: String },

        /** 是否必填 */
        required: { type: Boolean, default: false },

        /** 数据 */
        value: {},

        /** placeholder */
        placeholder: { type: String, default: '点击输入' },

        /** 类别 text tel */
        type: { type: String, default: 'text' },

        /** 文本对齐 left right */
        textAlign: { type: String, default: 'right' },

        /** 是否通过验证 */
        isValidate: { type: Boolean, default: true },

        /** class */
        clazz: {},

        /** 是否禁用 */
        disabled: { type: Boolean, default: false },
    },

    data: function data() {
        return {
            // 值
            v: null,
        };
    },

    computed: {},

    watch: {
        '$props.value': function(val) {
            this.v = val;
        },

        v: function(val) {
            this.$emit('input', val);
        },
    },

    methods: {
        onBlur: function() {
            this.$emit('blur');
        },
    },

    created: function() {
        this.v = this.value;
    },
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

.compact-input {
    .is-error {
        color: @color-red;
    }
}

</style>
