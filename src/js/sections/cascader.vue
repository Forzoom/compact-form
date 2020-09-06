<template>

    <ListItem class="item-cascader">
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
<script lang="js">
import Cascader from '../components/cascader.vue';

export default {
    name: 'CompactCascader',

    components: {
        Cascader,
    },

    props: {
        /** title */
        title: { type: String },

        /** titleHint */
        titleHint: { type: String },

        value: { type: Array, default() { return []; } },
        placeholder: { type: String, default: '请选择' },
        fetchList: { required: true, type: Function },

        /** 数据是否有效 */
        isValidate: { type: Boolean, default: true },
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

.item-cascader {
    background-color: #f2f2f2;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 25px;
    .is-error {
        box-shadow: 0 0 1px 1px @color-red;
    }
    .placeholder {
        color: #c8c8c8;
    }
}

</style>
