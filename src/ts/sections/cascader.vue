<template>
    <ListItem class="compact-cascader">
        <label slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content right" :class="{placeholder: name.length === 0}" @click="onClickPlaceholder">
            {{name || placeholder}}
        </div>

        <van-popup slot="extra" v-model="visible" position="bottom">
            <Cascader v-model="ids"
                @itemMap="onItemMapUpate"
                :fetchList="fetchList" @finish="onFinish" />
        </van-popup>
    </ListItem>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Cascader from '../components/cascader.vue';
import ListItem from './listItem.vue';
import { CascaderItem } from 'types/form';

@Component({
    name: 'CompactCascader',
    components: {
        Cascader,
        ListItem,
    },
})
export default class CompactCascader extends Vue {
    /** title */
    @Prop({ type: String }) public title?: string;
    /** titleHint */
    @Prop({ type: Boolean }) public required?: boolean;
    @Prop({ type: Array, default() { return []; } }) public value?: number[];
    @Prop({ type: String, default: '请选择' }) public placeholder?: string;
    @Prop({ required: true, type: Function }) public fetchList!: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
    /** 数据是否有效 */
    @Prop({ type: Boolean, default: true }) public isValidate?: boolean;

    public visible = false;
    public ids: number[] = [];
    public itemMap: { [id: number]: CascaderItem } = {};

    public get name() {
        if (!this.itemMap) {
            return '';
        }
        return (this.value || []).map((id) => this.itemMap![id] ? this.itemMap![id].name : '').join('');
    }

    @Watch('ids')
    public onUpdateIds() {
        this.$emit('input', this.ids);
    }

    public onItemMapUpate(itemMap: { [id: number]: CascaderItem }) {
        this.itemMap = itemMap;
    }

    public onClickPlaceholder() {
        this.visible = true;
    }

    public onFinish() {
        this.visible = false;
    }

    public async innerFetchList(item: CascaderItem) {
        const ret = await this.fetchList(item);
        for (let i = 0, len = ret.length ; i < len; i++) {
            this.$set(this.itemMap, ret[i].id, ret[i]);
        }
        return ret;
    }

    public created() {
        if (this.value && this.value.length) {
            for (let i = 0, len = this.value.length; i < len; i++) {
                this.innerFetchList({ id: this.value[i], name: '' });
            }
        }
    }
}
</script>

<style lang="less">
@import "../../lib/style/mixins.less";

.compact-cascader {
    .is-error {
        color: @color-red;
    }
    .placeholder {
        color: @color-placeholder;
    }
}
</style>