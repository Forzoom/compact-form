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
<script lang="js">
import ListItem from './listItem.vue';
import { Title, Placeholder, Validate } from '../../lib/mixins';
import { dateFormat, formatMap } from '../../lib/utils';

export default {
    name: 'CompactDate',

    components: {
        ListItem,
    },

    mixins: [
        Title,
        Placeholder,
        Validate,
    ],

    props: {
        value: { type: Date },

        /** class */
        clazz: {},

        /** 是否显示右边箭头 */
        rightArrow: { type: Boolean, default: false },

        /** 最小时间 */
        minDate: { type: Date },

        /** 最大时间 */
        maxDate: { type: Date },

        /** 格式化 */
        formatter: { type: Function },

        /** 类型 */
        type: { required: true, type: String },
    },

    data: function data() {
        return {
            date: undefined,
        };
    },

    computed: {
        dateStr: function() {
            return dateFormat(this.date, formatMap[this.type]);
        },
    },

    watch: {},

    methods: {
        confirm: function(value) {
            this.$emit('input', value);
            this.visible = false;
        },

        cancel: function() {
            this.visible = false;
        },
    },

    created: function() {
        this.date = this.value;
    },
};
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
