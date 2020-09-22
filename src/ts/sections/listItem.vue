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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * 支持slot=default slot=left slot=right slot=content，当default存在时，其他3个将失效
 */
@Component({
    name: 'ListItem',
})
export default class ListItem extends Vue {
    @Prop({ type: String, default: 'normal' }) public padding!: string;
}
</script>

<style lang="less">
@import "../../lib/style/mixins.less";

@list-font-size: 16px;
@list-line-height: 24px;
@list-padding-v: 12px;
@list-padding-h: 15px;
@placeholder-color: #999;

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

        select.list-input.placeholder {
            color: @placeholder-color;
        }
    }
    .list-item-content.right {
        text-align: right;
    }
    .list-item-content.center {
        text-align: center;
    }
    .list-item-content.left {
        text-align: left;
    }

    .list-item.placeholder {
        .list-item-right {
            color: @placeholder-color;
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
        &.left {
            text-align: left;
            text-align-last: left;
            text-align: -webkit-left;
        }
        &.center {
            text-align: center;
            text-align-last: center;
            text-align: -webkit-center;
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
        &::-webkit-input-placeholder {
            color: @color-placeholder;
        }
    }
    .list-item-textarea-length {
        text-align: right;
    }
    .list-required {
        color: #fc4548;
    }
}
</style>