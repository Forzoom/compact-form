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
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
    name: 'CompactTextarea',
})
export default class CompactTextarea extends Vue {
    /** 标题 */
    @Prop({ type: String }) public title: any;
    /** 数据 */
    @Prop({}) public value: any;
    /** 占位 */
    @Prop({ type: String, default: '点击输入' }) public placeholder: any;
    /** class */
    @Prop() public clazz?: any;

    /** 值 */
    public v: any = null;

    @Watch('$props.value')
    public onPropsValueChange(val: any) {
        this.v = val;
    }

    @Watch('v')
    public onVChange(val: any) {
        this.$emit('input', val);
    }

    public onBlur() {
        this.$emit('blur');
    }

    public created() {
        this.v = this.value;
    }
}
</script>
<style lang="less">
@import "../../lib/style/mixins.less";

.compact-textarea {
    &__title {
        padding: 10px 15px 0;
    }
    &__content {
        padding: 10px 15px;
        font-size: 16px;
        line-height: 24px;
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
