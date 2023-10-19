/**
 * Copyright (c) 2023 MERCENARIES.AI PTE. LTD.
 * All rights reserved.
 */

// Maintain imports and the `components` array in alphabetical order to reduce git conflicts.
import SharpBlurComponent from "./components/SharpBlurComponent"
import SharpCompositeComponent from "./components/SharpCompositeComponent"
import SharpEnsureAlphaComponent from "./components/SharpEnsureAlphaComponent"
import SharpExtractChannelComponent from "./components/SharpExtractChannelComponent"
import SharpExtractComponent from "./components/SharpExtractComponent"
import SharpExtendComponent from "./components/SharpExtendComponent"
import SharpGrayscaleComponent from "./components/SharpGrayscaleComponent"
import SharpMaskedColorComponent from "./components/SharpMaskedColorComponent"
import SharpMetaDataComponent from "./components/SharpMetaDataComponent"
import SharpModulateComponent from "./components/SharpModulateComponent"
import SharpNegateComponent from "./components/SharpNegateComponent"
import SharpPrepareImageComponent from "./components/SharpPrepareImageComponent"
import SharpRemoveAlphaComponent from "./components/SharpRemoveAlphaComponent"
import SharpResizeComponent from "./components/SharpResizeComponent"
import SharpRotationComponent from "./components/SharpRotationComponent"
import SharpStatsComponent from "./components/SharpStatsComponent"
import SharpTintComponent from "./components/SharpTintComponent"
import SharpTrimComponent from "./components/SharpTrimComponent"

let components = [
  SharpBlurComponent,
  SharpCompositeComponent,
  SharpEnsureAlphaComponent,
  SharpExtractChannelComponent,
  SharpExtractComponent,
  SharpExtendComponent,
  SharpGrayscaleComponent,
  SharpMaskedColorComponent,
  SharpMetaDataComponent,
  SharpModulateComponent,
  SharpNegateComponent,
  SharpPrepareImageComponent,
  SharpRemoveAlphaComponent,
  SharpResizeComponent,
  SharpRotationComponent,
  SharpStatsComponent,
  SharpTintComponent,
  SharpTrimComponent,
]

export default {
  createComponents: () => ({
    blocks: components,
    patches: []
  })
}