<template>
    <ListItem class="compact-input" :class="clazz">
        <label slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <input v-if="type == 'text'" v-model="v" class="list-input right block" type="text" :placeholder="placeholder" @blur="onBlur" />
            <input v-if="type == 'tel'" v-model="v" class="list-input right block" type="tel" :placeholder="placeholder" @blur="onBlur" />
        </div>
    </ListItem>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from './listItem.vue';

@Component({
    name: 'CompactInput',
    components: {
        ListItem,
    },
})
export default class CompactInput extends Vue {
    /** 标题 */
    @Prop({ type: String }) public title!: any;
    // 是否必填
    @Prop({ type: Boolean, default: false }) public required!: any;
    // 数据
    @Prop({}) public value!: any;
    // placeholder
    @Prop({ type: String, default: '点击输入' }) public placeholder!: any;
    /** 类别 */
    @Prop({ type: String, default: 'text' }) public type!: any;
    /** 是否通过验证 */
    @Prop({ type: Boolean, default: true }) public isValidate?: boolean;
    /** class */
    @Prop() public clazz?: any;

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

    public onBlur() {
        this.$emit('blur');
    }

    public created() {
        this.v = this.value;
    }
}
</script>
