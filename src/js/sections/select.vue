<template>

    <ListItem :class="clazz">
        <label slot="left" for="halal-food">{{title}}<span v-if="required" class="list-required">*</span></label>
        <div slot="content" class="list-item-content">
            <select v-model="v" class="list-input right block" type="text" :class="{placeholder: v === ''}" >
                <option value="">{{placeholder}}</option>
                <option v-for="(option, index) in options" :key="index" :value="option.value">{{option.text}}</option>
            </select>
        </div>
    </ListItem>

</template>
<script lang="js">
import ListItem from './listItem.vue';

export default {
    name: 'CompactSelect',

    components: {
        ListItem,
    },

    props: {
        /** 标题 */
        title: { type: String},

        /** 是否显示星号 */
        required: { type: Boolean},

        /** 数据 */
        value: {},

        /** 选项 */
        options: { type: Array, default() { return []; }},

        /** 占位 */
        placeholder: { type: String, default: '点击选择'},

        /** class */
        clazz: {},
    },

    data: function data() {
        return {
            // 值
            v: null,
        };
    },

    watch: {
        // 外部更新
        '$props.value': function(val) {
            this.v = val;
        },

        // 内部更新
        v: function(val) {
            this.$emit('input', val);
        },
    },

    created: function() {
        this.v = this.value;
    },
};
</script>
