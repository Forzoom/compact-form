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

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from './listItem.vue';
import { ValueText } from 'types/form';

@Component({
    name: 'CompactSelect',
    components: {
        ListItem,
    },
})
export default class CompactSelect extends Vue {
    /** 标题 */
    @Prop({ type: String}) public title!: any;
    /** 是否显示星号 */
    @Prop({ type: Boolean}) public required!: any;
    /** 数据 */
    @Prop() public value!: any;
    /** 选项 */
    @Prop({ type: Array, default() { return []; }}) public options!: ValueText[];
    /** 占位 */
    @Prop({ type: String, default: '点击选择'}) public placeholder!: any;
    /** 是否通过验证 */
    @Prop({ type: Boolean, default: true }) public isValidate?: boolean;
    /** class */
    @Prop() public clazz?: any;
    /** 是否禁用 */
    @Prop({ type: Boolean, default: false }) public disabled!: boolean;

    // 值
    public v: any = null;

    // 外部更新
    @Watch('$props.value')
    public onPropsValueChange(val: any) {
        this.v = val;
    }
    // 内部更新
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

.compact-select {
    .is-error {
        color: @color-red;
    }
}
</style>
