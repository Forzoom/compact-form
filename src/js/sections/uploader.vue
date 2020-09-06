<template>

    <ListItem class="compact-uploader" :class="clazz">
        <div slot="left">
            <div class="compact-uploader__title" :class="{'is-error': !isValiate}">{{title}}<span v-if="required" class="list-required">*</span></div>
            <div v-if="titleHint" class="compact-uploader__title-hint">{{titleHint}}</div>
        </div>
        <Uploader slot="right"
            ref="uploader"
            class="fr"
            :black="!isValiate"
            @add="onAdd"
            @remove="onRemove"
            @load="onLoad"
            @finish="onFinish">
        </Uploader>
    </ListItem>

</template>
<script lang="js">
import ListItem from './listItem.vue';
import Uploader from '../components/uploader.vue';

export default {
    name: 'CompactUploader',

    components: {
        ListItem,
        Uploader,
    },

    props: {
        value: {},

        /** 标题 */
        title: { type: String },

        /** 副标题 */
        titleHint: { type: String },

        /** 是否显示星号 */
        required: { type: Boolean },

        /** 上传函数 */
        httpRequest: { required: true, type: Function },

        /** 是否自动上传 */
        autoUpload: { type: Boolean, default: true },

        /** 是否通过验证 */
        isValiate: { type: Boolean, default: true },

        /** class */
        clazz: {},
    },

    data: function data() {
        return {
            /** 可能存在判断出错的情况 */
            hasUploaded: false,
        };
    },

    computed: {},
    watch: {},

    methods: {
        /**
         * 添加二维码
         */
        onAdd: function(
            {
                image,
                serverId,
            },
        ) {
            const imageInfo = {
                key: serverId,
                url: image,
                mode: 'wechat',
            };

            if (this.autoUpload) {
                this.upload(imageInfo);
            } else {
                this.$emit('input', imageInfo);
            }
        },

        /**
         * 删除二维码
         */
        onRemove: function() {
            this.$emit('input', null);
            this.hasUploaded = false;
        },

        onLoad: function() {
            this.$emit('load');
        },

        onFinish: function() {
            this.$emit('finish');
        },

        /**
         * 上传流程
         */
        upload: async function(image) {
            image = image || this.value;
            if (this.hasUploaded || !image) {
                return;
            }

            const result = await this.httpRequest(image);
            this.$emit('input', result);
            this.hasUploaded = true;
        },

        /**
         * 生命周期
         */
        beforeSubmit: async function() {
            this.upload();
        },
    },

    mounted: function() {
        if (this.value) {
            // @ts-ignore
            this.$refs.uploader.setImage(this.value.url);
            // 如果已经有数据情况下，认为已经上传了
            this.hasUploaded = true;
        }
    },
};
</script>
<style lang="less">

@import "../../lib/style/mixins.less";

.compact-uploader {
    .ro-uploader-wrap {
        width: 72px;
        height: 72px;
        .ro-uploader-image-wrap {
            .ro-uploader-image.loaderImg {
                background-size: cover;
                background-position: center;
            }
        }
    }

    .is-error {
        color: @color-red;
    }
    &__title {
        padding-top: 25px;
    }
    &__title-hint {
        padding-top: 4px;
        font-size: 14px;
        line-height: 17px;
        color: #888888;
    }
}

</style>
