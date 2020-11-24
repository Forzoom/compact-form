<template>

    <ListItem class="compact-switch" :class="clazz">
        <label v-if="title" slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <van-switch v-model="v"
                class="compact-switch__switch"
                size="18px"
                :active-color="activeColor"
                :inactive-color="inactiveColor"
                :active-value="activeValue"
                :inactive-value="inactiveValue" />
        </div>
    </ListItem>

</template>
<script lang="js">
import ListItem from './listItem.vue';

export default {
    name: 'CompactSwitch',

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

        /** 是否通过验证 */
        isValidate: { type: Boolean, default: true },

        /** class */
        clazz: {},

        /** active颜色 */
        activeColor: { type: String },

        /** inactive颜色 */
        inactiveColor: { type: String },

        /** active值 */
        activeValue: {},

        /** inactive值 */
        inactiveValue: {},
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

    methods: {},

    created: function() {
        this.v = this.value;
    },
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

.compact-switch {
    .is-error {
        color: @color-red;
    }
    .list-item-content {
        position: relative;
        height: @text-normal-line-height;
    }
    &__switch {
        position: absolute;
        right: 0;
        top: 0;
    }
}

</style>
