<template>

    <ListItem class="compact-cascader" :class="clazz">
        <label slot="left" :class="{'is-error': !isValidate}">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content" :class="[name.length === 0 ? 'placeholder' : '', textAlign]" @click="onClickPlaceholder">
            {{name || placeholder}}
        </div>
        <div slot="right" v-if="rightArrow" class="compact-cascader__arrows">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconxiangyou"></use>
            </svg>
        </div>

        <van-popup slot="extra" v-model="visible" position="bottom">
            <Cascader v-model="ids"
                @itemMap="onItemMapUpate"
                :fetchList="fetchList" @finish="onFinish" />
        </van-popup>
    </ListItem>

</template>
<script lang="js">
import Cascader from '../components/cascader.vue';
import ListItem from './listItem.vue';

export default {
    name: 'CompactCascader',

    components: {
        Cascader,
        ListItem,
    },

    props: {
        /** title */
        title: { type: String },

        /** titleHint */
        required: { type: Boolean },

        value: { type: Array, default() { return []; } },
        placeholder: { type: String, default: '请选择' },
        fetchList: { required: true, type: Function },

        /** 数据是否有效 */
        isValidate: { type: Boolean, default: true },

        /** class */
        clazz: {},

        /** 文本对齐 */
        textAlign: { type: String, default: 'right' },

        /** 是否显示右边箭头 */
        rightArrow: { type: Boolean, default: false },

        /** 是否禁用 */
        disabled: { type: Boolean, default: false },

        /** 颜色 */
        color: { type: String },
    },

    data: function data() {
        return {
            visible: false,
            ids: [],
            itemMap: {},
        };
    },

    computed: {
        name: function() {
            if (!this.itemMap) {
                return '';
            }
            return (this.value || []).map((id) => this.itemMap[id] ? this.itemMap[id].name : '').join('');
        },
    },

    watch: {
        ids: function() {
            this.$emit('input', this.ids);
        },
    },

    methods: {
        onItemMapUpate: function(itemMap) {
            this.itemMap = itemMap;
        },

        onClickPlaceholder: function() {
            if (this.disabled) {
                return;
            }
            this.visible = true;
        },

        onFinish: function() {
            this.visible = false;
        },

        innerFetchList: async function(item) {
            const ret = await this.fetchList(item);
            for (let i = 0, len = ret.length ; i < len; i++) {
                this.$set(this.itemMap, ret[i].id, ret[i]);
            }
            return ret;
        },
    },

    created: function() {
        this.innerFetchList({ id: 0, name: '' });
        if (this.value && this.value.length) {
            for (let i = 0, len = this.value.length; i < len; i++) {
                this.innerFetchList({ id: this.value[i], name: '' });
            }
        }
    },
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

.compact-cascader {
    .is-error {
        color: @color-red;
    }
    .icon {
        width: 1.5em;
        height: 1.5em;
    }
    .placeholder {
        color: @color-placeholder;
    }
}

</style>
