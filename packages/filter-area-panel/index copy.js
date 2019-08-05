import { use, isDef } from '../utils';

import findParent from '../mixins/find-parent';
const [sfc, bem] = use('filter-area-panel');

export default sfc({
    mixins: [findParent],

    props: {
        title: String,
        disabled: Boolean
    },

    created() {
        this.findParent('h5-filter-area');
    },

    mounted() {
        const { tabs } = this.parent;
        const index = this.parent.slots().indexOf(this.$vnode);
        tabs.splice(index === -1 ? tabs.length : index, 0, this);

        // if (this.slots('title')) {
        //     this.parent.renderTitle(this.$refs.title, this.index);
        // }
    },

    render(h) {
        return (
            <div>{this.slots()}</div>
        );
    }

    // render(h) {
    //     return (
    //         <div class={bem('optionlist')} style={{top: `${this.menuTop + this.menuHeight}px`}} v-show="modelName == 'area'">
    //             <div class={bem('panel')} id="areainfo">
    //                 <div class="flex-warp" class={[bem('flex-wrap'), bem('panel-content')]}>
    //                     <div id="areafllistinfo" class={[bem('select-wrap'), bem('selectone'), bem('flex-child'), bem('vertical-line')]}>
    //                         <ul>
    //                             <li><a href="javascript:;" class={bem('select-item')}>區域</a></li>
    //                             <li><a href="javascript:;" class={bem('select-item')}>港鐵</a></li>
    //                         </ul>
    //                     </div>

    //                     <div class="area-con flex-child" class={[bem('select-wrap'), bem('selecttwo'), bem('flex-child'), bem('vertical-line')]}>
    //                         {""/* <div class="regioninfo region" id="arealistinfo" v-show="showregion">
    //                             <ul>
    //                                 <li>
    //                                     <a href="javascript:;" class={bem('select-item')}>不限</a>
    //                                 </li>                        
    //                             </ul>
    //                         </div> */}
    //                         <div class="subwaylineinfo subwayline mrt" class={bem('select-list')}>
    //                             <ul>              
    //                                 <li>
    //                                     <a href="javascript:;" class={bem('select-item')}>九龙1</a>
    //                                 </li>
    //                                 <li>
    //                                     <a href="javascript:;" class={bem('select-item')}>九龙2</a>
    //                                 </li>   
    //                             </ul>            
    //                         </div>
    //                     </div>

    //                     <div class="area-con flex-child" class={[bem('select-wrap'), bem('selecttwo'), bem('flex-child'), bem('vertical-line')]}>
    //                         <div id="districtItem">
    //                             <div class="section">
    //                                 <ul>              
    //                                     <li class={bem('select-item')}>
    //                                         <a>123</a>
    //                                     </li>              
    //                                 </ul>
    //                             </div>
    //                             <div id="subwayItem" v-show="showminsubway">
    //                                 <div class="mrtcoods">
    //                                     <ul>              
    //                                         <li class={bem('select-item')}>
    //                                             <a href="javascript:;">123</a>
    //                                         </li>              
    //                                     </ul>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>         

    //                 <div class={bem('footer')}>
    //                     共找到<span class="count fc-org">121</span>間房屋&nbsp;&nbsp;&nbsp;<span class="btn btn-warning" id="filterAreaSubmit" >完成</span> <span class="btn btn-link" id="resetArea">重置</span>
    //                 </div>     
    //             </div>
    //         </div>
    //     );
    // }
});