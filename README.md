### 说明

本库一般配合`@forzoom/form-renderer`使用，也可以单独使用，其中包含了一些表单会使用到的Vue组件。

### 例子

```typescript

// 全局注册组件
import { CompactInput, CompactSelect, CompactCascader, CompactUploader, CompactTextarea } from '@forzoom/compact-form';

const list = [
    CompactInput,
    CompactSelect,
    CompactCascader,
    CompactUploader,
    CompactTextarea
];

for (const component of list) {
    Vue.component(component.name, component);
}

// page.vue

import { Component, Vue, Watch } from 'vue-property-decorator';
import { Renderer } from '@forzoom/form-renderer';
import { FormPageMeta } from '@forzoom/form-renderer/types/form';
import { CompactFormSectionMeta } from '@forzoom/compact-form/types/form';

@Component
export default class Page extends Vue {
    /** meta用于传入Renderer中 */
    public get meta(): Array<FormPageMeta<CompactFormSectionMeta>> {
        const sections: CompactFormSectionMeta[] = [
            {
                type: 'CompactUploader',
                key: 'avatar',
                props: {
                    title: '头像',
                    httpRequest: async (image) => {
                        const rdata = await store.dispatch('uploadMedia', {
                            mediaId: image.key,
                            type: 'avatar',
                        });
                        return rdata.data;
                    },
                },
                validates: [
                    { trigger: 'validate', required: true, message: '请上传头像' },
                ],
            },
        ];
        return sections;
    }
}

```