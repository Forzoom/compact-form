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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from './listItem.vue';

@Component({
    name: 'CompactSwitch',
    components: {
        ListItem,
    },
})
export default class CompactInput extends Vue {
    /** 标题 */
    @Prop({ type: String }) public title!: any;
    /** 是否必填 */
    @Prop({ type: Boolean, default: false }) public required!: any;
    /** 数据 */
    @Prop({}) public value!: any;
    /** 是否通过验证 */
    @Prop({ type: Boolean, default: true }) public isValidate?: boolean;
    /** class */
    @Prop() public clazz?: any;
    /** active颜色 */
    @Prop({ type: String }) public activeColor?: string;
    /** inactive颜色 */
    @Prop({ type: String }) public inactiveColor?: string;
    /** active值 */
    @Prop() public activeValue?: any;
    /** inactive值 */
    @Prop() public inactiveValue?: any;

    // 值
    public v: any = null;

    @Watch('$props.value')
    public onPropsValueChange(val: any) {
        this.v = val;
    }
    @Watch('v')
    public onVChange(val: any) {
        this.$emit('input', val);
    }

    public created() {
        this.v = this.value;
    }
}
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
