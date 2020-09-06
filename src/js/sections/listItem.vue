<template>

    <div class="list-item" :class="['padding-' + padding]">
        <slot>
            <div class="clearfix">
                <div class="list-item-left">
                    <slot name="left"></slot>
                </div>
                <div class="list-item-right">
                    <slot name="right"></slot>
                </div>
                <slot name="content"></slot>
            </div>
        </slot>
        <slot name="extra"></slot>
    </div>

</template>
<script lang="js">

/**
 * 支持slot=default slot=left slot=right slot=content，当default存在时，其他3个将失效
 */
export default {
    name: 'ListItem',

    props: {
        padding: { type: String, default: 'normal' },
    },

    data: function data() {
        return {};
    },

    computed: {},
    watch: {},
    methods: {},
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

@list-font-size: 16px;
@list-line-height: 25px;
@list-padding-v: 12px;
@list-padding-h: 15px;

.list-item {
    position: relative;
    padding: @list-padding-v @list-padding-h;
    font-size: @list-font-size;
    line-height: @list-line-height;
    color: #000;
    &.padding-small {
        padding: 7px 10px;
    }

    .list-item-left {
        float: left;
        max-width: 60%;
    }
    .list-item-right {
        float: right;
    }
    .list-item-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item-content.right {
        text-align: right;
    }

    .list-item.placeholder {
        .list-item-right {
            color: #999;
        }
    }

    // 应用在input上
    .list-input {
        font-size: 16px;
        line-height: 22px;
        background-color: transparent;
        border: 0;
        // 删除原本样式
        appearance: none;
        -webkit-appearance: none;
        box-sizing: border-box;
        &.block {
            width: 100%;
        }
        // 内容局右
        &.right {
            text-align: right;
            text-align-last: right;
            text-align: -webkit-right;
        }
        &.two {
            height: 44px;
        }
        &::-webkit-input-placeholder {
            color: @color-placeholder;
        }
    }
    select.list-input.right {
        direction: rtl;
        option {
            text-align: right;
            text-align-last: right;
            text-align: -webkit-right;
        }
    }

    // textarea的样式
    .list-item-textarea {
        width: 100%;
        font-size: 16px;
        line-height: 22px;
        border: 0;
        vertical-align: middle;
        resize: none;
    }
    .list-item-textarea-length {
        text-align: right;
    }
    .list-required {
        color: #fc4548;
    }
    // select的样式
    .list-item-placeholder-select {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0;
    }
}

</style>
