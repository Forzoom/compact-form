<template>

    <ListItem class="compact-input" :class="clazz">
        <label slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <input v-if="type == 'text'" v-model="v" class="list-input right block" type="text" :placeholder="placeholder" @blur="onBlur" />
            <input v-if="type == 'tel'" v-model="v" class="list-input right block" type="tel" :placeholder="placeholder" @blur="onBlur" />
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

        // 是否必填
        required: { type: Boolean, default: false },

        // 数据
        value: {},

        // placeholder
        placeholder: { type: String, default: '点击输入' },

        /** 类别 */
        type: { type: String, default: 'text' },

        /** 是否通过验证 */
        isValidate: { type: Boolean, default: true },

        /** class */
        clazz: {},
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
