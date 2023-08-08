import SharpRotationComponent from "./components/SharpRotationComponent";
import SharpTrimComponent from "./components/SharpTrimComponent";
import SharpBlurComponent from "./components/SharpBlurComponent";
import SharpTintComponent from "./components/SharpTintComponent";
import SharpGrayscaleComponent from "./components/SharpGrayscaleComponent";
import SharpExtractComponent from "./components/SharpExtractComponent";
import SharpMetaDataComponent from "./components/SharpMetaDataComponent";
import SharpStatsComponent from "./components/SharpStatsComponent";
import SharpExtendComponent from "./components/SharpExtendComponent";
import SharpModulateComponent from "./components/SharpModulateComponent";
import SharpExtractChannelComponent from "./components/SharpExtractChannelComponent";
import SharpRemoveAlphaComponent from "./components/SharpRemoveAlphaComponent";
import SharpEnsureAlphaComponent from "./components/SharpEnsureAlphaComponent";
import SharpResizeComponent from "./components/SharpResizeComponent";
import SharpCompositeComponent from "./components/SharpCompositeComponent";

let components = [SharpRotationComponent, SharpTrimComponent, SharpBlurComponent, SharpTintComponent, SharpGrayscaleComponent, SharpExtractComponent, SharpMetaDataComponent, SharpStatsComponent, SharpExtendComponent, SharpModulateComponent, SharpExtractChannelComponent, SharpRemoveAlphaComponent, SharpEnsureAlphaComponent, SharpResizeComponent, SharpCompositeComponent];

export default {
  createComponents: () => ({
    blocks: components,
    patches: []
  })
}