<template>

    <ListItem class="compact-select" :class="clazz">
        <label v-if="title" slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <select v-model="v" class="list-input right block" type="text" :disabled="disabled" :class="{placeholder: v === ''}" >
                <option value="">{{placeholder}}</option>
                <option v-for="(option, index) in options" :key="index" :value="option.value">{{option.text}}</option>
            </select>
        </div>
    </ListItem>

</template>
<script lang="js">
import ListItem from './listItem.vue';

export default {
    name: 'CompactSelect',

    components: {
        ListItem,
    },

    props: {
        /** 标题 */
        title: { type: String},

        /** 是否显示星号 */
        required: { type: Boolean},

        /** 数据 */
        value: {},

        /** 选项 */
        options: { type: Array, default() { return []; }},

        /** 占位 */
        placeholder: { type: String, default: '点击选择'},

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
        // 外部更新
        '$props.value': function(val) {
            this.v = val;
        },

        // 内部更新
        v: function(val) {
            this.$emit('input', val);
        },
    },

    methods: {},

    created: function() {
        this.v = this.value;
    },
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

.compact-select {
    .is-error {
        color: @color-red;
    }
}

</style>
