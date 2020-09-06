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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ListItem from './listItem.vue';
import Uploader from '../components/uploader.vue';
import { WechatUploaderComponent } from '@forzoom/uploader';
import { ImageInfo } from 'types/form';

@Component({
    name: 'CompactUploader',
    components: {
        ListItem,
        Uploader,
    },
})
export default class CompactUploader extends Vue {
    @Prop() public value?: ImageInfo;
    /** 标题 */
    @Prop({ type: String }) public title?: string;
    /** 副标题 */
    @Prop({ type: String }) public titleHint?: string;
    /** 是否显示星号 */
    @Prop({ type: Boolean }) public required?: boolean;
    /** 上传函数 */
    @Prop({ required: true, type: Function }) public httpRequest!: (imageInfo: ImageInfo) => ImageInfo | Promise<ImageInfo>;
    /** 是否自动上传 */
    @Prop({ type: Boolean, default: true }) public autoUpload!: boolean;
    /** 是否通过验证 */
    @Prop({ type: Boolean, default: true }) public isValiate?: boolean;
    /** class */
    @Prop() public clazz?: any;

    /** 可能存在判断出错的情况 */
    public hasUploaded = false;

    /**
     * 添加二维码
     */
    public onAdd({ image, serverId }: { image: string, serverId: string }) {
        const imageInfo: ImageInfo = {
            key: serverId,
            url: image,
            mode: 'wechat',
        };

        if (this.autoUpload) {
            this.upload(imageInfo);
        } else {
            this.$emit('input', imageInfo);
        }
    }
    /**
     * 删除二维码
     */
    public onRemove() {
        this.$emit('input', null);
        this.hasUploaded = false;
    }

    public onLoad() {
        this.$emit('load');
    }

    public onFinish() {
        this.$emit('finish');
    }

    /**
     * 上传流程
     */
    public async upload(image?: ImageInfo) {
        image = image || this.value;
        if (this.hasUploaded || !image) {
            return;
        }

        const result = await this.httpRequest(image);
        this.$emit('input', result);
        this.hasUploaded = true;
    }

    /**
     * 生命周期
     */
    public async beforeSubmit() {
        this.upload();
    }

    public mounted() {
        if (this.value) {
            // @ts-ignore
            this.$refs.uploader.setImage(this.value.url);
            // 如果已经有数据情况下，认为已经上传了
            this.hasUploaded = true;
        }
    }
}
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