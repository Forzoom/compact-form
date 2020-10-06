<template>
    <ListItem class="compact-date" :class="clazz">
        <label slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content" :class="[!date ? 'placeholder' : '', textAlign]" @click="onClickPlaceholder">
            {{dateStr || placeholder}}
        </div>
        <div slot="right" v-if="rightArrow" class="compact-date__arrows">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconxiangyou"></use>
            </svg>
        </div>

        <van-popup slot="extra" v-model="visible" position="bottom">
            <van-datetime-picker v-model="date"
                :type="type"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="confirm"
                @cancel="cancel" />
        </van-popup>
    </ListItem>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator';
import ListItem from './listItem.vue';
import { Title, Placeholder, Validate } from '../../lib/mixins';
import { dateFormat, formatMap } from '../../lib/utils';

@Component({
    name: 'CompactDate',
    components: {
        ListItem,
    },
})
export default class CompactDate extends Mixins(Title, Placeholder, Validate) {
    @Prop({ type: Date }) public value?: Date;
    /** class */
    @Prop() public clazz?: any;
    /** 是否显示右边箭头 */
    @Prop({ type: Boolean, default: false }) public rightArrow?: boolean;
    /** 最小时间 */
    @Prop({ type: Date }) public minDate?: Date;
    /** 最大时间 */
    @Prop({ type: Date }) public maxDate?: Date;
    /** 格式化 */
    @Prop({ type: Function }) public formatter?: Function;
    /** 类型 */
    @Prop({ required: true, type: String }) public type!: 'date' | 'datetime' | 'time' | 'year-month' | 'month-day' | 'datehour';

    public date?: Date = undefined;

    public get dateStr() {
        return dateFormat(this.date!, formatMap[this.type]);
    }

    public confirm(value: Date) {
        this.$emit('input', value);
        this.visible = false;
    }

    public cancel() {
        this.visible = false;
    }

    public created() {
        this.date = this.value;
    }
}
</script>

<style lang="less">
@import "../../lib/style/mixins.less";

.compact-date {
    .is-error {
        color: @color-red;
    }
    .icon {
        width: 1.5em;
        height: 1.5em;
    }
}
</style>