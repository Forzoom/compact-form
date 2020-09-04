import { CombinedVueInstance } from 'vue/types/vue';
import { PropsDefinition } from 'vue/types/options';
import { ComponentOptions } from 'vue';

// input
interface CompactInputProp {
    title?: string;
    titleHint?: string;
    placeholder?: string;
    parser?: Function;
    formatter?: Function;
}
export type CompactInputComponent = CombinedVueInstance<Vue, object, object, object, CompactInputProp>;
export type CompactInputComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactInputProp>, CompactInputProp>;

export const CompactInput: CompactInputComponentOptions;
