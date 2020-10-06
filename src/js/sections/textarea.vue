<template>

    <div class="compact-textarea" :class="clazz">
        <div v-if="title" class="compact-textarea__title">{{title}}</div>
        <div class="compact-textarea__content">
            <textarea v-model="v"
                class="compact-textarea__textarea"
                :placeholder="placeholder"
                :rows="4"
                @blur="onBlur">
            </textarea>
        </div>
    </div>

</template>
<script lang="js">

export default {
    name: 'CompactTextarea',

    props: {
        /** 标题 */
        title: { type: String },

        /** 数据 */
        value: {},

        /** 占位 */
        placeholder: { type: String, default: '点击输入' },

        /** class */
        clazz: {},
    },

    data: function data() {
        return {
            /** 值 */
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

.compact-textarea {
    &__title {
        padding: 10px 15px 0;
    }
    &__content {
        padding: 10px 15px;
        font-size: 14px;
        line-height: 20px;
    }
    &__textarea {
        width: 100%;
        border-radius: 4px;
        resize: none;
        &::-webkit-input-placeholder {
            color: @color-placeholder;
        }
    }
}

</style>
